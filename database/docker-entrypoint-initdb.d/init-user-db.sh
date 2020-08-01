#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER bbhip PASSWORD 'password';
    CREATE DATABASE bbhip;
    GRANT ALL PRIVILEGES ON DATABASE bbhip TO bbhip;
EOSQL

file="/docker-entrypoint-initdb.d/cubs.dump"
dbname=bbhip

echo "Restoring DB using $file"
pg_restore -U postgres -j 8 --dbname=$dbname  "$file" || exit 1

echo "host all all 172.0.0.0/16 md5" >> /var/lib/postgresql/data/pg_hba.conf
