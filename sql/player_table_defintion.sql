CREATE TABLE IF NOT EXISTS player (
    player_id serial primary key,
    id text,
    last text,
    first text,
    play_debut date,
    mgr_debut date,
    coach_debut date,
    ump_debut date
);