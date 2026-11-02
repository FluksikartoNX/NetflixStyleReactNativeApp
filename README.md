# NetflixStyleReactNativeApp

## 1. What to install (Windows)

You **do not** need Android Studio to get started.

1. **Node.js LTS**: https://nodejs.org/ (already installed if `node -v` works).
2. **Git**: https://git-scm.com/download/win.
3. **Expo Go on your Android phone**: https://play.google.com/store/apps/details?id=host.exp.exponent
   (iPhone: https://apps.apple.com/app/expo-go/id982107779).
4. **VS Code extensions** (VS Code suggests them when you open the folder): ESLint, Prettier,
   Tailwind CSS IntelliSense, Expo Tools.

Optional, only if you want an emulator on your PC instead of a real phone:

5. **Android Studio**: https://developer.android.com/studio. Follow Expo's guide exactly:
   https://docs.expo.dev/workflow/android-studio-emulator/ (installs the SDK, sets `ANDROID_HOME`, creates a virtual device).

Optional, for later (building an installable APK or publishing):

6. **Expo account** (free): https://expo.dev/signup. Used by EAS Build, which builds Android **and iOS** apps in the cloud,
   so you never need a Mac: https://docs.expo.dev/build/setup/
7. **Google Play Console** (one-time $25 fee): only when you want to publish to the Play Store:
   https://play.google.com/console/signup

## 2. Run the app

```bash
npm install
npm start
```

- **Phone:** make sure the phone and PC are on the same Wi-Fi, open Expo Go, and scan the QR code shown in the terminal.
  If the connection fails (corporate Wi-Fi, firewall), run `npx expo start --tunnel`.
- **Emulator:** start a virtual device in Android Studio, then press `a` in the terminal (or run `npm run android`).

You should see a dark screen with "NETFLIX / Hello World" and the title of a post loaded through axios.

> If Expo Go says the project SDK is incompatible, update Expo Go from the store. If it still fails, see
> https://expo.dev/go for the Expo Go version that matches SDK 58.

## 3. Scripts

| Command                | What it does                              |
| ---------------------- | ----------------------------------------- |
| `npm start`            | Start the Metro dev server (QR code)      |
| `npm run android`      | Start and open on Android emulator/device |
| `npm run lint`         | ESLint (including Prettier issues)        |
| `npm run lint:fix`     | ESLint with autofix                       |
| `npm run format`       | Format every file with Prettier           |
| `npm run format:check` | Check formatting without changing files   |
| `npm run typecheck`    | TypeScript check (`tsc --noEmit`)         |
| `npm run doctor`       | Check Expo config and dependency versions |

Add new packages with `npx expo install <package>` instead of `npm install`. It picks versions compatible with the
current Expo SDK.

## Useful links

- Expo docs: https://docs.expo.dev/
- Expo tutorial: https://docs.expo.dev/tutorial/introduction/
- React Native docs: https://reactnative.dev/docs/getting-started
- NativeWind docs: https://www.nativewind.dev/
- Navigation (you will need it for multiple screens): Expo Router: https://docs.expo.dev/router/introduction/
