DROP TABLE IF EXISTS pitch_sequence_type;

CREATE TABLE IF NOT EXISTS pitch_sequence_type (
 id serial primary key,
 code text not null,
 description text not null UNIQUE);

INSERT INTO pitch_sequence_type
(code, description)
VALUES
 ('+', 'following pickoff throw by the catcher'),
 ('*', 'indicates the following pitch was blocked by the catcher'),
 ('.', 'marker for play not involving the batter'),
 ('1', 'pickoff throw to first'),
 ('2', 'pickoff throw to second'),
 ('3', 'pickoff throw to third'),
 ('>', 'Indicates a runner going on the pitch'),
 ('B', 'ball'),
 ('C', 'called strike'),
 ('F', 'foul'),
 ('H', 'hit batter'),
 ('I', 'intentional ball'),
 ('K', 'strike (unknown type)'),
 ('L', 'foul bunt'),
 ('M', 'missed bunt attempt'),
 ('N', 'no pitch (on balks and interference calls)'),
 ('O', 'foul tip on bunt'),
 ('P', 'pitchout'),
 ('Q', 'swinging on pitchout'),
 ('R', 'foul ball on pitchout'),
 ('S', 'swinging strike'),
 ('T', 'foul tip'),
 ('U', 'unknown or missed pitch'),
 ('V', 'called ball because pitcher went to his mouth'),
 ('X', 'ball put into play by batter'),
 ('Y', 'ball put into play on pitchout');
