DROP FUNCTION IF EXISTS innings_pitched(TEXT, TEXT);

CREATE OR REPLACE FUNCTION innings_pitched(i_pitcher TEXT, i_game_id TEXT)
RETURNS numeric AS $$

DECLARE
  v_innings_pitched numeric;
BEGIN
    select
        case when t1.outs + t1.outs_on_play >=3 then t1.inning
        else t1.inning - 1  + (t1.outs / 3.0 )
        end as innings_pitched INTO v_innings_pitched
    from (
        select
            inning, outs, outs_on_play
        from
            event
        where pitcher = i_pitcher
            and game_id = i_game_id
        order by event_id desc
        limit 1
    ) t1;
    return v_innings_pitched;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION innings_pitched (TEXT, TEXT) IS 'Returns the numbers of innings pitched by a pitcher for a game. Note that partial innings are reported as 1/3 or 2/3 not .1 or .2';

