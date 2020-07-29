DROP FUNCTION IF EXISTS era(TEXT);

CREATE OR REPLACE FUNCTION era(i_pitcher TEXT)
RETURNS TABLE (
 era numeric,
 day_of_week text,
 year integer )
AS $$

DECLARE
BEGIN
    RETURN QUERY
SELECT
    9 * (t2.earned_runs/ t2.innings_pitched) AS era,
    CASE WHEN t2.day_of_week = 0 THEN 'monday'
        WHEN t2.day_of_week = 1 THEN 'tuesday'
        WHEN t2.day_of_week = 2 THEN 'wednesday'
        WHEN t2.day_of_week = 3 THEN 'thursday'
        WHEN t2.day_of_week = 4 THEN 'friday'
        WHEN t2.day_of_week = 5 THEN 'saturday'
        WHEN t2.day_of_week = 6 THEN 'sunday'
        ELSE '?'
     END AS day_of_week,
    t2.year::integer
FROM
    (
        SELECT
            sum( innings_pitched( t.pitcher, t.game_id ) ) AS innings_pitched,
            sum ( (SELECT earned FROM  runs_earned_unearned(t.pitcher, t.game_id)) ) AS earned_runs,
            extract(dow FROM t.game_date) AS day_of_week,
            extract(year FROM t.game_date) AS year
        FROM
            (SELECT distinct pitcher, game_id, game_date FROM event WHERE pitcher = i_pitcher ) AS t
        GROUp BY year, day_of_week
    ) AS t2;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION era (TEXT) IS 'Return ERA by day and year for a particular pitcher';

