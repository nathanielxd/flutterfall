
export class Pubspec {

    name: string;
    dependencies: Dependencies;

    constructor(name: string, dependencies: Dependencies) {
        this.name = name;
        this.dependencies = dependencies;
    }
}

export class Dependencies {

    equatable: string | null;
    formz: string | null;
    flutter_bloc: string | null;
    firebase_core?: string;
    firebase_analytics?: string;
    firebase_auth?: string;
    cloud_firestore?: string;

    constructor(needsFirebase: boolean) {
        this.equatable = null;
        this.formz = null;
        this.flutter_bloc = null;
        if(needsFirebase) {
            this.firebase_core = "^1.6.0";
            this.firebase_analytics = "^8.3.2";
            this.firebase_auth = "^3.1.1";
            this.cloud_firestore = "^2.5.3";
        }
    }
}