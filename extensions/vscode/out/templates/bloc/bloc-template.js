"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlocTemplate = void 0;
const changeCase = require("change-case");
function getBlocTemplate(blocName) {
    const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
    const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
    const blocState = `${pascalCaseBlocName}State`;
    const blocEvent = `${pascalCaseBlocName}Event`;
    return `import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

part '${snakeCaseBlocName}_event.dart';
part '${snakeCaseBlocName}_state.dart';

class ${pascalCaseBlocName}Bloc extends Bloc<${blocEvent}, ${blocState}> {

  ${pascalCaseBlocName}Bloc() : super(${pascalCaseBlocName}State());

  @override
  Stream<${blocState}> mapEventToState(${blocEvent} event) async* {
    // TODO: implement mapEventToState
  }
}`;
}
exports.getBlocTemplate = getBlocTemplate;
//# sourceMappingURL=bloc-template.js.map