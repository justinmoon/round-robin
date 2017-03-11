package com.roundrobin;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.bugsnag.BugsnagReactNative;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;    // Added automatically
// import com.geektime.reactnativeonesignal.ReactNativeOneSignalPackage;  // Added manually. Do we need both?
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.cboy.rn.splashscreen.SplashScreenReactPackage;

import com.BV.LinearGradient.LinearGradientPackage;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    SoLoader.init(this, /* native exopackage */ false);
  }


  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            BugsnagReactNative.getPackage(),
            new ReactNativeConfigPackage(),
            new RNDeviceInfo(),
        new SplashScreenReactPackage(),
        new LinearGradientPackage(),
        new FBSDKPackage(mCallbackManager),
        new ReactNativeOneSignalPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
