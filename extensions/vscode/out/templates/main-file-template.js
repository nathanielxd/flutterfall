"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainFileTemplate = void 0;
function getMainFileTemplate(projectName, needsFirebase) {
    let file = "";
    file += `import 'package:flutter/material.dart';
import 'package:${projectName}/app/app.dart';\n`;
    if (needsFirebase) {
        file += "import 'package:firebase_core/firebase_core.dart';\n";
    }
    file += `\nvoid main() async {
  WidgetsFlutterBinding.ensureInitialized();\n`;
    if (needsFirebase) {
        file += `  await Firebase.initializeApp();\n`;
    }
    file += `  runApp(App());
}`;
    return file;
}
exports.getMainFileTemplate = getMainFileTemplate;
//# sourceMappingURL=main-file-template.js.map