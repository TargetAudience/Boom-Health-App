package com.boomhealth_app;

import android.os.Bundle; // <- add this necessary import
import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash; // <- add this necessary import

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import java.security.MessageDigest;
import android.util.Log;
import android.util.Base64;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "boomhealth_app";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this); // <- display the generated bootsplash.xml drawable over our MainActivity
    //getKeyHash();
  }

   public void getKeyHash(){
    try {
      PackageInfo info = getPackageManager().getPackageInfo(
              getPackageName(), PackageManager.GET_SIGNATURES);
      for (Signature signature : info.signatures) {
          MessageDigest md = MessageDigest.getInstance("SHA");
          md.update(signature.toByteArray());
          Log.d("KeyHash:", Base64.encodeToString(md.digest(), Base64.DEFAULT));
      }
    } catch (Exception e) {
      Log.e("TAG",e.getMessage());
    }
  }
}

