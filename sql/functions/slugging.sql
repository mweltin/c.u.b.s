DROP FUNCTION IF EXISTS slugging(TEXT);

CREATE OR REPLACE FUNCTION slugging(i_batter TEXT)
RETURNS TABLE (
		at_bat BIGINT,
		year BIGINT,
		hit BIGINT,
		slg NUMERIC

)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
    RETURN QUERY SELECT t1.*, ( t1.hit::numeric  / t1.at_bat::numeric  ) AS slg
        FROM (
            SELECT
                  count(1)  AS at_bat,
                  extract ('year' FROM game_date)::BIGINT AS year,
                  sum( hit_value ) AS hit
            FROM
                event
            WHERE
                batter = i_batter
                AND ab_flag = true
                GROUP BY year
        ) AS t1 ;
END;
$$;

COMMENT ON FUNCTION slugging (TEXT) IS 'Slugging Percentage (SLG) = (1 base hits + (2 x 2 base hits) + (3 x 3 base hits) + (4 x home runs)) / at bats';
