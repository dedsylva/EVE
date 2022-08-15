package com.eva;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import android.content.pm.PackageManager;
import android.content.Intent;
import android.content.ComponentName;


public class UsbModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  UsbModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "UsbModule";
  }

  @ReactMethod
  private void openOTG(Callback callback) {
      String activityName = "com.dingtai.snakecamera.ui.MainActivity";
      PackageManager pm = this.reactContext.getPackageManager();
      try {
          Intent intent = new Intent("android.intent.action.MAIN");
          intent.setComponent(new  ComponentName("com.dingtai.snakecamera","com.dingtai.snakecamera.ui.MainActivity"));
          intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
          this.reactContext.startActivity(intent);
          callback.invoke("Success"); 
      } catch (Exception e) {
          callback.invoke(e);
      }
  }


}
