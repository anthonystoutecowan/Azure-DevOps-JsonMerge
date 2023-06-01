import tl = require("azure-pipelines-task-lib");
const mergeJson = require("./task/merge-json");
import glob = require("glob");

async function run() {
    try {
        writeBreak();
        tl.debug("Task [Merge JSON] Started 🔥");
        writeBreak();

        const sources = tl.getPathInput("SourcePath", true);
        const target = tl.getDelimitedInput("TargetFiles", "\n", true);
        const matchedFiles = await glob.glob(target);
        const result = await mergeJson.mergeFile(matchedFiles, sources);
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
