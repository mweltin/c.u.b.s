DROP FUNCTION IF EXISTS runs_earned_unearned(TEXT, TEXT);

CREATE OR REPLACE FUNCTION runs_earned_unearned(i_pitcher TEXT, i_game_id TEXT)
RETURNS TABLE (
 earned integer,
 unearned integer)
AS $$

DECLARE
BEGIN
    RETURN QUERY
    SELECT 
    ( SUM(t1.er_hr) + SUM(t1.er_first) + sum(t1.er_second) + sum(t1.er_third) )::INTEGER AS earned_runs,
    ( SUM(t1.ur_hr) + SUM(t1.ur_first) + sum(t1.ur_second) + sum(t1.ur_third) )::INTEGER AS unerned_runs
    FROM (
        SELECT
            CASE WHEN batter_dest = 4 THEN 1 ELSE 0 END AS er_hr,
            CASE WHEN batter_dest = 5 THEN 1 ELSE 0 END AS ur_hr,
            CASE WHEN runner_on_first_dest = 4 THEN 1 ELSE 0 END AS er_first,
            CASE WHEN runner_on_first_dest = 5 THEN 1 ELSE 0 END AS ur_first,
            CASE WHEN runner_on_second_dest = 4 THEN 1 ELSE 0 END AS er_second,
            CASE WHEN runner_on_second_dest = 5 THEN 1 ELSE 0 END AS ur_second,
            CASE WHEN runner_on_third_dest = 4 THEN 1 ELSE 0 END AS er_third,
            CASE WHEN runner_on_third_dest = 5 THEN 1 ELSE 0 END AS ur_third
        FROM event
        JOIN event_type ON event_type.code = event.event_type
        WHERE
            (pitcher = i_pitcher AND batter_dest >= 4 AND game_id = i_game_id)
            OR
            (responsible_pitcher_for_runner_on_first = i_pitcher AND runner_on_first_dest >= 4 AND game_id = i_game_id)
            OR
            (responsible_pitcher_for_runner_on_second = i_pitcher AND runner_on_second_dest >= 4 AND game_id = i_game_id)
            OR
            (responsible_pitcher_for_runner_on_third = i_pitcher AND runner_on_third_dest >= 4 AND game_id = i_game_id)
    ) t1;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION runs_earned_unearned (TEXT, TEXT) IS 'FOR a give game AND pitcher return the number of earned AND unearned runs.
I couldn not find it documented but it appares a runner destination of 5 is unearned AND 4 is earned';

