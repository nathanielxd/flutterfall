"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./app/app.templates"), exports);
__exportStar(require("./bloc/bloc.templates"), exports);
__exportStar(require("./cubit/cubit.templates"), exports);
__exportStar(require("./view/view.templates"), exports);
__exportStar(require("./module/pubspec-module-file-template"), exports);
__exportStar(require("./barrel-file-template"), exports);
__exportStar(require("./main-file-template"), exports);
//# sourceMappingURL=templates.js.map