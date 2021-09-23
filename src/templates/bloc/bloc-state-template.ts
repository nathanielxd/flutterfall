import * as changeCase from "change-case";

export function getBlocStateTemplate(blocName: string): string {

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