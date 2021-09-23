"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCubitTemplate = void 0;
const changeCase = require("change-case");
function getCubitTemplate(cubitName) {
    const pascalCaseCubitName = changeCase.pascalCase(cubitName.toLowerCase());
    const snakeCaseCubitName = changeCase.snakeCase(cubitName.toLowerCase());
    const cubitState = `${pascalCaseCubitName}State`;
    return `import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

part '${snakeCaseCubitName}_state.dart';

class ${pascalCaseCubitName}Cubit extends Cubit<${cubitState}> {
  ${pascalCaseCubitName}Cubit() : super(${pascalCaseCubitName}State());
}`;
}
exports.getCubitTemplate = getCubitTemplate;
//# sourceMappingURL=cubit-template.js.map