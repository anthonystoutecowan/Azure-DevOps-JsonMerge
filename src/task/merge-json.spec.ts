test("mergeFile with empty target file will fail", () => {
    const mergeJson = require("./merge-json");

    const result = mergeJson.mergeFile(null, ["alright.json"]);
    return expect(result).rejects.toThrow("targetFile cannot be null or empty!!!")
});

test("mergeFile with empty target file will fail", () => {
    const mergeJson = require("./merge-json");

    const result = mergeJson.mergeFile("test.json", []);
    return expect(result).rejects.toThrow("sourceFile(s) should not be null or empty!!!")
});

test("mergeFile will merge correctly", () => {
    //Setup   
    jest.resetModules(); //need that if require json was done before 
    jest.mock('../fs-helper.ts', () => {
        const resolveFileInjson = async (filePaths: string[]): Promise<any[]> => {
            const promise = new Promise<any[]>((resolve => {
                resolve([{ test: "HOLA" }, { test: "Hola2", test1: "yes" }])
            }));
            return promise;
        }
        const writeJson = async (targetFilePath: string, jsonObject: Object): Promise<void> => {
            const promise = new Promise<void>((resolve => { resolve() }));
            return promise;
        }
        return {
            writeJson,
            resolveFileInjson
        }
    })
    const mergeJson = require("./merge-json");

    //run
    const resultPromsie = mergeJson.mergeFile("test.json", ["test1.json", "test2.json"]);

    //Assert
    return expect(resultPromsie).resolves.toBe(JSON.stringify({ test: "Hola2", test1: "yes" }));
})