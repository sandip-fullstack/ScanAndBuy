package com.awesomeproject;

import android.app.Application;
import cl.json.ShareApplication;
import com.facebook.react.ReactApplication;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.masteratul.downloadmanager.ReactNativeDownloadManagerPackage;
// import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.imagepicker.ImagePickerPackage;
import cl.json.RNSharePackage;
import com.horcrux.svg.SvgPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {
@Override
    public String getFileProviderAuthority() {
            return BuildConfig.APPLICATION_ID + ".provider";
     }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
    
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new GoogleAnalyticsBridgePackage(),
            new ReactNativeDownloadManagerPackage(),
            // new RNViewShotPackage(),
            new ImagePickerPackage(),
            new RNSharePackage(),
            new SvgPackage(),
            new VectorIconsPackage(),
            new ReactVideoPackage(),
            new RNGestureHandlerPackage(),
            new RNCameraPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
