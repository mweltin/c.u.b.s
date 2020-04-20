DROP TABLE IF EXISTS team;

CREATE TABLE IF NOT EXISTS team (
 team_id serial primary key,
 name text unique,
 logo_url text,
 logo_text text,
 league text,
 division text
 );

INSERT INTO team
(name,
 logo_url,
 logo_alt_text,
 league,
 division)
VALUES

  (
    'Arizona Diamondbacks',
    'https://content.sportslogos.net/logos/54/50/thumbs/gnnnrbxcmjhdgeu6mavqk3945.gif',
    '2019 Arizona Diamondbacks Logo',
    'National League',
     'West'
  ),
  (
    'Atlanta Braves',
    'https://content.sportslogos.net/logos/54/51/thumbs/5171502018.gif',
    '2019 Atlanta Braves Logo',
    'National League',
     'East'
  ),
  (
    'Baltimore Orioles',
    'https://content.sportslogos.net/logos/53/52/thumbs/5258002019.gif',
    '2019 Baltimore Orioles Logo',
    'American League',
     'East'
  ),
  (
    'Boston Red Sox',
    'https://content.sportslogos.net/logos/53/53/thumbs/c0whfsa9j0vbs079opk2s05lx.gif',
    '2019 Boston Red Sox Logo',
    'American League',
     'East'
  ),
  (
    'Chicago Cubs',
    'https://content.sportslogos.net/logos/54/54/thumbs/q9gvs07u72gc9xr3395u6jh68.gif',
    '2019 Chicago Cubs Logo',
    'National League',
     'Central'
  ),
  (
    'Chicago White Sox',
    'https://content.sportslogos.net/logos/53/55/thumbs/oxvkprv7v4inf5dgqdebp0yse.gif',
    '2019 Chicago White Sox Logo',
    'American League',
     'Central'
  ),
  (
    'Cincinnati Reds',
    'https://content.sportslogos.net/logos/54/56/thumbs/z9e0rqit393ojiizsemd0t1hx.gif',
    '2019 Cincinnati Reds Logo',
    'National League',
     'Central'
  ),
  (
    'Cleveland Indians',
    'https://content.sportslogos.net/logos/53/57/thumbs/5753472014.gif',
    '2019 Cleveland Indians Logo',
    'American League',
     'Central'
  ),
  (
    'Colorado Rockies',
    'https://content.sportslogos.net/logos/54/58/thumbs/5868712017.gif',
    '2019 Colorado Rockies Logo',
    'National League',
     'West'
  ),
  (
    'Detroit Tigers',
    'https://content.sportslogos.net/logos/53/59/thumbs/5989642016.gif',
    '2019 Detroit Tigers Logo',
    'American League',
     'Central'
  ),
  (
    'Houston Astros',
    'https://content.sportslogos.net/logos/53/4929/thumbs/492995032000.gif',
    '2019 Houston Astros Logo',
    'American League',
     'West'
  ),
  (
    'Kansas City Royals',
    'https://content.sportslogos.net/logos/53/62/thumbs/6283222019.gif',
    '2019 Kansas City Royals Logo',
    'American League',
     'Central'
  ),
  (
    'Los Angeles Angels',
    'https://content.sportslogos.net/logos/53/6521/thumbs/652143892016.gif',
    '2019 Los Angeles Angels Logo',
    'American League',
     'West'
  ),
  (
    'Los Angeles Dodgers',
    'https://content.sportslogos.net/logos/54/63/thumbs/efvfv5b5g1zgpsf56gb04lthx.gif',
    '2019 Los Angeles Dodgers Logo',
    'National League',
     'West'
  ),
  (
    'Miami Marlins',
    'https://content.sportslogos.net/logos/54/3637/thumbs/363775442019.gif',
    '2019 Miami Marlins Logo',
    'National League',
     'East'
  ),
  (
    'Milwaukee Brewers',
    'https://content.sportslogos.net/logos/54/64/thumbs/6479972018.gif',
    '2019 Milwaukee Brewers Logo',
    'National League',
     'Central'
  ),
  (
    'Minnesota Twins',
    'https://content.sportslogos.net/logos/53/65/thumbs/peii986yf4l42v3aa3hy0ovlf.gif',
    '2019 Minnesota Twins Logo',
    'American League',
     'Central'
  ),
  (
    'New York Mets',
    'https://content.sportslogos.net/logos/54/67/thumbs/m01gfgeorgvbfw15fy04alujm.gif',
    '2019 New York Mets Logo',
    'National League',
     'East'
  ),
  (
    'New York Yankees',
    'https://content.sportslogos.net/logos/53/68/thumbs/1256.gif',
    '2019 New York Yankees Logo',
    'American League',
     'East'
  ),
  (
    'Oakland Athletics',
    'https://content.sportslogos.net/logos/53/69/thumbs/6xk2lpc36146pbg2kydf13e50.gif',
    '2019 Oakland Athletics Logo',
    'American League',
     'West'
  ),
  (
    'Philadelphia Phillies',
    'https://content.sportslogos.net/logos/54/70/thumbs/7075792019.gif',
    '2019 Philadelphia Phillies Logo',
    'National League',
     'East'
  ),
  (
    'Pittsburgh Pirates',
    'https://content.sportslogos.net/logos/54/71/thumbs/7112502014.gif',
    '2019 Pittsburgh Pirates Logo',
    'National League',
     'Central'
  ),
  (
    'San Diego Padres',
    'https://content.sportslogos.net/logos/54/73/thumbs/7343442015.gif',
    '2019 San Diego Padres Logo',
    'National League',
     'West'
  ),
  (
    'San Francisco Giants',
    'https://content.sportslogos.net/logos/54/74/thumbs/cpqj6up5bvgpoedg5fwsk20ve.gif',
    '2019 San Francisco Giants Logo',
    'National League',
     'West'
  ),
  (
    'Seattle Mariners',
    'https://content.sportslogos.net/logos/53/75/thumbs/1305.gif',
    '2019 Seattle Mariners Logo',
    'American League',
     'West'
  ),
  (
    'St. Louis Cardinals',
    'https://content.sportslogos.net/logos/54/72/thumbs/3zhma0aeq17tktge1huh7yok5.gif',
    '2019 St. Louis Cardinals Logo',
    'National League',
     'Central'
  ),
  (
    'Tampa Bay Rays',
    'https://content.sportslogos.net/logos/53/2535/thumbs/253594482019.gif',
    '2019 Tampa Bay Rays logo',
    'American League',
     'East'
  ),
  (
    'Texas Rangers',
    'https://content.sportslogos.net/logos/53/77/thumbs/ajfeh4oqeealq37er15r3673h.gif',
    '2019 Texas Rangers Logo',
    'American League',
     'West'
  ),
  (
    'Toronto Blue Jays',
    'https://content.sportslogos.net/logos/53/78/thumbs/2559d7603ouedg7ldhw0br4fn.gif',
    '2019 Toronto Blue Jays Logo',
    'American League',
     'East'
  ),
  (
    'Washington Nationals',
    'https://content.sportslogos.net/logos/54/578/thumbs/rcehah9k0kekjkgzm077fflws.gif',
    '2019 Washington Nationals Logo',
    'National League',
     'East'
  )
