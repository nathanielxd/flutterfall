export function getAppTemplate(projectName: string): string {

  var file = "";
  file += `import 'package:flutter/material.dart';
import 'package:${projectName}/app/app.dart';\n`;

  file += `\nclass App extends StatelessWidget {

  @override
  Widget build(BuildContext context) {\n`;

  file += `\t\treturn AppView();`;

  file += `
  }
}
  `;
  return file;
}