# Simple IRC Chat

## Installation

### Docker

The best way to install the app is trough docker

1. ```docker run -p 8080:3000 --link db -d test/reactchat:latest```

OR

1. Clone the project ```git clone https://github.com/Dzhan85/dockerchat.git && cd dockerchat```
2. Build it: ```docker build --rm -f Dockerfile --tag reactchat:latest```
3. You must have a mongo db set up already. ```docker run --name db -d mongo```
4. Run: ```docker run -p 8080:3000 --link db -d reactchat:latest```

### Docker-compose

Also with docker compose

1. Clone the project
3. modify the docker-compose as you which.
2. Simply run ```docker-compose up -d```

## Usage
The app is served on port 8080

# dockerchat
