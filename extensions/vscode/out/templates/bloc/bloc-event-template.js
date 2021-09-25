"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlocEventTemplate = void 0;
const changeCase = require("change-case");
function getBlocEventTemplate(blocName) {
    const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
    const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
    return `part of '${snakeCaseBlocName}_bloc.dart';
    
class ${pascalCaseBlocName}Event extends Equatable {

  const ${pascalCaseBlocName}Event();
  
  @override
  List<Object> get props => [];
}
  `;
}
exports.getBlocEventTemplate = getBlocEventTemplate;
//# sourceMappingURL=bloc-event-template.js.map