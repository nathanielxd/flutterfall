import * as changeCase from "change-case";
import { workspace } from "vscode";

export function getViewTemplate(viewName: string, moduleType: string, projectName: string): string {

  const pascalCasePageName = changeCase.pascalCase(viewName.toLowerCase());
  const snakeCasePageName = changeCase.snakeCase(viewName.toLowerCase());
  const view = `${pascalCasePageName}View`;

  var file = ""; 
  file += `import 'package:flutter/material.dart';\n`;

  if(moduleType.includes("Cubit") || moduleType.includes("BLoC")) {
    file += `import 'package:${projectName}/${snakeCasePageName}/${snakeCasePageName}.dart';\n`;
    file += `import 'package:flutter_bloc/flutter_bloc.dart';\n`;
  }

  file += `\nclass ${view} extends StatelessWidget {

  ${view}({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
              
          ]
        )
      )
    );
  }
}`;

  return file;
}