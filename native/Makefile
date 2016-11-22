
### Config ###

config-clean:
	-rm config/index.js

config-prod: config-clean
	cp config/prod.js config/index.js

config-dev: config-clean
	cp config/dev.js config/index.js

config-stage: config-clean
	cp config/stage.js config/index.js

### Run ###

ios-dev: config-dev
	react-native run-ios

ios-beta: config-prod
	fastline ios beta

android-dev: config-dev
	react-native run-android

android-alpha: config-prod
	fastline android alpha
