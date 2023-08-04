package com.pip;

import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.pip.MyCustomPIPModule;
import android.content.Intent;
import android.content.res.Configuration;



public class MainActivity extends ReactActivity {
  // MyCustomPIPModule module=new MyCustomPIPModule((ReactApplicationContext) getReactInstanceManager().getCurrentReactContext());
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "PIP";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  private ReactInstanceManager reactInstanceManager;

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );

  }
  @Override
  protected void onPause(){
    super.onPause();
    Log.e("TAG", "onPause: " );
    MyCustomPIPModule customModule = new MyCustomPIPModule(getReactNativeHost().getReactInstanceManager().getCurrentReactContext());
    // module.EnterPipMode();
    customModule.EnterPipMode();

  }
  @Override
  protected void onResume(){
    super.onResume();
    Log.e("TAG", "onResume: " );
      //setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);

  }

  @Override
  protected void onStop() {
      super.onStop();
      Log.e("TAG", "onStop: " );
      //MyCustomPIPModule customModule = new MyCustomPIPModule(getReactNativeHost().getReactInstanceManager().getCurrentReactContext());
      //customModule.pauseVideo();
      //finishAndRemoveTask();
      //finishAffinity();
      finish();

    }

    @Override
  public void onConfigurationChanged(Configuration newConfig) {
      super.onConfigurationChanged(newConfig);
      Intent intent = new Intent("onConfigurationChanged");
      intent.putExtra("newConfig", newConfig);
      this.sendBroadcast(intent);
   }

    @Override
    public void onPictureInPictureModeChanged(boolean isInPictureInPictureMode, Configuration newConfig) {
        super.onPictureInPictureModeChanged(isInPictureInPictureMode, newConfig);

        if (isInPictureInPictureMode) {
            // The app entered Picture-in-Picture mode (PiP)
            Log.d("TAG", "Entered Picture-in-Picture mode");
            // Handle video playback, pause, or other actions as needed
            // For example, you can call a method from your custom native module to pause the video:
            // MyCustomVideoModule.pauseVideo();
        } else {
            // The app exited Picture-in-Picture mode
            Log.d("TAG", "Exited Picture-in-Picture mode");
            // Resume video playback or perform any other necessary actions
            // For example, you can call a method from your custom native module to resume the video:
            // MyCustomVideoModule.resumeVideo();
        }
    }
}
