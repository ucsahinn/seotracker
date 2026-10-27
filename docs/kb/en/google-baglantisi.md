---
title: Connecting to Google
description: Select installation credentials and project properties separately; distinguish configuration from access.
kind: nasil-yapilir
updated: 2026-10-27
---

## Credentials and properties have different scopes

Google credentials in Settings apply to the installation. The property in Project settings → Connections belongs to one project. Stored means the credential was saved; Property selected means the binding was saved. Neither verifies report access. Check the latest source state in Search performance or Analytics. Analytics shows the property timezone and currency beside its identity. Selecting a property does not install website tracking.

## Service account

Enable Search Console API and, for Analytics, Admin API and Data API in Google Cloud. Create a service account and download its JSON key. In Settings → Service account, select the file or use the masked paste field, then save. The private key is not displayed. Add the visible account email to Search Console with Full access and Analytics with Viewer access. Then choose each project's property.

## OAuth alternative

Create a Google Cloud OAuth Web application client. Register both callback URLs shown in Settings exactly. Save the client ID and secret in Settings. Authorize Google from project connections and choose the property. A stored service account takes priority over OAuth.

## Recovery

A failed list refresh preserves the previous properties. An empty list alone does not prove missing access. Reconnect expired grants; check property permissions for denied access and the Cloud project for disabled APIs. Wait and retry rate limits. For unknown failures use Retry and Help diagnostics. Removing a credential here does not revoke it at Google. Changing a project domain preserves its property binding and history.
