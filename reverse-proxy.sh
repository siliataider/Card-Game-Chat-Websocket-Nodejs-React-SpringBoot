#!/bin/bash

# Start Nginx reverse proxy container
cp ./nginx.conf /tmp/
sudo docker run --name asi2-nginx-container --network host -v /tmp/nginx.conf:/etc/nginx/nginx.conf:ro --rm nginx &

# Start ActiveMQ container
docker run -d -p 61616:61616 -p 61613:61613 -p 8161:8161 \
  -e ACTIVEMQ_DISALLOW_WEBCONSOLE=false \
  -e ACTIVEMQ_USERNAME=myuser \
  -e ACTIVEMQ_PASSWORD=mypwd \
  -e ACTIVEMQ_WEBADMIN_USERNAME=myuserweb \
  -e ACTIVEMQ_WEBADMIN_PASSWORD=mypwd \
  symptoma/activemq:latest &

# Start the react front-end
cd front
npm install
npm run dev &

# Navigate back to the original directory
cd ..

# Start the node back-end
cd node
npm install
npm run dev &

# Wait for all background processes to finish
wait

docker run -it -p 61616:61616 -p 61613:61613 -p 8161:8161 -e ACTIVEMQ_DISALLOW_WEBCONSOLE=false -e ACTIVEMQ_USERNAME=myuser -e ACTIVEMQ_PASSWORD=mypwd -e ACTIVEMQ_WEBADMIN_USERNAME=myuserweb -e ACTIVEMQ_WEBADMIN_PASSWORD=mypwd symptoma/activemq:latest

