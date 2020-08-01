#!/bin/sh

gunicorn cubs_fetch_data_endpoint:app -w 2 --threads 2 -b 0.0.0.0:5000
