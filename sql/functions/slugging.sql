DROP FUNCTION IF EXISTS slugging(TEXT);

CREATE OR REPLACE FUNCTION slugging(i_batter TEXT)
RETURNS TABLE (
		at_bats BIGINT,
		weighted_hits BIGINT,
		singles BIGINT,
		doubles BIGINT,
		triples BIGINT,
		homers BIGINT,
		year BIGINT,
		slg NUMERIC

)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
    RETURN QUERY
    SELECT t2.*, ( t2.weighted_hits::numeric  / t2.at_bats::numeric  ) AS slg
    FROM (
        SELECT
            COALESCE( count(1), 0 ) AS at_bats,
            COALESCE( sum( t1.hit_value ), 0 ) AS weighted_hits,
            COALESCE( sum( t1.single ), 0 ) AS singles,
            COALESCE( sum( t1.double ), 0 ) AS doubles,
            COALESCE( sum( t1.triple ), 0 ) AS triples,
            COALESCE( sum( t1.homer ), 0 ) AS homers,
            t1.year
        FROM (
            SELECT
                  extract ('year' FROM game_date)::BIGINT AS year,
                  CASE WHEN hit_value = 1 THEN 1 END AS single,
                  CASE WHEN hit_value = 2 THEN 1 END AS double,
                  CASE WHEN hit_value = 3 THEN 1 END AS triple,
                  CASE WHEN hit_value = 4 THEN 1 END AS homer,
                  hit_value
            FROM
                event
            WHERE
                batter = i_batter 
                AND ab_flag = true
        ) AS t1
        GROUP BY t1.year
    ) AS t2;
END;
$$;

COMMENT ON FUNCTION slugging (TEXT) IS 'Slugging Percentage (SLG) = (1 base hits + (2 x 2 base hits) + (3 x 3 base hits) + (4 x home runs)) / at bats';

