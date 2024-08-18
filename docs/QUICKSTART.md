# Quick Start

BRUT uses the bloc pattern to create an architecture featuring:

- Separation of models, logic and view
- A firm and consistent directory structure that is easy to understand
- Treatment of models and data providers as microservices separate from the main application
- Abstraction of data repositories, allowing modular backend implementation

By using the bloc pattern, we separate our application into three layers:
* Presentation
* Business Logic
* Data
    * Models
    * Repositories

We treat and organise these layers as such:
* A *feature* is a congregation of **business logic** and **presentation**
* A *module* is a microservice package consisting of **models** and **data repositories** that feeds into multiple features

The general directory structure of a BRUT app looks like this:

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

* /lib/ contains folders each representing **a feature** (eg. /profile_creation/)
* /packages/ has Flutter or Dart modules as either a **widget library** (/my_flutter_theme/) or a domain of **models** and **data repositories** /(my_flutter_authentication)/.

You can use [the extension](https://github.com/nathanielxd/flutterfall/master/extensions/vscode) to quickly create features or packages.

For more information, please visit the [docs](https://github.com/nathanielxd/flutterfall/blob/master/docs/DOCS.md).