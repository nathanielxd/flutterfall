import * as changeCase from "change-case";

export function getCubitTemplate(cubitName: string): string {

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