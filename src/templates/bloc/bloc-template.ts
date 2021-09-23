import * as changeCase from "change-case";

export function getBlocTemplate(blocName: string): string {

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