test("mergeFile with empty target file will fail", () => {
    const mergeJson = require("./merge-json");

    const result = mergeJson.mergeFile(null, ["alright.json"]);
    return expect(result).rejects.toThrow("targetFile cannot be null or empty!!!")
});

test("mergeFile with empty source file(s) will fail", () => {
    const mergeJson = require("./merge-json");

    const result = mergeJson.mergeFile("test.json", []);
    return expect(result).rejects.toThrow("sourceFile(s) should not be null or empty!!!")
});

describe("mergeFile will merge correctly", () => {

    beforeEach(() => {
        jest.resetModules(); //need that if require json was done before 
        jest.mock('../fs-helper.ts', () => {
            const resolveFileInjson = async (filePaths: string[]): Promise<any[]> => {
                const [target, ...sources] = filePaths.map((file, index) => {return { fileName: file, index }})
                const promise = new Promise<any[]>((resolve => {
                    resolve([target, ...sources])
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
    })

    test("1 file", () => {
        //setup
        const mergeJson = require("./merge-json");

        //run
        const resultPromsie = mergeJson.mergeFile("test.json", ["test1.json"]);

        //Assert
        const result = JSON.stringify({ fileName: "test1.json", index: 1 });
        return expect(resultPromsie).resolves.toBe(result);
    })

    test("2 file", () => {
        //setup
        const mergeJson = require("./merge-json");

        //run
        const resultPromsie = mergeJson.mergeFile("test.json", ["test1.json", "test2.json"]);

        //Assert
        const result = JSON.stringify({ fileName: "test2.json", index: 2 });
        return expect(resultPromsie).resolves.toBe(result);
    })

})
