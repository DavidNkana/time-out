import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Timeout — Capacitor 6 + Android (and iOS) main activity config.
 *
 * Approach: The native app is a webview wrapping the deployed web app.
 * This means:
 *   - Single source of truth (one Next.js codebase)
 *   - All SSR features (auth, app-specific routes) work normally
 *   - No static export needed (keeps dynamic routes working)
 *   - App updates instantly on web deploys (no app store review for fixes)
 *
 * Build flow:
 *   1. Web deploys (continuous via git push)
 *   2. `npx cap sync` updates native assets (icons, splash, permissions)
 *   3. Open in Xcode / Android Studio and archive release build
 *
 * App IDs must match the bundles registered in App Store Connect / Play
 * Console:
 *   - iOS:     za.co.timeout.homeandstyle
 *   - Android: za.co.timeout.homeandstyle
 */
const config: CapacitorConfig = {
  appId: 'za.co.timeout.homeandstyle',
  appName: 'Timeout',
  webDir: 'out',

  // Production: native app loads the deployed site.
  // For testing against a local dev server, change this to http://10.0.2.2:3000
  // (Android emulator's loopback to host) or http://localhost:3000 (iOS sim).
  server: {
    url: process.env.CAP_SERVER_URL || 'https://time-out-orpin.vercel.app',
    cleartext: false
  },

  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
    backgroundColor: '#ffffff'
  },

  ios: {
    contentInset: 'automatic',
    backgroundColor: '#ffffff',
    limitsNavigationsToAppBoundDomains: true
  },

  plugins: {
    // Capacitor's default splash screen ships as a placeholder. We disable it
    // here so users go straight from the launcher-icon splash to the WebView,
    // which shows the launcher-background and the in-app React splash component.
    //
    // To restore a native splash: replace the splash.png files in
    // android/app/src/main/res/drawable-{density}/ and revert the
    // launchShowDuration back to a positive number.
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      iosSpinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'default',
      backgroundColor: '#ffffff'
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;
