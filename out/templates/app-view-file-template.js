"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppTemplate = void 0;
const vscode_1 = require("vscode");
function getAppTemplate() {
    var file = "";
    file += `import 'package:flutter/material.dart';\n`;
    file += `import 'package:${vscode_1.workspace.name}/app/app.dart';\n`;
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
exports.getAppTemplate = getAppTemplate;
//# sourceMappingURL=app-view-file-template.js.map