FROM node:18-alpine

# Set up variables
ENV REACT_APP_HOST_IP_ADDRESS=$REACT_APP_HOST_IP_ADDRESS
ENV REACT_APP_API_KEY=$REACT_APP_API_KEY

WORKDIR /react-docker-example/

COPY public/ /react-docker-example/public
COPY src/ /react-docker-example/src
COPY package.json /react-docker-example/

RUN npm install

CMD ["npm", "start"]
