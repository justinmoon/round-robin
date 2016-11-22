# README

## Running for the first time.

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
