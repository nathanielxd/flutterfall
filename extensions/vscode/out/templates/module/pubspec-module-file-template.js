"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPubspecModuleFileTemplate = void 0;
const changeCase = require("change-case");
function getPubspecModuleFileTemplate(projectName, moduleName) {
    const capitalizedModuleName = changeCase.upperCaseFirst(moduleName);
    return `name: ${moduleName}
description: ${capitalizedModuleName} module for ${projectName}.
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: ">=2.12.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter

  equatable: ^2.0.3

dev_dependencies:
  flutter_test:
    sdk: flutter
`;
}
exports.getPubspecModuleFileTemplate = getPubspecModuleFileTemplate;
//# sourceMappingURL=pubspec-module-file-template.js.map