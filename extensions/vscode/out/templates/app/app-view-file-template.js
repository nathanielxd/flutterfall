"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppViewTemplate = void 0;
const vscode_1 = require("vscode");
function getAppViewTemplate(projectName) {
    var file = "";
    file += `import 'package:flutter/material.dart';\n`;
    file += `import 'package:${projectName}/app/app.dart';\n`;
    file += `\nclass AppView extends StatelessWidget {

  AppView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '${vscode_1.workspace.name}',
      home: Scaffold()
    );
  }
}`;
    return file;
}
exports.getAppViewTemplate = getAppViewTemplate;
//# sourceMappingURL=app-view-file-template.js.map