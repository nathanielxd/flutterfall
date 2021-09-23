"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBarrelFileTemplate = void 0;
const changeCase = require("change-case");
function getBarrelFileTemplate(moduleName, moduleType) {
    const lowerCaseModuleName = moduleName.toLowerCase();
    const snakeCaseModuleName = changeCase.snakeCase(lowerCaseModuleName);
    var file = "";
    if (moduleType.includes("View")) {
        file += `export 'view/${snakeCaseModuleName}_page.dart';\n`;
        file += `export 'view/${snakeCaseModuleName}_view.dart';\n`;
    }
    if (moduleType.includes("Cubit")) {
        file += `\nexport 'cubit/${snakeCaseModuleName}_cubit.dart';\n`;
    }
    if (moduleType.includes("BLoC")) {
        file += `\nexport 'bloc/${snakeCaseModuleName}_bloc.dart';\n`;
    }
    return file;
}
exports.getBarrelFileTemplate = getBarrelFileTemplate;
//# sourceMappingURL=barrel-file-template.js.map