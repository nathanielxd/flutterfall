"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCubitStateTemplate = void 0;
const changeCase = require("change-case");
function getCubitStateTemplate(cubitName) {
    const pascalCaseCubitName = changeCase.pascalCase(cubitName.toLowerCase());
    const snakeCaseCubitName = changeCase.snakeCase(cubitName.toLowerCase());
    return `part of '${snakeCaseCubitName}_cubit.dart';

class ${pascalCaseCubitName}State extends Equatable {

  const ${pascalCaseCubitName}State();

  @override
  List<Object> get props => [];
}`;
}
exports.getCubitStateTemplate = getCubitStateTemplate;
//# sourceMappingURL=cubit-state-template.js.map