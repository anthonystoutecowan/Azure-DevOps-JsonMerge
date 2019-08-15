const fse = require("fs-extra");
const nodePath = require("path");

async function resolveFileInjson(filePaths: string[]): Promise<any[]> {
    try {
        const fileObject = filePaths
            .map(filePath => nodePath.resolve(filePath))
            .map(filePath => fse.readJSON(filePath));
        return fileObject;
    } catch (error) {
        throw error;
    }
}

async function writeJson(targetFilePath: string, jsonObject: Object): Promise<void> {
    try {
        return fse.writeFile(targetFilePath, jsonObject);
    } catch(error) {
        throw error;
    }
}

module.exports = {
    resolveFileInjson,
    writeJson
};