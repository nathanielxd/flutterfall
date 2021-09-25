import * as changeCase from "change-case";

export function getBarrelFileTemplate(moduleName: string, moduleType: string): string {

    const lowerCaseModuleName = moduleName.toLowerCase();
    const snakeCaseModuleName = changeCase.snakeCase(lowerCaseModuleName);

    var file: string = "";

    if(moduleType.includes("View")) {
        file += `export 'view/${snakeCaseModuleName}_page.dart';\n`;
        file += `export 'view/${snakeCaseModuleName}_view.dart';\n`;
    }
    if(moduleType.includes("Cubit")) {
        file += `\nexport 'cubit/${snakeCaseModuleName}_cubit.dart';\n`;
    }
    if(moduleType.includes("BLoC")) {
        file += `\nexport 'bloc/${snakeCaseModuleName}_bloc.dart';\n`;
    }

    return file;
}