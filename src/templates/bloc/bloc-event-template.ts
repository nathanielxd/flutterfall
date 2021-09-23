import * as changeCase from "change-case";

export function getBlocEventTemplate(blocName: string): string {

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