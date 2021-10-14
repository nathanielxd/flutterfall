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

You can use [the extension](https://github.com/nathanielxd/flutterfall/master/extensions/vscode) to quickly create features or packages.