"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPubspecFileTemplate = void 0;
function getPubspecFileTemplate(projectName) {
    return `name: ${projectName}
description: .
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: ">=2.12.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter

  dungeoneer_account:
    path: packages/dungeoneer_account
  dungeoneer_game:
    path: packages/dungeoneer_game
  
  # Firebase
  firebase_core: ^1.0.1
  firebase_analytics: ^7.1.1
  cloud_firestore: ^2.3.0
  firebase_storage: ^10.0.1
  firebase_auth: ^2.0.0
  # Logic
  bloc: ^7.2.0
  flutter_bloc: ^7.3.0
  formz:
  # UI
  loading_indicator: ^2.0.1
  dungeoneer_theme:
    path: packages/dungeoneer_theme
  # Others
  audioplayer: ^0.8.1
  equatable: ^2.0.3

dev_dependencies:
  flutter_test:
    sdk: flutter
`;
}
exports.getPubspecFileTemplate = getPubspecFileTemplate;
//# sourceMappingURL=pubspec-module-file-template.js.map