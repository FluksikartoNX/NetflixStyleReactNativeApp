# NetflixStyleReactNativeApp

A Netflix-style movie browser built with Expo (SDK 58), React Native, TypeScript, NativeWind, TanStack Query and
React Navigation. Movie data comes from the [OMDb API](https://www.omdbapi.com/). Runs on iOS and Android.

## 1. Setup (all platforms)

Requires **Node.js LTS**: https://nodejs.org/ (check with `node -v`).

```bash
git clone <repo-url>
cd NetflixStyleReactNativeApp
npm install
```

Create the `.env` file from the example (it holds the OMDb API URL and key):

```bash
# macOS / Linux
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

## 2. Run on iOS

### Option A: real iPhone (no Mac needed, quickest)

1. Install **Expo Go** from the App Store: https://apps.apple.com/app/expo-go/id982107779
2. Run `npm start` on your computer.
3. Make sure the iPhone and computer are on the same Wi-Fi, then scan the QR code in the terminal with the
   **iPhone Camera app** and tap the banner to open it in Expo Go.

If the phone can't connect (corporate Wi-Fi, firewall, VPN), use `npx expo start --tunnel` instead.

### Option B: iOS Simulator (macOS only)

1. Install **Xcode** from the Mac App Store: https://apps.apple.com/app/xcode/id497799835
2. Open Xcode once and accept the license. When asked which platforms to install, select **iOS**
   (or later: Xcode → Settings → Components → install the iOS Simulator runtime).
3. Install the command line tools if prompted: `xcode-select --install`.
4. Run:

   ```bash
   npm run ios
   ```

   This starts the dev server, boots the simulator, installs Expo Go in it and opens the app.
   If the dev server is already running, press `i` in the terminal instead.

Full guide: https://docs.expo.dev/workflow/ios-simulator/

## 3. Run on Android

### Option A: real Android phone

1. Install **Expo Go** from Google Play: https://play.google.com/store/apps/details?id=host.exp.exponent
2. Run `npm start`, then scan the QR code **from inside Expo Go** (same Wi-Fi as the computer).

### Option B: Android emulator (Windows, macOS, Linux)

1. Install **Android Studio**: https://developer.android.com/studio and follow Expo's setup guide
   (installs the SDK, sets `ANDROID_HOME`, creates a virtual device):
   https://docs.expo.dev/workflow/android-studio-emulator/
2. Start the virtual device, then run `npm run android` (or press `a` in a running dev server).

## Troubleshooting

- **"Project is incompatible with this version of Expo Go"**: update Expo Go from the store. This project uses
  **SDK 58**; see https://expo.dev/go for the matching Expo Go version.
- **Changes to `.env` are not picked up**: restart with a cleared cache: `npx expo start -c`.
- **Movies don't load / "Invalid API key"**: check that `.env` exists and contains `EXPO_PUBLIC_OMDB_API_KEY`.

## Scripts

| Command                | What it does                                     |
| ---------------------- | ------------------------------------------------ |
| `npm start`            | Start the Metro dev server (QR code)             |
| `npm run ios`          | Start and open in the iOS Simulator (macOS only) |
| `npm run android`      | Start and open on Android emulator/device        |
| `npm run lint`         | ESLint (including Prettier issues)               |
| `npm run lint:fix`     | ESLint with autofix                              |
| `npm run format`       | Format every file with Prettier                  |
| `npm run format:check` | Check formatting without changing files          |
| `npm run typecheck`    | TypeScript check (`tsc --noEmit`)                |
| `npm run doctor`       | Check Expo config and dependency versions        |

Add new packages with `npx expo install <package>` instead of `npm install`. It picks versions compatible with the
current Expo SDK.

## Useful links

- Expo docs: https://docs.expo.dev/
- React Native docs: https://reactnative.dev/docs/getting-started
- NativeWind docs: https://www.nativewind.dev/
- TanStack Query docs: https://tanstack.com/query/latest/docs/framework/react/overview
- React Navigation docs: https://reactnavigation.org/docs/getting-started
