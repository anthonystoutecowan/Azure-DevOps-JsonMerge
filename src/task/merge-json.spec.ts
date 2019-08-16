const mergeJson = require("./merge-json"); 

test("mergeFile with empty target file will fail", () => {
    const result = mergeJson.mergeFile(null, ["alright.json"]);
    return expect(result).rejects.toThrow("targetFile cannot be null or empty!!!")
});

test("mergeFile with empty target file will fail", () => {
     const result = mergeJson.mergeFile("test.json", []);
     return expect(result).rejects.toThrow("sourceFile(s) should not be null or empty!!!")
});


