# Flutterfall

A strict architectural design pattern for the Flutter framework.

## Overview

Features:

- Separation of models, logic and view
- A firm and consistent directory structure easy to understand
- Treatment of models and data providers as microservices separate from the main application
- Abstraction of data repositories allowing modular backend implementation

The goal is to allow you employ **clean architecture** in Flutter, simplifying the separation of code into independent layers. These rules will ensure that your project is scalable, easy to read and consistent while maintaining simplicity.

## Based on

Rainwater is based on [bloc](https://pub.dev/packages/flutter_bloc) for stream-based state-management, [formz](https://pub.dev/packages/formz) for form representation input and [equatable](https://pub.dev/packages/equatable). It also features a [VSCode extension](https://github.com/nathanielxd/rainwater/master/extensions/vscode) to help a quick implementation.

## Requirements

- Flutter installed on your system
- Intermediate knowledge of Flutter, streams and BLoC
- (For the extension) VSCode installed on your system

If you are in doubt on how bloc works, I recommend [this article](https://www.didierboelens.com/2018/08/reactive-programming-streams-bloc/).

# Quick Start

The general directory structure of a Flutter app looks like this:

```
my_flutter_app/
├─ lib/
│  ├─ app/
│  ├─ authentication/
│  ├─ profile_creation/
│  ├─ main.dart
├─ packages/
│  ├─ my_flutter_authentication/
│  ├─ my_flutter_theme/
├─ pubspec.yaml
```

- _Lib_ contains folders each representing **a feature** (eg. _profile\_creation_) 
- _packages_ has Flutter or Dart modules that are either a **widget library** (_my\_flutter\_theme_) or a domain of **models** and **data repositories** _(my\_flutter\_authentication)_.

You can use [the extension](https://github.com/nathanielxd/rainwater/master/extensions/vscode) to quickly create features or packages.

# Documentation

- [Full Documentation](https://github.com/nathanielxd/rainwater/master/docs/DOCS.md).
- [VSCode Extension](https://github.com/nathanielxd/rainwater/master/extensions/vscode).