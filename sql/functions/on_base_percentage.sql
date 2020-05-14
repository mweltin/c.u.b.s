DROP FUNCTION IF EXISTS on_base_percentage(TEXT);

CREATE OR REPLACE FUNCTION on_base_percentage(i_batter TEXT)
RETURNS TABLE (
		at_bat BIGINT,
		hit BIGINT,
		walk BIGINT,
		sacrifice_fly BIGINT,
		hit_by_pitch BIGINT,
		year BIGINT,
		obp NUMERIC
)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
    RETURN QUERY 
    SELECT
        t1.*,
        (t1.hit + t1.walk + t1.hit_by_pitch)::NUMERIC  / (t1.at_bat + t1.walk + t1.hit_by_pitch + t1.sacrifice_fly)::NUMERIC AS obp
    FROM (
        SELECT
            count(1) filter( WHERE ab_flag is true) AS at_bat,
            count(1) filter (WHERE hit_value > 0 ) AS hit,
            count(1) filter( WHERE code = 14 or code = 15 ) walk,
            count(1) filter( WHERE event_text ilike '%sf%' ) sacrifice_fly,
            count(1) filter( WHERE code = 16 ) hit_by_pitch,
            extract ('year' FROM game_date)::BIGINT AS year
        FROM
            event
            INNER JOIN event_type ON event_type.code = event.event_type
        WHERE
        batter = i_batter
        AND batter_event_flag = true
        GROUP BY year
    ) AS t1 ;
END;
$$;

COMMENT ON FUNCTION on_base_percentage (TEXT) IS 'On BASe Percentage (OBP) = (hits + walks + hit by pitch) / (at-bats + walks + hit by pitch + sacrifice flies)';
