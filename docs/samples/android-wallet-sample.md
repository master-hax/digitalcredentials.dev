---
sidebar_position: 1
---

# Android Wallet Sample

Testing with the OWF Reference Wallet

## Install the apps

1. Ensure you've completed all of the pre-requisites defined here: [Requirements](/requirements/requirements.md)

2. Download and install the sample wallet app [here](assets/appholder-wallet-debug-v20240906.apk). It will appear in the launcher as `IC Purse`.

   :::note
   This is the [Open Wallet Foundation reference wallet](https://github.com/openwallet-foundation-labs/identity-credential/tree/main/appholder) which can also be built directly from source if you prefer.
   :::

```bash
adb install -t <path-to-apk>
```

3. Install the sample reader app [here](assets/appverifier-debug-v20240906.apk). It will appear in the launcher as `App Verifier`.

   :::note
   This is the [Open Wallet Foundation reference verifier app](https://github.com/openwallet-foundation-labs/identity-credential/tree/main/appverifier) which can also be built directly from source if you prefer.
   :::

```bash
adb install -t <path-to-apk>
```

## Generate a test credential

1. Launch the "IC Purse" (App Holder) app and provision a new mDL
2. Tap the menu button and select `Add Self Signed Document`
3. This document will now be available for presentment to native apps and websites

## Present the credential via the DC API

1. In Chrome on your test device, navigate to https://test.digitalcredentials.dev

2. Optionally, customize the request claims

3. Click the "Request Credentials (OpenID4VP)" button

4. Accept the browser privacy warning

5. On the Android credential selector screen, select the mDL you created earlier

6. Peform user verification (face or fingerprint check)

7. The website should show the presented claims

## Request the credential using the native verifier app sample

1. Launch the "App Verifier" app and tap `Request via Credential Manager`. This should invoke the Credential Selector UX showing the available documents that match the request. At this point you see the mDL you provisioned above.

2. Select the mDL. The Verifier app will now show the information it received.

If you got this far, you should have something that looks more or less like the following: https://www.youtube.com/watch?v=mZeSVNK0jlw
