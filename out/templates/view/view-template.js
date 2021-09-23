"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewTemplate = void 0;
const changeCase = require("change-case");
const vscode_1 = require("vscode");
function getViewTemplate(viewName, moduleType) {
    const pascalCasePageName = changeCase.pascalCase(viewName.toLowerCase());
    const snakeCasePageName = changeCase.snakeCase(viewName.toLowerCase());
    const view = `${pascalCasePageName}View`;
    var file = "";
    file += `import 'package:flutter/material.dart';\n`;
    if (moduleType.includes("Cubit") || moduleType.includes("BLoC")) {
        file += `import 'package:${vscode_1.workspace.name}/${snakeCasePageName}/${snakeCasePageName}.dart';\n`;
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
exports.getViewTemplate = getViewTemplate;
//# sourceMappingURL=view-template.js.map