
### Config ###

android-rm-strings:
	-rm android/app/src/main/res/values/strings.xml

android-dev-strings: android-rm-strings
	cp config/dev-strings.xml android/app/src/main/res/values/strings.xml

android-prod-strings: android-rm-strings
	cp config/prod-strings.xml android/app/src/main/res/values/strings.xml

ios-rm-info-plist:
	-rm ios/RoundRobin/Info.plist

ios-dev-info-plist: ios-rm-info-plist
	cp config/dev-Info.plist ios/RoundRobin/Info.plist

ios-prod-info-plist: ios-rm-info-plist
	cp config/prod-Info.plist ios/RoundRobin/Info.plist


config-clean:
	-rm config/index.js

config-prod: config-clean
	cp config/prod.js config/index.js

config-dev: config-clean
	cp config/dev.js config/index.js

config-stage: config-clean
	cp config/stage.js config/index.js

### Run ###

ios-dev: config-dev ios-dev-info-plist
	react-native run-ios

ios-beta: config-prod ios-prod-info-plist
	fastlane ios beta

android-dev: config-dev android-dev-strings
	react-native run-android

android-alpha: config-prod android-prod-strings
	fastlane android alpha
