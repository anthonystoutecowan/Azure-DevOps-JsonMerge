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
        if (!fse.existsSync(targetFilePath)){
            fse.mkdirSync(targetFilePath, { recursive: true });
        }
        return fse.writeFile(targetFilePath, JSON.stringify(jsonObject));
    } catch(error) {
        throw error;
    }
}

module.exports = {
    resolveFileInjson,
    writeJson
};