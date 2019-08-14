import tl = require("azure-pipelines-task-lib");
import gfs = require("./gfs");
import path = require("path")

async function run() {
    try {
        writeBreak();
        tl.debug("Task [Merge JSON] Started 🔥");
        writeBreak();

        const target = path.resolve(tl.getInput("target", true));
        const sources = tl.getInput("sources", true).split(",").map(s => path.resolve(s));
        const targetPromises = gfs.OpenFile(target);
        const sourcePromises = sources.map(file => gfs.OpenFile(file));
        const fileContent = await Promise.all([targetPromises, ...sourcePromises]);
        const [targetJson, ...sourceJson] = fileContent.map(file => JSON.parse(file));
        const finalJson = Object.assign(targetJson, ...sourceJson);
        const finalString = JSON.stringify(finalJson);
        tl.debug(`final content is ${finalString}`);
        await gfs.WriteFile(target, finalJson);

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
