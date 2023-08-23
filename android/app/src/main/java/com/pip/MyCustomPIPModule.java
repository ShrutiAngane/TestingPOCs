package com.pip;

import android.app.Activity;
import android.app.PictureInPictureParams;
import android.os.Build;
import android.util.Log;
import android.util.Rational;



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
    public void checkPlayer(boolean value) {
        // Handle the received boolean value in your MainActivity
        Log.d("MyTag", "Variable value: " + value);
        Activity activity = getCurrentActivity();
        if (activity instanceof MainActivity) {
            MainActivity mainActivity = (MainActivity) activity;
            mainActivity.receiveBooleanData(value);
        }
    }

    @ReactMethod
    public void DummyMethod(){
        Log.e("TAG","i am dummy");
    }
}
