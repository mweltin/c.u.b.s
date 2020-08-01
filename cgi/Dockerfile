FROM python:3.8

MAINTAINER mweltin@gmail.com

WORKDIR /opt/cubs/api

COPY . .

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

RUN ["chmod", "+x", "/opt/cubs/api/gunicorn_bootstrap.sh"]

ENTRYPOINT ["/opt/cubs/api/gunicorn_bootstrap.sh"]
