-- create the database
\i create_bbhip_db.sql
\c bbhip

-- define tables
\i table/event_table_definition.sql
\i table/event_type.sql
\i table/game_table_definition.sql
\i table/pitch_sequence_type.sql
\i table/player_table_definition.sql

-- define data types
\i data_type/parsed_pitch_sequence.sql

-- define functions
\i function/parse_pitch_sequence.sql