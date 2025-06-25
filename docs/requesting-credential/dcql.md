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

## Deep Dive

DCQL operates within the OpenID4VP flow as part of the presentation request. Here's how you use it.

### Basic Structure

Every DCQL query contains a credentials object, containing one or more credential requests. Each credential request is identified by a unique key (chosen by the verifier) and contains the requirements for what type of credential and which claims are being requested.

```json
{
  "credentials": {
    "credential_identifier_1": { /* credential request */ },
    "credential_identifier_2": { /* credential request */ },
    // ... additional credential requests
  }
}
```

### Credential Request Elements

Each credential request within the credentials object consists of several key elements.

#### Credential Identifier (Key)

The object key that identifies this specific credential request:

```json
{
  "credentials": {
    "my_identity_card": { /* ... */ }
  }
}
```

- **Purpose**: Uniquely identifies this credential request within the query
- **Usage**: This same identifier will appear in the response `vp_token` object
- **Requirements**: Must be unique within the query, chosen by the verifier
- **Best Practice**: Use descriptive names that indicate the credential's purpose

#### Format Specification

```json
{
  "format": "vc+sd-jwt"
}
```

Supported formats include:

- `vc+sd-jwt`: SD-JWT Verifiable Credentials <!-- TODO: add cross-links -->
- `mso_mdoc`: ISO mdoc credentials <!-- TODO: add cross-links -->
- `jwt_vc_json`: JWT-encoded W3C Verifiable Credentials <!-- TODO: add cross-links -->
- `ldp_vc`: Linked Data Proof W3C Verifiable Credentials <!-- TODO: add cross-links -->

#### Format-Specific Requirements

A nested object containing requirements specific to the chosen credential format:

For SD-JWT VC (`vc+sd-jwt`):

```json
{
  "vc+sd-jwt": {
    "vct": "https://credentials.example.com/identity_credential",
    "alg_values": ["ES256", "ES384"],
    "hash_alg_values": ["SHA-256"]
  }
}
```

- `vct` (Verifiable Credential Type): The specific type/schema of credential
- `alg_values`: Accepted cryptographic algorithms for signature verification
- `hash_alg_values`: Accepted hash algorithms for selective disclosure

For mdoc (`mso_mdoc`):

```json
{
  "mso_mdoc": {
    "doctype": "org.iso.18013.5.1.mDL",
    "alg_values": ["EdDSA"],
    "hash_algorithm_values": ["SHA-384"]
  }
}
```

- `doctype`: The ISO document type identifier
- `alg_values`: Accepted signature algorithms
- `hash_algorithm_values`: Accepted hash algorithms

#### Claims Specification

Defines which specific claims (data fields) are required from the credential:

For SD-JWT VC Format:

```json
{
  "claims": [
    { "path": ["given_name"] },
    { "path": ["family_name"] },
    { "path": ["address", "street_address"] },
    {
      "path": ["birth_date"],
      "intent_to_retain": false
    }
  ]
}
```

Path-based claims:

- `path`: JSON path array specifying the location of the claim in the credential
- `intent_to_retain`: Optional boolean indicating if the verifier intends to store this claim

For mdoc Format:

```json
{
  "claims": [
    {
      "namespace": "org.iso.18013.5.1",
      "claim_name": "given_name",
      "intent_to_retain": false
    },
    {
      "namespace": "org.iso.18013.5.1", 
      "claim_name": "family_name"
    }
  ]
}
```

Namespace-based claims:

- `namespace`: The ISO namespace containing the claim
- `claim_name`: The specific name of the claim within that namespace
- `intent_to_retain`: Optional retention intent indicator

#### Alternative Claims (Advanced)

For complex requirements where multiple claims could satisfy the same need:

```json
{
  "claims": [
    { "path": ["given_name"] },
    {
      "required": 1,
      "from": [
        { "path": ["age_over_18"] },
        { "path": ["birth_date"] },
        { "path": ["age_birth_year"] }
      ]
    }
  ]
}
```

Alternative structure:

- `required`: Number of claims that must be satisfied from the alternatives
- `from`: Array of alternative claim specifications

Logic: Verifier accepts ANY ONE of the listed alternatives

#### Optional Elements

##### Purpose Statement

Provides human-readable explanation of why this credential is being requested.

```json
{
  "purpose": "Age verification for service access"
}
```

### Complete Example

This example requests an SD-JWT VC for identity verification, requiring the person's given name, family name, and either age verification or birth date information.

```json
{
  "credentials": {
    "identity_verification": {
      "format": "vc+sd-jwt",
      "vc+sd-jwt": {
        "vct": "https://credentials.example.com/identity_credential",
        "alg_values": ["ES256", "ES384"],
        "hash_alg_values": ["SHA-256"]
      },
      "purpose": "Identity verification for account creation",
      "claims": [
        { "path": ["given_name"] },
        { "path": ["family_name"] },
        {
          "required": 1,
          "from": [
            { "path": ["age_over_18"] },
            { "path": ["birth_date"] }
          ]
        }
      ]
    }
  }
}
```

## Sample DCQL Queries

> COMING SOON
