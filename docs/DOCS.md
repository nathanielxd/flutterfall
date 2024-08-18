# Documentation

This document analyzes the architecture, structure, and implementation of the architectural design pattern BRUT.

## Table of Contents

1. [Overview](#overview)
2. [General Architecture](#general-architecture)
3. [Directory Structure](#directory-structure)
4. [Examples](#examples)
5. [CLI](#cli)
6. [Why?](#why)
7. [Contribute](#contribute)

## Overview

BRUT is an architectural design pattern that uses BLoC to create an architecture featuring:

- Separation of models, logic and view
- A firm and consistent directory structure that is easy to understand
- Treatment of models and data providers as microservices separate from the main application
- Abstraction of data repositories, allowing modular backend implementation

## General Architecture

![](assets/diagrams/General_Module-Feature_front.png)

By using the bloc pattern, we separate our application into three layers:
- Presentation View
- Business Logic
- Data
  - Models
  - Repositories

We treat and organise these layers as such:
- A **feature** is a 1-to-1 correspondence of *business logic* and *presentation*
- A **module** is a package that acts as a microservice consisting of *models* and *data repositories* that feed into multiple features

A general relation between data and features can be observed in the following diagram:

![](assets/diagrams/General_Module-Feature.png)

### Data Layer

The data layer is our module layer. A data module contains **models**, **data sources**, and **data repositories** that provide our application with either real or mocked data.

**Reusable**: Treating data layers as microservices helps us with reusability across multiple projects and is generally a good rule for clean architecture. These services are basic Flutter or Dart **packages**, then referenced in our main app's `pubspec.yaml` file.
![](assets/screenshots/packages_dir_example.png)

These packages can be stored in a directory - */packages* or */modules* in our main project folder and referenced locally or elsewhere, such as hosted on a git source.

[See directory example for modules.](#module_directory)

**Scalable**: For each data source, there MUST be an abstract repository **interface** implemented by one or more repositories. This allows us to implement multiple repositories (e.g., Firebase, RESTful, Mocked, Local Storage) and switch them whenever we need to or migrate to another provider, ensuring scalability.

```dart
abstract class AuthenticationApi {
  /// Get a stream of current users.
  Stream<User> get stream;
  /// Get current user.
  User get currentUser;
  /// Authenticate a new user and update [stream].
  Future<void> login(String email, String password);
  /// Logs out the existing user and updates [stream] with an empty user.
  Future<void> logout();
}
```

### Business Logic Layer

The business logic layer is a bridge between the user interface—presentation and the data layer. BRUT architecture imposes certain rules that organize the business logic.

**Abstraction**: From a presentation point of view, each feature —a widget, page, or multitude of pages—has no more than **one** business logic component. This forces us to expand our app functionality to as many features as possible.

> **Example**
> We want to implement authentication; therefore, we made a signup page and a log-in page. We will create two **features** so there will be a logic component for each of them: 
- sign_up_bloc.dart - handles account creation, user input of 3 text fields (email, password, confirmation)
- login_bloc.dart - containing account authentication, user input two text fields (email, password)

All these BLoCs will use the same authentication_repository.dart.

![](assets/diagrams/Simple_Module-Feature.png)

Of course, depending on our needs, we could create only one feature, authentication, with only one bloc and only one page. But separating them as much as possible is generally good practice, especially when considering UI and navigation.

**Consistency**: Try avoiding **Bloc-to-Bloc** communication as much as possible. Keeping a clean layered pattern is not only beneficial to our app's functioning and testing capabilities but also makes it easier to read and understand. Modules have a many-to-many relationship with features, and blocs should have no relationship between them at all.

[See directory structure for business logic.](#bloc_directory)

**Injection**: Blocs should respect the repository pattern and use data through dependency injection.

```dart
class AuthenticationBloc extends Bloc<AuthenticationEvent, AuthenticationState>{

  final AuthenticationRepository authenticationRepository;

  const AuthenticationBloc({
    required this.authenticationRepository
  });
}
```

### Presentation Layer

The presentation layer is strictly UI-building reactive to the bloc's state. It would be best to separate all the presentation-building in a file *example_view.dart* away from the bloc provider declaration in *example_page.dart*.

**Example (_view.dart)**

```dart
import 'package:flutter/material.dart';

class AuthenticationView extends StatelessWidget {

  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: [
            Text('Authentication'),
            Text('View')
          ]
        )
      )
    );
  }
}
```

**Example (_page.dart)**

```dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class AuthenticationPage extends StatelessWidget {

  static PageRoute get route => MaterialPageRoute(builder: (_) => AuthenticationPage());

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => AuthenticationBloc(),
      child: AuthenticationView()
    );
  }
}
```

UI components throughout the app can reference themselves. Only bloc-to-bloc is discouraged. For example, I can use a widget from my tasks feature on my account page or vice versa.

[See directory structure for presentation.](#view_directory)

### Full Example

![](assets/diagrams/Advanced_Module-Feature.png)

## Directory Structure

To make an idea of how a project using the BRUT architecture looks like in terms of folder hierarchy, see the following expanded tree:

```
.
└── my_flutter_app/
    ├── lib/
    │   ├── features/
    │   │   ├── app
    │   │   ├── auth/
    │   │   │   ├── cubit/
    │   │   │   │   ├── auth_cubit.dart
    │   │   │   │   └── auth_state.dart
    │   │   │   ├── input/
    │   │   │   │   ├── email_input.dart
    │   │   │   │   └── password_input.dart
    │   │   │   ├── view/
    │   │   │   │   ├── auth_page.dart
    │   │   │   │   └── auth_view.dart
    │   │   │   ├── widgets/
    │   │   │   │   └── auth_tab_widget.dart
    │   │   │   └── auth.dart
    │   │   └── profile_creation
    │   ├── l10n
    │   └── plugins
    ├── packages/
    │   ├── my_authentication/
    │   │   ├── lib/
    │   │   │   ├── src/
    │   │   │   │   ├── models/
    │   │   │   │   │   └── user_account.dart
    │   │   │   │   ├── exceptions/
    │   │   │   │   │   └── auth_exception.dart
    │   │   │   │   ├── apis/
    │   │   │   │   │   ├── auth_api.dart
    │   │   │   │   │   ├── firebase_auth_api.dart
    │   │   │   │   │   └── mocked_auth_api.dart
    │   │   │   │   └── auth_repository.dart
    │   │   │   └── my_authentication.dart
    │   │   └── pubspec.yaml
    │   └── my_theme
    └── pubspec.yaml
```

### Breakdown

The `lib/features` folder must contain directories, each representing a piece of functionality or **feature**. 
```
lib/
└── features/
    ├── app/
    ├── authentication/
    ├── profile_creation/
    └── settings/
```
---

The `lib/` directory must contain your app's entry points (e.g., `main_development.dart`), localisation files, and other plugins and extensions.

```
lib/
├── features/
├── l10n/
├── plugins/
├── main_development.dart
├── main_staging.dart
└── main_production.dart
```
---

The `packages/` folder contains directories, each representing a module that exposes models, data repositories, or a theme library. Custom packages are generally made solely for the project.

```
packages/
├── my_app_auth/
├── my_app_notifications/
├── my_app_spaceships/
└── my_app_theme/
```

Treating packages as microservices benefits the overall structure; therefore, it is also allowed to host them somewhere separate, for example, on multiple GitHub repositories. The `packages/` folder only contains local packages.

---

### Feature

A feature directory contains everything regarding that specific piece of functionality. This is where you find your view and logic.

```
authentication/
├── cubit/
│   ├── authentication_cubit.dart
│   └── authentication_state.dart
├── input/
│   ├── email_input.dart
│   └── password_input.dart
├── view/
│   ├── authentication_page.dart
│   └── authentication_view.dart
├── widgets/
│   └── authentication_bar_widget.dart
└── authentication.dart
```


A barrel file (`auth.dart`) is also present, exporting all the files.

```dart
export 'view/authentication_page.dart';
export 'view/authentication_view.dart';
export 'cubit/authentication_cubit.dart';
export 'input/email_input.dart';
export 'input/password_input.dart';
export 'widgets/authentication_bar_widget.dart';
```

All items should follow the snake case convention (e.g. `profile_creation/`, `profile_creation_page.dart`).

### View

The view directory has two files:
- View (`*_view.dart`) - building UI and widgets
- Page (`*_page.dart`) - exposing logic providers and routing

```
view/
├── counter_page.dart
└── counter_view.dart
```

### BLoC

You will write your feature-specific logic in a folder named `cubit/` or `bloc/`. Normally, a BLoC contains three files: the BLoC file, the state and the event. A cubit will only have the cubit and the state (e.g. `*_bloc.dart`, `*_state.dart`).

BRUT standards always prefer using cubits, as logic should be simple enough. Again, this framework's philosophy is simplicity over everything. Logic pieces should be self-explanatory.

```
cubit/
├── counter_cubit.dart
└── counter_state.dart
```

### Input

If your feature contains text fields for user input, a directory `input/` will also be present. Every field type must have it's own [formz](https://pub.dev/packages/formz) file (e.g. email fields will use an `EmailInput` formz class).

```
input/
├── email_input.dart
└── password_input.dart
```

### Widgets

Widgets used inside the view are located in a `widgets` folder.

```
widgets/
├── authentication_logo.dart
└── authentication_tab.dart
```

### Config

A feature might need a configuration or static data. This should go into it's own `config` folder.

### Others

These are the most common folders you will typically find inside a feature, covering most of your needs. If necessary, you can create additional folders. 

## Module

As previously mentioned, we consider modules to be Flutter or Dart packages that we use in our app. To persist abstraction as much as possible, our data services, repositories, and models will be separated into these packages, as will our theme library.

These modules can be located inside the Flutter app directory or in a separate location in case you need to re-use them, for example, for an app's admin panel.

A packages directory situated inside your Flutter app should look similar to the example below:

```
packages/
├── my_app_auth
├── ...
└── my_app_theme
```

### Theme

A theme package is a Flutter library that contains all the custom widgets and theme data used in your app, such as:

- reusable components and widgets
- stylistic elements such as themes, color schemes and typography
- plugins and extensions
- layout units such as static values used in widget padding

**Example**
```
my_app_theme/
├── lib/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── layout/
│   │   └── plugins/
│   ├── components.dart
│   ├── styles.dart
│   ├── layout.dart
│   ├── plugins.dart
│   └── my_app_theme.dart
└── pubspec.yaml
```

**Components**
The components folder holds all widgets used throughout the app such as buttons and text fields. App components are styled with the app brand and reusable.

```
components/
├── scaffolding/
├── buttons/
└── text_fields/
```

**Styles**
Stylistic elements that define how the app looks. This include typography, color schemes and themes. Especially useful if the app uses more than one theme or set of colors.

```
styles/
├── color_scheme.dart
├── typography.dart
└── style_base.dart
```

Can be used in conjuction with packages such as [easy_dynamic_theme](https://pub.dev/packages/easy_dynamic_theme) to offer a variety of color schemes.

**Plugins**
Optionally, you may want to expose useful plugins such as extensions on colors and `BuildContext`. Such an example is:

```
plugins/
├── build_context_extension.dart
└── color_extension.dart
```

The `build_context_extension.dart` file is a simple extension that allows you to get the app themes directly from the context when building the app (e.g. `context.colorScheme.primary`).

(!) Reminder that these helper files are automatically generated by the CLI tool.

**Layout**
Optionally, you may want to include static variables used to build layout inside your app.

```
layout/
├── breakpoints.dart
└── spacing.dart
```

### Data Provider

A data package is a standard data provider that exposes models and repositories for your use. A repository can access data on a local disk or the Internet.

**Example**
```
my_app_authentication/
├── lib/
│   ├── src/
│   │   ├── exceptions/
│   │   │   └── authentication_exception.dart
│   │   ├── models/
│   │   │   ├── user_profile.dart
│   │   │   └── user_account.dart
│   │   ├── apis/
│   │   │   ├── authentication_api.dart
│   │   │   ├── firebase_authentication_api.dart
│   │   │   └── mocked_authentication_api.dart
│   │   └── authentication_repository.dart
│   └── my_app_authentication.dart
└── pubspec.yaml
```

As observed, we have three main folders:

- models - data models providing serialization for our apis
- apis - data services for our module - separated into an interface and implementations
- exceptions - if you want to use custom exceptions

## Examples

**Featured Apps:**
1. [Simple LAN Chat](https://github.com/nathanielxd/simple-lan-chat)
2. [Lethologica](https://github.com/nathanielxd/lethologica)

## CLI
WIP

## Why?

Bloc itself is an amazing concept, and I thank [Felix Angelov](https://github.com/felangel) and the Flutter community for making such an excellent state-management library.

What I thought is that blocs and many other patterns lack a strict architectural pattern. There are many inconsistencies in examples and tutorials all over the internet, and many people find it hard to implement blocs their own way.

Initially, I just wanted to make an extension to help me with the boilerplate code and structuring, so I came up with a stricter way of managing and organising a flutter project using bloc, that also comes with a directory structure.

Main points I made while creating this were:
- Abstract everything as much as possible, allowing us a scalable, understandable and testable application
- A clearer and cleaner way of organising and scaling a project 
- Many developers working with a single concept in mind
- Reuse many components through out the apps

As it is now, it still is a **work in progress** and I urge everyone to ask questions, clarifications and make suggestions.

## Contribute

This project still requires attention and I'd love to get everyone's input, suggestions and feedback on it. Please do not hesitate to contribute or contact me regarding absolutely anything at [dragusinnathaniel@gmail.com](mailto:dragusinnathaniel@gmail.com).
