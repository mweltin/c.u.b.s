DROP TYPE IF EXISTS parsed_pitch_sequence CASCADE;

CREATE TYPE parsed_pitch_sequence AS
(
    ball INTEGER,
    strike INTEGER,
    no_affect INTEGER,
    in_play INTEGER
);
