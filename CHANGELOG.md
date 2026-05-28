# Changelog

All notable changes to `@friendlyai/paybot-sdk` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **BREAKING (package name):** renamed `paybot-sdk` → `@friendlyai/paybot-sdk`. No code/API changes. Update your install:

  ```bash
  npm install @friendlyai/paybot-sdk
  ```

  And update your imports:

  ```typescript
  // Before
  import { PayBotClient } from 'paybot-sdk';

  // After
  import { PayBotClient } from '@friendlyai/paybot-sdk';
  ```

  Reason: the unscoped name `paybot-sdk` was not owned by the npm account behind `NPM_TOKEN`, causing every `publish` job on `main` to fail with `npm error 404`. Scoping under `@friendlyai` (an org we own) unblocks publish.

## [0.3.0]

Previous releases were not published to npm. See git history for changes prior to the scope rename.
