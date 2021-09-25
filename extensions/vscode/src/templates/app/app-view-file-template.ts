import { workspace } from "vscode";

export function getAppViewTemplate(projectName: string): string {

  var file = ""; 
  file += `import 'package:flutter/material.dart';\n`;

  file += `import 'package:${projectName}/app/app.dart';\n`;
  
  file += `\nclass AppView extends StatelessWidget {

  AppView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '${workspace.name}',
      home: Scaffold()
    );
  }
}`;

  return file;
}