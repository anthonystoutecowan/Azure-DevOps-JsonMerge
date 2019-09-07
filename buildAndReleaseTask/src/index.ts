import tl = require("azure-pipelines-task-lib");
const mergeJson = require("./task/merge-json");

async function run() {
    try {
        writeBreak();
        tl.debug("Task [Merge JSON] Started 🔥");
        writeBreak();

        const target = tl.getPathInput("SourcePath", true);
        const sources = tl.getDelimitedInput("TargetFiles", "\n", true);
        const result = await mergeJson.mergeFile(target, sources);
        tl.debug(`final content is ${result}`);

        writeBreak();
        tl.debug("Task [Merge JSON] completed 🎉");
        writeBreak();
    } catch (error) {
        tl.error(error);
    }
}

function writeBreak() {
    const count = 10;
    let breakline = "";
    for (var i = 0; i < count; i++) {
        breakline.concat("=");
        i++;
    }
    return breakline;
}

run();
