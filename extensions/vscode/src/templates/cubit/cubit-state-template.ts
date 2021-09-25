import * as changeCase from "change-case";

export function getCubitStateTemplate(cubitName: string): string {

    const pascalCaseCubitName = changeCase.pascalCase(cubitName.toLowerCase());
    const snakeCaseCubitName = changeCase.snakeCase(cubitName.toLowerCase());

    return `part of '${snakeCaseCubitName}_cubit.dart';

class ${pascalCaseCubitName}State extends Equatable {

  const ${pascalCaseCubitName}State();

  @override
  List<Object> get props => [];
}`;
}