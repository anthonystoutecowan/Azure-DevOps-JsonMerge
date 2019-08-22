describe("FS Helper Test readJSON", () => {

    beforeEach(() => {
        jest.resetModules(); //need that if require json was done before 
    })

    test("readJson will be run 5 times", async () => {
        const fse = require("fs-extra");
        const path = require("path");
        const spy = jest.spyOn(fse, "readJSON");
        spy.mockImplementation(file => file);
        const fsHeper = require("./fs-helper");
        const result = await fsHeper.resolveFileInjson(["__dirname/src/testFiles/test.json", "./testFiles/test1.json", "./testFiles/test2.json"]);
        expect(spy).toBeCalledTimes(3);
    })

    test("readJson will read the # of files correctly", async () => {
        const fsHeper = require("./fs-helper");
        const result = await fsHeper.resolveFileInjson(["./src/testFiles/test.json", "./src/testFiles/test1.json", "./src/testFiles/test2.json"]);
        const expectedResult = [
            {
                "test": "file 1",
                "index": "0"
            },
            {
                "test": "file 2",
                "index": "1"
            },
            {
                "test": "file 3",
                "index": "4"
            }
        ]
        expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
    })
})

describe("FS Helper Test writeJSON", () => {

    const writeToFile = "./src/testFiles/writetofile.json"

    beforeEach(() => {
        jest.resetModules(); //need that if require json was done before 
    })

    afterEach(() => {
        const fs = require("fs");
        fs.unlinkSync(writeToFile);
    })

    test("readJson will to the file correctly", async () => {
        const fsHeper = require("./fs-helper");
        const fs = require("fs");
        
        const expectedResult = JSON.stringify({ test: "hello world" });
        await fsHeper.writeJson(writeToFile, expectedResult);
        const result = fs.readFileSync(writeToFile, "UTF-8");
        expect(result).toBe(expectedResult);
    })
})

