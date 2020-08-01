FROM postgres:10

COPY ./docker-entrypoint-initdb.d/ /docker-entrypoint-initdb.d/

RUN echo "host all all 172.0.0.0/16 md5" >> /var/lib/postgresql/data/pg_hba.conf

VOLUME /opt/cubs/data
