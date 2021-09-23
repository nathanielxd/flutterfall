import { workspace } from "vscode";

export function getMainFileTemplate(needsFirebase: boolean): string {
    let file = "";
    file += `import 'package:flutter/material.dart';
import 'package:${workspace.name}/app/app.dart';\n`

    if(needsFirebase) {
        file += "import 'package:firebase_core/firebase_core.dart';\n"
    }

    file += `\nvoid main() async {
  WidgetsFlutterBinding.ensureInitialized();\n`;

    if(needsFirebase) {
        file += `  await Firebase.initializeApp();\n`
    }

    file += `  runApp(App());
}`;
    
    return file;
}