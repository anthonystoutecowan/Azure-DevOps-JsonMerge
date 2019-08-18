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
        const result = await fsHeper.resolveFileInjson(["1", "2", "3", "4", "5"]);
        expect(spy).toBeCalledTimes(5);
    })

    // test("path Resolve 5 name will be run 5 times", async () => {
    //     const fse = jest.mock("fs-extra", () => {
    //         function readJson (f: string ) { return f;}
    //         return {
    //             readJson
    //         }
    //     });
    //     const path = require("path");        
    //     const spy = jest.spyOn(path, "resolve");
    //     spy.mockImplementation(file => file);
    //     const fsHeper = require("./fs-helper");
    //     const result = await fsHeper.resolveFileInjson(["1", "2", "3", "4", "5"]);
    //     expect(spy).toBeCalledTimes(5);
    // })
})