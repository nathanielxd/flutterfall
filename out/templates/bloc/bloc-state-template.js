"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlocStateTemplate = void 0;
const changeCase = require("change-case");
function getBlocStateTemplate(blocName) {
    const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
    const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
    return `part of '${snakeCaseBlocName}_bloc.dart';
    
class ${pascalCaseBlocName}State extends Equatable {
    
  const ${pascalCaseBlocName}State();
  
  @override
  List<Object> get props => [];
}
`;
}
exports.getBlocStateTemplate = getBlocStateTemplate;
//# sourceMappingURL=bloc-state-template.js.map