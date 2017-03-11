/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"

#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKShareKit/FBSDKShareKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>

#import "ReactNativeConfig.h"

#import "SplashScreen.h"

@implementation AppDelegate
@synthesize oneSignal = _oneSignal;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  [[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];

  #if DEBUG
    // For Debug build load from development server. Start the server from the repository root:
    //
    // $ npm start
    #if TARGET_IPHONE_SIMULATOR
        // Run from locally running dev server
        jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle"];
    #else
        // Run on device with code coming from dev server on PC (change the IP to your PCs IP)
        jsCodeLocation = [NSURL URLWithString:@"http://round-robin-native.ngrok.io/index.ios.bundle"];
    #endif
  #else
    // For production load from pre-bundled file on disk. To re-generate the static bundle, run
    //
    // $ curl http://localhost:8081/index.ios.bundle -o main.jsbundle
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif

  NSString *appId = [ReactNativeConfig envFor:@"ONESIGNAL_APP_ID"];
  self.oneSignal = [[RCTOneSignal alloc] initWithLaunchOptions:launchOptions
                                                       appId:appId];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"RoundRobin"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [SplashScreen show];
  return YES;
}
- (BOOL)application:(UIApplication *)application 
            openURL:(NSURL *)url 
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
    openURL:url
    sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
    annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
  ];
  // Add any custom logic here.
  return handled;
}

// Required for the notification event.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification {
    [RCTOneSignal didReceiveRemoteNotification:notification];
}

@end
