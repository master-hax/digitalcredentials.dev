---
sidebar_position: 3
---

# Requirements

## Testing with Chrome on Android

1. Ensure the Identity Credential API is enabled on Android

   - Ensure Google Play Services is at least version 23.40 or greater. This can be found by going to do `Settings > All apps > Google Play Services`
   - Note it is no longer necessary to enroll your Android device in the Google Play Services [Beta program](https://developers.google.com/android/guides/beta-program)

2. Enable the Identity Credential API in Chrome
   - Any current version of Chrome should work, but to stay up-to-date with weekly improvements you may want to install the ["Chrome Dev" build](https://play.google.com/store/apps/details?id=com.chrome.dev&hl=en_US&gl=US)
   - Open chrome and go to `chrome://flags`
   - Search for `digital credentials` and enable the `DigitalCredentials` flag, then hit "relaunch".

