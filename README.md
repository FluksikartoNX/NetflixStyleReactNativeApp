# NetflixStyleReactNativeApp

React Native app built with [Expo](https://docs.expo.dev/) (SDK 58) and TypeScript. It runs on Android and iOS.

| Concern    | Tool                                                                           |
| ---------- | ------------------------------------------------------------------------------ |
| Framework  | Expo + React Native 0.88                                                       |
| Styling    | [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS for React Native)   |
| HTTP       | [axios](https://axios-http.com/) (preconfigured client in `src/api/client.ts`) |
| Lint       | ESLint 9 (flat config, `eslint-config-expo`) + `eslint-plugin-prettier`        |
| Formatting | Prettier + `prettier-plugin-tailwindcss` (sorts class names automatically)     |

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

## 4. Project structure

```
App.tsx                 Root component (Hello World screen)
global.css              Tailwind directives, imported once in App.tsx
tailwind.config.js      Theme (brand colors) + content paths
babel.config.js         NativeWind Babel preset
metro.config.js         NativeWind Metro plugin
src/api/client.ts       Shared axios instance (base URL, timeout, auth header, error mapping)
src/api/services/       One file per API resource (example: posts.ts)
```

Put new code under `src/` (for example `src/components`, `src/screens`, `src/hooks`). Tailwind only generates classes for
files matched by `content` in `tailwind.config.js`, which already includes `./src/**/*`.

## 5. Styling with Tailwind (NativeWind)

Use `className` on React Native components:

```tsx
<View className="flex-1 items-center justify-center bg-background">
  <Text className="text-2xl font-bold text-brand">Hello</Text>
</View>
```

Custom colors (`brand`, `brand-dark`, `background`) live in `tailwind.config.js`. Restart with `npx expo start -c`
(clears the cache) after changing the Tailwind config.

## 6. Calling an API

1. Copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_URL`.
2. Add a service in `src/api/services/`:

```ts
import { apiClient } from '../client';

export async function getMovies() {
  const { data } = await apiClient.get<Movie[]>('/movies');
  return data;
}
```

- Errors are normalized to `{ status, message }` (`ApiError`).
- Call `setAuthToken(token)` after login and every request sends `Authorization: Bearer <token>`.
- **Local backend:** `localhost` on the phone is the phone itself. Use your PC's LAN IP (`ipconfig`, e.g.
  `http://192.168.1.10:3000`), or `http://10.0.2.2:3000` from the Android emulator. Plain `http://` URLs work
  in development. Use `https://` for production builds.
- `EXPO_PUBLIC_*` values are compiled into the app. Never put secrets in them.

## 7. iOS

The code is cross-platform. Without a Mac you can still test iOS by opening the project in Expo Go on an iPhone, or
by building it with EAS Build (`npx eas-cli@latest build -p ios`, which needs an Apple Developer account).

## Useful links

- Expo docs: https://docs.expo.dev/
- Expo tutorial: https://docs.expo.dev/tutorial/introduction/
- React Native docs: https://reactnative.dev/docs/getting-started
- NativeWind docs: https://www.nativewind.dev/
- Navigation (you will need it for multiple screens): Expo Router: https://docs.expo.dev/router/introduction/
