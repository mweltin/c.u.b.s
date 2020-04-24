DROP TABLE IF EXISTS team;

CREATE TABLE IF NOT EXISTS team (
 team_id serial primary key,
 name text unique,
 logo_url text not null,
 logo_text text not null,
 league text not null,
 division text not null,
 abbrev text not null
 );

INSERT INTO team
(name,
 logo_url,
 logo_text,
 league,
 division,
 abbrev)
VALUES

  (
    'Arizona Diamondbacks',
    'https://content.sportslogos.net/logos/54/50/thumbs/gnnnrbxcmjhdgeu6mavqk3945.gif',
    '2019 Arizona Diamondbacks Logo',
    'National League',
    'West',
    'ARI'
  ),
  (
    'Atlanta Braves',
    'https://content.sportslogos.net/logos/54/51/thumbs/5171502018.gif',
    '2019 Atlanta Braves Logo',
    'National League',
    'East',
    'ATL'
  ),
  (
    'Baltimore Orioles',
    'https://content.sportslogos.net/logos/53/52/thumbs/5258002019.gif',
    '2019 Baltimore Orioles Logo',
    'American League',
     'East',
     'BAL'
  ),
  (
    'Boston Red Sox',
    'https://content.sportslogos.net/logos/53/53/thumbs/c0whfsa9j0vbs079opk2s05lx.gif',
    '2019 Boston Red Sox Logo',
    'American League',
     'East',
     'BOS'
  ),
  (
    'Chicago Cubs',
    'https://content.sportslogos.net/logos/54/54/thumbs/q9gvs07u72gc9xr3395u6jh68.gif',
    '2019 Chicago Cubs Logo',
    'National League',
     'Central',
     'CHC'
  ),
  (
    'Chicago White Sox',
    'https://content.sportslogos.net/logos/53/55/thumbs/oxvkprv7v4inf5dgqdebp0yse.gif',
    '2019 Chicago White Sox Logo',
    'American League',
    'Central',
    'CHW'
  ),
  (
    'Cincinnati Reds',
    'https://content.sportslogos.net/logos/54/56/thumbs/z9e0rqit393ojiizsemd0t1hx.gif',
    '2019 Cincinnati Reds Logo',
    'National League',
    'Central',
    'CIN'
  ),
  (
    'Cleveland Indians',
    'https://content.sportslogos.net/logos/53/57/thumbs/5753472014.gif',
    '2019 Cleveland Indians Logo',
    'American League',
    'Central',
    'CLE'
  ),
  (
    'Colorado Rockies',
    'https://content.sportslogos.net/logos/54/58/thumbs/5868712017.gif',
    '2019 Colorado Rockies Logo',
    'National League',
    'West',
    'COL'
  ),
  (
    'Detroit Tigers',
    'https://content.sportslogos.net/logos/53/59/thumbs/5989642016.gif',
    '2019 Detroit Tigers Logo',
    'American League',
    'Central',
    'DET'
  ),
  (
    'Houston Astros',
    'https://content.sportslogos.net/logos/53/4929/thumbs/492995032000.gif',
    '2019 Houston Astros Logo',
    'American League',
    'West',
    'HOU'
  ),
  (
    'Kansas City Royals',
    'https://content.sportslogos.net/logos/53/62/thumbs/6283222019.gif',
    '2019 Kansas City Royals Logo',
    'American League',
    'Central',
    'KCR'
  ),
  (
    'Los Angeles Angels',
    'https://content.sportslogos.net/logos/53/6521/thumbs/652143892016.gif',
    '2019 Los Angeles Angels Logo',
    'American League',
    'West',
    'ANA'
  ),
  (
    'Los Angeles Dodgers',
    'https://content.sportslogos.net/logos/54/63/thumbs/efvfv5b5g1zgpsf56gb04lthx.gif',
    '2019 Los Angeles Dodgers Logo',
    'National League',
    'West',
    'LAD'
  ),
  (
    'Miami Marlins',
    'https://content.sportslogos.net/logos/54/3637/thumbs/363775442019.gif',
    '2019 Miami Marlins Logo',
    'National League',
    'East',
    'MIA'
  ),
  (
    'Milwaukee Brewers',
    'https://content.sportslogos.net/logos/54/64/thumbs/6479972018.gif',
    '2019 Milwaukee Brewers Logo',
    'National League',
    'Central',
    'MIL'
  ),
  (
    'Minnesota Twins',
    'https://content.sportslogos.net/logos/53/65/thumbs/peii986yf4l42v3aa3hy0ovlf.gif',
    '2019 Minnesota Twins Logo',
    'American League',
    'Central',
    'MIN'
  ),
  (
    'New York Mets',
    'https://content.sportslogos.net/logos/54/67/thumbs/m01gfgeorgvbfw15fy04alujm.gif',
    '2019 New York Mets Logo',
    'National League',
    'East',
    'NYM'
  ),
  (
    'New York Yankees',
    'https://content.sportslogos.net/logos/53/68/thumbs/1256.gif',
    '2019 New York Yankees Logo',
    'American League',
    'East',
    'NYY'
  ),
  (
    'Oakland Athletics',
    'https://content.sportslogos.net/logos/53/69/thumbs/6xk2lpc36146pbg2kydf13e50.gif',
    '2019 Oakland Athletics Logo',
    'American League',
    'West',
    'OAK'
  ),
  (
    'Philadelphia Phillies',
    'https://content.sportslogos.net/logos/54/70/thumbs/7075792019.gif',
    '2019 Philadelphia Phillies Logo',
    'National League',
    'East',
    'PHI'
  ),
  (
    'Pittsburgh Pirates',
    'https://content.sportslogos.net/logos/54/71/thumbs/7112502014.gif',
    '2019 Pittsburgh Pirates Logo',
    'National League',
    'Central',
    'PIT'
  ),
  (
    'San Diego Padres',
    'https://content.sportslogos.net/logos/54/73/thumbs/7343442015.gif',
    '2019 San Diego Padres Logo',
    'National League',
    'West',
    'SDP'
  ),
  (
    'San Francisco Giants',
    'https://content.sportslogos.net/logos/54/74/thumbs/cpqj6up5bvgpoedg5fwsk20ve.gif',
    '2019 San Francisco Giants Logo',
    'National League',
    'West',
    'SFG'
  ),
  (
    'Seattle Mariners',
    'https://content.sportslogos.net/logos/53/75/thumbs/1305.gif',
    '2019 Seattle Mariners Logo',
    'American League',
    'West',
    'SEA'
  ),
  (
    'St. Louis Cardinals',
    'https://content.sportslogos.net/logos/54/72/thumbs/3zhma0aeq17tktge1huh7yok5.gif',
    '2019 St. Louis Cardinals Logo',
    'National League',
    'Central',
    'STL'
  ),
  (
    'Tampa Bay Rays',
    'https://content.sportslogos.net/logos/53/2535/thumbs/253594482019.gif',
    '2019 Tampa Bay Rays logo',
    'American League',
    'East',
    'TBR'
  ),
  (
    'Texas Rangers',
    'https://content.sportslogos.net/logos/53/77/thumbs/ajfeh4oqeealq37er15r3673h.gif',
    '2019 Texas Rangers Logo',
    'American League',
    'West',
    'TEX'
  ),
  (
    'Toronto Blue Jays',
    'https://content.sportslogos.net/logos/53/78/thumbs/2559d7603ouedg7ldhw0br4fn.gif',
    '2019 Toronto Blue Jays Logo',
    'American League',
    'East',
    'TOR'
  ),
  (
    'Washington Nationals',
    'https://content.sportslogos.net/logos/54/578/thumbs/rcehah9k0kekjkgzm077fflws.gif',
    '2019 Washington Nationals Logo',
    'National League',
    'East',
    'WSN'
  )
