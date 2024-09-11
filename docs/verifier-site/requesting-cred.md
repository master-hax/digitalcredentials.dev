---
sidebar_position: 1
---

# Requesting a Credential

You can build a website that uses the JS API to request documents on the web.

```javascript
// Gets a CBOR with specific fields out of mobile driver's license as an mdoc
const controller = new AbortController();
const {protocol, data} = await navigator.identity.get({
  signal: controller.signal,
  digital: {
    providers: [{
      protocol: "openid4vp",
      request: {
        response_type: "vp_token",
        nonce: "n-0S6_WzA2Mj",
        client_metadata: {...},
        presentation_definition: {...}
      }
    }],
  }
});
```