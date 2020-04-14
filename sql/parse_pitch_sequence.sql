DROP TYPE IF EXISTS parsed_pitch_sequence CASCADE;

CREATE TYPE parsed_pitch_sequence AS 
(
    ball INTEGER,
    strike INTEGER,
    no_affect INTEGER,
    in_play INTEGER
);

DROP FUNCTION IF EXISTS parse_pitch_sequence(TEXT);

CREATE OR REPLACE FUNCTION parse_pitch_sequence(pitch_sequence TEXT)
RETURNS parsed_pitch_sequence 
LANGUAGE plpgsql
AS $$
DECLARE
    parsed_pitches parsed_pitch_sequence;
    part text;
    loop_counter INTEGER;
    strike_count INTEGER;
BEGIN
    parsed_pitches.ball := 0;
    parsed_pitches.strike := 0;
    parsed_pitches.no_affect := 0;
    parsed_pitches.in_play := 0;
    strike_count := 0;
    loop_counter := 1;

    WHILE loop_counter <= char_length(pitch_sequence)
    LOOP
        part := substring(pitch_sequence from loop_counter for 1);
        CASE
            WHEN position(part in 'V,P,H,I,B') > 0 THEN
                parsed_pitches.ball := parsed_pitches.ball + 1;
            WHEN position(part in 'T,S,Q,K,C') > 0 THEN
                parsed_pitches.strike := parsed_pitches.strike + 1;
                strike_count := strike_count + 1;
            WHEN position(part in 'R,O,L,F') > 0 THEN
                CASE
                    WHEN  strike_count < 2 THEN
                        parsed_pitches.strike := parsed_pitches.strike + 1;
                        strike_count := strike_count + 1;
                    WHEN strike_count = 2 THEN
                            parsed_pitches.no_affect := parsed_pitches.no_affect + 1;
                END CASE;
            WHEN position(part in 'Y,X') > 0 THEN
                parsed_pitches.in_play := parsed_pitches.in_play + 1;
            ELSE
                NULL;  -- this deal with non pitch events such as stolen base or pick offs
        END CASE;
        loop_counter := loop_counter + 1;
    END LOOP ;
    return parsed_pitches;
END;
$$;
