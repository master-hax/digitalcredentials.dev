---
sidebar_position: 3
title: "DCQL"
---

# Digital Credentials Query Language

## What is DCQL?

The Digital Credentials Query Language (DCQL) is a JSON-encoded query language defined as part of [OpenID4VP](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-digital-credentials-query-l) and used to express which credentials a verifier would like to request from a holder.

DCQL provides a standardized, flexible syntax for verifiers to specify exactly what verifiable credentials and claims they need from users, supporting multiple credential formats including W3C Verifiable Credentials, SD-JWT VCs, and ISO mdoc credentials.

At its core, DCQL replaces the previous presentation definition approach with a more intuitive and powerful query language that allows verifiers to express complex credential requirements using familiar JSON syntax with logical operators and credential alternatives.

## Why is DCQL Needed?

The development of DCQL addresses several critical limitations in the verifiable credentials ecosystem:

**Complex Query Requirements**: Traditional credential request mechanisms struggled with expressing sophisticated requirements like "provide either a driver's license OR a passport AND proof of address." DCQL enables these complex logical relationships through nested query structures with required and from operators.

**Format Agnosticism**: Modern credential ecosystems need to support multiple formats simultaneously. DCQL provides format-specific query capabilities while maintaining a unified query interface, allowing verifiers to request the same logical information across different credential types (SD-JWT VC, mdoc, W3C VC) without needing separate query mechanisms.

**User Experience Optimization**: DCQL enables wallets to present more intelligent user interfaces by understanding credential alternatives and preferences. Instead of overwhelming users with all possible credential options, wallets can make smart decisions about which credentials to offer based on the verifier's expressed preferences and the user's available credentials.

**Developer Clarity**: The JSON-based syntax makes it significantly easier for developers to construct, read, and debug credential requests compared to previous presentation definition formats. The hierarchical structure clearly expresses the logical relationships between credential requirements.

## How DCQL is Used

DCQL operates within the OpenID4VP flow as part of the presentation request. Here's how it works in practice:

### Basic Structure

Every DCQL query contains a credentials object where each credential request is identified by a unique key:

```json
{
  "credentials": {
    "identity_credential": {
      "format": "vc+sd-jwt",
      "vc+sd-jwt": {
        "vct": "https://credentials.example.com/identity_credential"
      },
      "claims": [
        { "path": ["given_name"] },
        { "path": ["family_name"] }
      ]
    }
  }
}
```

#### Format-Specific Queries

DCQL adapts to different credential formats. For SD-JWT VCs, claims are specified using JSON path notation, while mdoc credentials use namespace and claim name pairs:

**SD-JWT VC Format:**

```json
"claims": [
  { "path": ["address", "street_address"] }
]
```

**mdoc Format:**

```json
"claims": [
  {
    "namespace": "org.iso.18013.5.1",
    "claim_name": "given_name"
  }
]
```

#### Alternative Requirements

DCQL's power lies in expressing alternatives and complex logic:

```json
{
  "required": 1,
  "from": [
    { "path": ["age_over_18"] },
    { "path": ["birth_date"] },
    { "path": ["age_birth_year"] }
  ]
}
```

This requests ANY ONE of the three age-related claims, with the order indicating verifier preference.

## Example Queries
