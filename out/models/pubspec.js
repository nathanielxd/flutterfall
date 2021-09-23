"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dependencies = exports.Pubspec = void 0;
class Pubspec {
    constructor(name, dependencies) {
        this.name = name;
        this.dependencies = dependencies;
    }
}
exports.Pubspec = Pubspec;
class Dependencies {
    constructor(needsFirebase) {
        this.equatable = null;
        this.formz = null;
        this.flutter_bloc = null;
        if (needsFirebase) {
            this.firebase_core = "^1.6.0";
            this.firebase_analytics = "^8.3.2";
            this.firebase_auth = "^3.1.1";
            this.cloud_firestore = "^2.5.3";
        }
    }
}
exports.Dependencies = Dependencies;
//# sourceMappingURL=pubspec.js.map