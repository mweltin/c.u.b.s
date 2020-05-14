DROP FUNCTION IF EXISTS batting_average (TEXT);

CREATE OR REPLACE FUNCTION batting_average (i_batter TEXT)
RETURNS TABLE (
		at_bat BIGINT,
		year BIGINT,
		hit BIGINT,
		ba NUMERIC

)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
    RETURN QUERY SELECT t1.*, ( t1.hit::numeric  / t1.at_bat::numeric  ) AS ba
        FROM (
            SELECT
                  count(1) AS at_bat,
                  extract ('year' FROM game_date)::BIGINT AS year,
                  count(1) filter (WHERE hit_value > 0 ) AS hit
            FROM
                event
            WHERE
                batter = i_batter
                AS ab_flag = true
                GROUP BY year
        ) as t1 ;
END;
$$;

COMMENT ON FUNCTION batting_average (TEXT) IS 'hits / at bats';