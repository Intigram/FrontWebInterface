#!/bin/bash

# build the image (if not already built)
# ===! COMMENT IF YOU'VE CHANGED SOMETHING AND WANT TO RE-BUILD !===
if docker image inspect intigram-react-app >/dev/null 2>&1; then
    echo "Image exists locally - will use that"
else
    echo "Image does not exist locally - will build"
    docker build -t intigram-react-app .
fi

# check if container already exists
if [ "$(docker ps -a -q -f name=intigram-front)" ]; then
    if [ "$(docker inspect intigram-front --format '{{.State.Status}}')" = "running" ]; then
            # the container is running and needs to be stopped
            echo "Stopping running container"
            docker stop intigram-front
    fi
    if [ "$(docker ps -aq -f status=exited -f name=intigram-front)" ]; then
        # cleanup
        echo "Removing existing container"
        docker rm intigram-front
    fi
fi

# run your container
docker run \
-e REACT_APP_HOST_IP_ADDRESS="http://127.0.0.1:5000/api" \
-e REACT_APP_API_KEY=${REACT_APP_API_KEY} \
-it -dp 8000:3000 \
--name intigram-front intigram-react-app

