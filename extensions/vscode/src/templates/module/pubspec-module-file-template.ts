import * as changeCase from "change-case";

export function getPubspecModuleFileTemplate(projectName: string, moduleName: string): string {

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