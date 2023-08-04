package com.pip;

import android.app.Activity;
import android.app.PictureInPictureParams;
import android.os.Build;
import android.util.Log;
import android.util.Rational;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MyCustomPIPModule extends ReactContextBaseJavaModule {
    private Rational aspectRatio;
    private ReactContext reactContext;

    MyCustomPIPModule(ReactContext reactContext){
        super((ReactApplicationContext) reactContext);
        aspectRatio = new Rational(16,9);
    }


    @NonNull
    @Override
    public String getName() {
        return "PipModule";
    }

    @ReactMethod
    public void EnterPipMode(){

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            PictureInPictureParams params = new PictureInPictureParams.Builder().setAspectRatio(this.aspectRatio).build();
            getCurrentActivity().enterPictureInPictureMode(params);
        }
    }
    @ReactMethod
    public void exitPIPMode() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            // Check if the current activity is in PiP mode
            if (currentActivity.isInPictureInPictureMode()) {
                // Exit PiP mode by finishing the current activity
                currentActivity.finish();
            }
        }
    }
    @ReactMethod
    public void pauseVideo() {
        ReactContext reactContext = getReactApplicationContext();
        Log.e("TAG", "we are in" );
        if(reactContext!=null) {
            Log.e("TAG", "context is not null " );
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("pauseVideo", true);
        }else{
            Log.e("TAG", "context is null " );
        }
    }
}
