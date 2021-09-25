"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppTemplate = void 0;
function getAppTemplate(projectName) {
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
exports.getAppTemplate = getAppTemplate;
//# sourceMappingURL=app-file-template.js.map