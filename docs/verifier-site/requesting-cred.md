---
sidebar_position: 1
---

# Requesting a Credential

You can build a website that uses the JS API to request documents on the web.

```javascript
// Gets a CBOR with specific fields out of mobile driver's license as an mdoc
const controller = new AbortController();
const {response} = await navigator.identity.get({
    signal: controller,
    digital: {
      providers: [{
        protocol: "basic",
        request: JSON.stringify({
          selector: {
            format: ["mdoc"],
            retention: {days: 90},
            doctype: "org.iso.18013.5.1.mDL",
            fields: [
              "org.iso.18013.5.1.document_number",
              "org.iso.18013.5.1.portrait",
              "org.iso.18013.5.1.driving_privileges",
              "org.iso.18013.5.1.aamva.organ_donor",
            ],
          },
          nonce: "gf69kepV+m5tGxUIsFtLi6pwg=",
          // TODO: maybe move this out of request and into publicKey?
          readerPublicKey: "ftl+VEHPB17r2 ... Nioc9QZ7X/6w...",
        }
      })],
    }
});
```