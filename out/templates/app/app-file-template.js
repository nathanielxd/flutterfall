"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppTemplate = void 0;
const vscode_1 = require("vscode");
function getAppTemplate() {
    var file = "";
    file += `import 'package:flutter/material.dart';
import 'package:${vscode_1.workspace.name}/app/app.dart';\n`;
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
exports.getAppTemplate = getAppTemplate;
//# sourceMappingURL=app-file-template.js.map