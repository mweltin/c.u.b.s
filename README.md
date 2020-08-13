**CUBS: Completely Useless Baseball Statistics**

The book "Baseball Hacks" by Joseph Alder is a great read for anyone interest in the
baseball analytics.  It was the inpsiration for this repo.  The only strike against it
is the fact that all the hacks are written in Perl.  Perl is a language I'm just 
not that comfortable with.  This repo is ports some of the more useful hacks I found in that book to python. 

**Demo Site**
[cubs.mweltin.com](http://cubs.mweltin.com)
*note: don't expect high performance its served up from a laptop over a dsl connection with dynamic DNS.

**Dependencies**
 - Python 3
 - Postgres 10+
 - [Retro Sheet Tools](https://www.retrosheet.org/tools.htm)
 - wine 3.0+ (windows emulator for linux)
 - angular 9+
 - flask
 - ansible 2.9+
 - docker
 

**Required Statement From Retrosheet**
 
The information used here was obtained free of
charge from and is copyrighted by Retrosheet.  Interested
parties may contact Retrosheet at "www.retrosheet.org".

**Docker Setup**

In the future this information should be moved into a docker-compose file.
For now this is the docker setup of this app.

You can build the images your self or use the ones located on [dockerhub](https://hub.docker.com/u/mweltin)
   
 - Create docker network: 
   - $docker network create cubs-net
 - Create DB container
   - create the mount point on the docker host /opt/cubs/data
   - docker run -d --name cubs-db -e POSTGRES_PASSWORD=XXXX --network cubs-net -v /opt/cubs/data:/var/lib/postgresql/data mweltin/cubs-db:1.0.0
 - Create api endpoint
   - docker run -d --name cubs-api --network cubs-net mweltin/cubs-api:1.1.0
 - Create web app container
  - docker run -d -p 80:80 --name cubs-web --network cubs-net mweltin/cubs-web:1.3.0
 
