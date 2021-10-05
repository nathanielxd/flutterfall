# Rainwater

Rainwater is a strict clean architectural design pattern for the Flutter framework, featuring:

- Separation of models, logic and view
- A firm and consistent directory structure easy to understand
- Treatment of models &amp; data providers as microservices separate from the main app
- Abstraction of data repositories allowing modular backend implementation

Rainwater allows you to employ clean architecture in Flutter, simplifying the separation of code into independent layers. 
This will ensure that your project is scalable, easy to read and consistent while maintaining simplicity.

Rainwater is based on [bloc](https://pub.dev/packages/flutter_bloc) for state-management, 
[formz](https://pub.dev/packages/formz) for form representation input and 
[equatable](https://pub.dev/packages/equatable). 
It also features a [VSCode extension](https://github.com/nathanielxd/rainwater/master/extensions/vscode) to help a quick implementation.

## Requirements

- Flutter installed on your system
- Intermediate knowledge of Flutter and BLoC
- (For the extension) VSCode installed on your system

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

_Lib_ contains folders - each representing **a feature** (eg. _profile\_creation_) 
and _packages_ - containing Flutter or Dart modules that are either a **widget library** (_my\_flutter\_theme_) or 
a domain of **models** and **data repositories** _(my\_flutter\_authentication)_.

You can use the extension to quickly create features or packages.
