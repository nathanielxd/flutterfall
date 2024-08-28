<img src="docs/assets/artwork/logo.png" alt="drawing" height="200"/>

[![CLI](https://img.shields.io/badge/CLI-0.0.1-red?style=for-the-badge)](https://github.com/nathanielxd/brut/blob/main/cli/README.md) [![Examples](https://img.shields.io/badge/Examples-4-darkgreen?style=for-the-badge)](https://github.com/nathanielxd/brut/blob/main/docs/DOCS.md#examples) [![Docs](https://img.shields.io/badge/Docs-WIP-yellow?style=for-the-badge)](https://github.com/nathanielxd/brut/tree/main/docs/DOCS.md) 

An architectural design pattern for the Flutter framework.

## Overview

BRUT is an architectural design pattern that uses BLoC to create an architecture featuring:

Separation of models, logic and view
A firm and consistent directory structure that is easy to understand
Treatment of models and data providers as microservices separate from the main application
Abstraction of data repositories, allowing modular backend implementation

The goal is to allow you to employ clean architecture in Flutter, simplifying code separation into independent layers. These rules will ensure that your project is scalable, easy to read, and consistent while maintaining simplicity.

**Based on**

BRUT is based on [bloc](https://pub.dev/packages/flutter_bloc) for stream-based state-management, [formz](https://pub.dev/packages/formz) for form representation input and [equatable](https://pub.dev/packages/equatable).

## Requirements

- Intermediate knowledge of Flutter, streams and BLoC
- (For the BRUT CLI) [Mason CLI](https://pub.dev/packages/mason_cli) installed on your system

If you doubt how bloc works, I recommend [this article](https://www.didierboelens.com/2018/08/reactive-programming-streams-bloc/).

# Quick Start

The general directory structure of a BRUT app looks similar to this:

```
my_flutter_app/
├─ lib/
│  ├─ features/
│  │  ├─ app/
│  │  ├─ authentication/
│  │  ├─ profile_creation/
│  ├─ l10n/
│  ├─ plugins/
│  ├─ main_development.dart/
│  ├─ main_staging.dart/
│  ├─ main_production.dart/
├─ packages/
│  ├─ my_flutter_authentication/
│  ├─ my_flutter_theme/
├─ pubspec.yaml
```

* /lib/features contains folders each representing **a feature** (eg. /profile_creation/)
* /packages/ has Flutter or Dart modules as either a **widget library** (/my_flutter_theme/) or a domain of **models** and **data repositories** (/my_flutter_authentication/).

You can use [the cli](https://github.com/nathanielxd/brut/tree/main/cli/README.md) to quickly create features or packages.

# Documentation

- [Full Documentation](https://github.com/nathanielxd/brut/tree/main/docs/DOCS.md).
- [VSCode Extension](https://github.com/nathanielxd/brut/tree/main/extensions/vscode).
