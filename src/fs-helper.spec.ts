describe("FS Helper Test", ()=>{

    beforeEach(() => {
        jest.resetModules(); //need that if require json was done before 
    })

    test("readJson will be run 5 times", async () => {
        const fse = require("fs-extra");
        const path = require("path");        
        const spy = jest.spyOn(fse, "readJSON");
        spy.mockImplementation(file => file);
        const fsHeper = require("./fs-helper");
        const result = await fsHeper.resolveFileInjson(["./testFiles/test.json", "./testFiles/test1.json", "./testFiles/test2.json"]);
        expect(spy).toBeCalledTimes(3);
    })

    test("readJson will read the # of files correctly", async () => {
        const fsHeper = require("./fs-helper");
        const result = await fsHeper.resolveFileInjson(["./testFiles/test.json", "./testFiles/test1.json", "./testFiles/test2.json"]);
        expect(JSON.stringify(result)).toBe(3);
    })
})