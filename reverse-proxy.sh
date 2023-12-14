#!/bin/bash


cp ./nginx.conf /tmp/

sudo docker run --name asi2-nginx-container --network host -v /tmp/nginx.conf:/etc/nginx/nginx.conf:ro --rm nginx

