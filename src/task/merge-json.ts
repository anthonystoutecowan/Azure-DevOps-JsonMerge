const path = require("path");
const fs = require("../fs-helper");
/**
 * @param targetFile target json file that will be merged with sources
 * @param sourceFiles json file(s) that will be merged to target, later file has precedence over previous one. 
 */
async function mergeFile(targetFile: string, sourceFiles: string[]): Promise<string> {
    try {
        //Input Validation
        if(!targetFile) {
            throw new Error("targetFile cannot be null or empty!!!");
        }
        if(!sourceFiles || sourceFiles.length < 1) {
            throw new Error("sourceFile(s) should not be null or empty!!!");
        }
        const [targetJson, ...sourceJson] = await fs.resolveFileInjson([targetFile, ...sourceFiles]);
        const finalJson = Object.assign(targetJson, ...sourceJson);
        await fs.writeJson(targetFile, finalJson);
        return JSON.stringify(finalJson);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    mergeFile
}