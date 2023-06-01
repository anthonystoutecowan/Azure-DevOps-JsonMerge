import fse = require("fs-extra");
import nodePath = require("path");

async function resolveFileInjson(filePaths: string[]): Promise<any[]> {
    try {
        const fileObject = filePaths
            .map(filePath => nodePath.resolve(filePath))
            .map(filePath => fse.readJSON(filePath));
        return Promise.all(fileObject);
    } catch (error) {
        throw error;
    }
}

async function writeJson(targetFilePath: string, jsonObject: Object): Promise<void> {
    try {
        if (!fse.existsSync(nodePath.dirname(targetFilePath))){
            fse.mkdirSync(nodePath.dirname(targetFilePath), { recursive: true });
        }
        var jsonString: String = "";
        if (typeof jsonObject === 'string' || jsonObject instanceof String) {
            jsonString = jsonObject;
        }
        else {
            jsonString = JSON.stringify(jsonObject, null, 2);
        }
        return fse.writeFile(targetFilePath, jsonString);
    } catch(error) {
        throw error;
    }
}

module.exports = {
    resolveFileInjson,
    writeJson
};