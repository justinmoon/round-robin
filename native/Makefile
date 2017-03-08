
### Config ###

android-rm-strings:
	-rm android/app/src/main/res/values/strings.xml

android-dev-strings: android-rm-strings
	cp con/dev-strings.xml android/app/src/main/res/values/strings.xml

android-prod-strings: android-rm-strings
	cp con/prod-strings.xml android/app/src/main/res/values/strings.xml

ios-rm-info-plist:
	-rm ios/RoundRobin/Info.plist

ios-dev-info-plist: ios-rm-info-plist
	cp con/dev-Info.plist ios/RoundRobin/Info.plist

ios-prod-info-plist: ios-rm-info-plist
	cp con/prod-Info.plist ios/RoundRobin/Info.plist


con-clean:
	-rm con/index.js

con-prod: con-clean
	cp con/prod.js con/index.js

con-dev: con-clean
	cp con/dev.js con/index.js

con-stage: con-clean
	cp con/stage.js con/index.js

### Run ###

ios-dev: con-dev ios-dev-info-plist
	react-native run-ios

ios-beta: con-prod ios-prod-info-plist
	fastlane ios beta

android-dev: con-dev android-dev-strings
	react-native run-android

android-alpha: con-prod android-prod-strings
	fastlane android alpha
