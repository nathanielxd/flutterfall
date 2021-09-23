import * as changeCase from "change-case";
import { workspace } from "vscode";

export function getAppTemplate(): string {

  var file = "";
  file += `import 'package:flutter/material.dart';
import 'package:${workspace.name}/app/app.dart';\n`;

  file += `\nclass App extends StatelessWidget {

  @override
  Widget build(BuildContext context) {\n`;

  file += `\t\treturn AppView();`

  file += `
  }
}
  `
  return file;
}