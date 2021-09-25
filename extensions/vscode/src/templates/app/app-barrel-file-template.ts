export function getAppBarrelFileTemplate(): string {

    var file: string = "";

    file += `export 'view/app.dart';\n`;
    file += `export 'view/app_view.dart';\n`;

    return file;
}