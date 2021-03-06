"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageTemplate = void 0;
const changeCase = require("change-case");
function getPageTemplate(pageName, moduleType, projectName) {
    const pascalCasePageName = changeCase.pascalCase(pageName.toLowerCase());
    const snakeCasePageName = changeCase.snakeCase(pageName.toLowerCase());
    const view = `${pascalCasePageName}View`;
    var file = "";
    file += `import 'package:flutter/material.dart';
import 'package:${projectName}/${snakeCasePageName}/${snakeCasePageName}.dart';\n`;
    if (moduleType.includes("Cubit") || moduleType.includes("BLoC")) {
        file += `import 'package:flutter_bloc/flutter_bloc.dart';\n`;
    }
    file += `\nclass ${pascalCasePageName}Page extends StatelessWidget {

  @override
  Widget build(BuildContext context) {\n`;
    if (moduleType.includes("Cubit")) {
        file += `\t\treturn BlocProvider(
      create: (_) => ${pascalCasePageName}Cubit(),
      child: ${view}()
    );`;
    }
    else if (moduleType.includes("BLoC")) {
        file += `\t\treturn BlocProvider(
      create: (_) => ${pascalCasePageName}Bloc(),
      child: ${view}()
    );`;
    }
    else {
        file += `\t\treturn ${view}();`;
    }
    file += `
  }
}
  `;
    return file;
}
exports.getPageTemplate = getPageTemplate;
//# sourceMappingURL=page-template.js.map