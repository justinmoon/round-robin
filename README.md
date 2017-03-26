# README

To install the pre-commit hooks:

> $ ln -s pre-commit.sh .git/hooks/pre-commit

## Running movile app for the first time.

If you don't already have yarn and React Native CLI,:


> $ npm install -g yarn react-native-cli

in the `native` dir, run `yarn`

after yarn build, run
`make ios-dev`
or 
`make android-dev`

## Shipping Builds

We use [Fastlane](https://github.com/fastlane/fastlane) to automate these processes.

Install using:

```
$ gem install bundler
$ cd native
$ bundle install
```

### Shipping to Apple App Store

1. Sync credentials using the fabulous match tool. Run: 

> $ match appstore

2. Ship it: 

> make ios-beta

### Shipping to Android Play Store

Setup:

1. Have Justin send you the `round-robin-key.keystore` and `round-robin-credentials.json` files and copy them to the `native/android/app` directory.
2. Edit the file ~/.gradle/gradle.properties and add the following (replace ***** with the correct keystore password, alias and key password):

> ROUND_ROBIN_RELEASE_STORE_FILE=round-robin-key.keystore
> ROUND_ROBIN_RELEASE_KEY_ALIAS=round-robin-alias
> ROUND_ROBIN_RELEASE_STORE_PASSWORD=****
> ROUND_ROBIN_RELEASE_KEY_PASSWORD=****

3. Ship it. From `native` directory run:

> make android-alpha


Running Backend for the first time

I modeled V1 infrastructure & developer environment off of this tutorial: https://realpython.com/blog/python/dockerizing-flask-with-compose-and-machine-from-localhost-to-the-cloud/

Make sure you have Docker, Docker Compose and Docker Machine installed
- If not, install Docker for Mac (which includes Docker Compose) and Docker Machine

Create the developer VM
$ docker-machine create -d virtualbox round-robin-dev

See your newly born VM
$ docker-machine ls

Point the docker client at the `round-robin-dev` machine
$ eval "$(docker-machine env dev)"

Notice that there is a * under the "active" column
$ docker-machine ls

Next, run this command:
$ docker-compose up

Build images for each service defined in docker-compose.yml:
$ docker-compose build

Next, Run:
$ docker-compose up

This creates, starts, and attaches to containers for all services defined in the docker-compose.yml file. Pass a "-d" flag to run in the background.

Your can grab the IP address to test the backend using:
$ docker-machine ip round-robin-dev

Load that in your browser and verify that the backend is running
