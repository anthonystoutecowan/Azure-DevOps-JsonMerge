import tl = require("azure-pipelines-task-lib");
const mergeJson = require("./task/merge-json");
import glob = require("glob");

async function run() {
    try {
        writeBreak();
        tl.debug("Task [Merge JSON] Started 🔥");
        writeBreak();

        const target = tl.getPathInput("DestPath", true);
        const sources = tl.getDelimitedInput("SourceFiles", "\n", true);
        const matchedFiles = await glob.glob(sources);
        var patterns = sources.reduce((r, p, i) => r + (i != sources.length ? ", " : ""); )
        tl.debug(`Found ${matchedFiles.length} files matching the patterns ${patterns}`);
        const result = await mergeJson.mergeFile(matchedFiles, target);
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
