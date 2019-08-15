const mergeJson = require("./merge-json"); 

test("mergeFile with empty target file will fail", () => {
    expect(() => {
        mergeJson.mergeFile(null, [""]);
    }).toThrow();
})