ALTER TABLE event 
ADD COLUMN home_team text,
ADD COLUMN game_date date,
ADD COLUMN game_num integer;

UPDATE event set 
    home_team = substring(game_id from 1 for 3),
    game_date = (substring(game_id from 4 for 4) || '-' || substring(game_id from 8 for 2) || '-' || substring(game_id from 10 for 2))::DATE,
    game_num = substring(game_id from 12 for 1)::INTEGER;

