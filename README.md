**Baseball Hacks In Python**

The book "Baseball Hacks" by Joseph Alder is a great read for anyone interest in the
baseball analytics.  The only strike against it is the fact that all the hacks are 
written in Perl.  Perl is a language I'm just not that comfortable with.  This repo is 
ports some of the more useful hacks I found in that book to python. 

**Dependencies**
 - Python 3
 - Postgres 10+
 - [Retro Sheet Tools](https://www.retrosheet.org/tools.htm)
 - wine 3.0+ (windows emulator for linux)
 

**Database configuraiton**

Install the lastest postgres package.  There are serveral ways to add users. 
Start by creating a 'bbhip' user for your database with the following commands
$ su - postgres
$ createuser --interactive --pwprompt
Answer the prompts, naming the user 'bbhip' and allowing it to create databases

Create a file ~/.pgpass add the follwing line replacing <password> 
with the password defined for the bbhip user

localhost:5432:*:bbhip:<password> 

Set the permissions on the .pgpass file to read only
$ chmod 400 ~/.pgpass
 
**Required Statement From Retrosheet**
 
The information used here was obtained free of
charge from and is copyrighted by Retrosheet.  Interested
parties may contact Retrosheet at "www.retrosheet.org".
 
