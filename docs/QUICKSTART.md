# Quick Start

Flutterfall uses the bloc pattern to create an architecture featuring:

- Separation of models, logic and view
- A firm and consistent directory structure easy to understand
- Treatment of models and data providers as microservices separate from the main application
- Abstraction of data repositories allowing modular backend implementation

By using the bloc pattern, we separate our application in 3 layers:
* Presentation
* Business Logic
* Data
	* Models
	* Repositories

We treat and organise these layers as such:
* A *feature* is a congregation of **business logic** and **presentation**
* A *module* is a microservice package consisting of **models** and **data repositories** that feeds into multiple features

The general directory structure of a Flutterfall app looks like this:

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

* /lib/ contains folders each representing **a feature** (eg. /profile_creation/)
* /packages/ has Flutter or Dart modules that are either a **widget library** (/my_flutter_theme/) or a domain of **models** and **data repositories** /(my_flutter_authentication)/.

You can use [the extension](https://github.com/nathanielxd/flutterfall/master/extensions/vscode) to quickly create features or packages.

For more information, please visit the [docs](https://github.com/nathanielxd/flutterfall/blob/master/docs/DOCS.md).