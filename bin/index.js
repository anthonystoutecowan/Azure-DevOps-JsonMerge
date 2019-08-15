"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib");
const fs = require("fs-extra");
const path = require("path");
async function run() {
    try {
        writeBreak();
        tl.debug("Task [Merge JSON] Started 🔥");
        writeBreak();
        const target = path.resolve(tl.getInput("target", true));
        const sources = tl.getInput("sources", true).split(",").map(s => path.resolve(s));
        const targetPromises = fs.readFile(target, "utf-8");
        const sourcePromises = sources.map(file => fs.readFile(file, "utf-8"));
        const fileContent = await Promise.all([targetPromises, ...sourcePromises]);
        const [targetJson, ...sourceJson] = fileContent.map(file => JSON.parse(file));
        const finalJson = Object.assign(targetJson, ...sourceJson);
        const finalString = JSON.stringify(finalJson);
        tl.debug(`final content is ${finalString}`);
        await fs.writeFile(target, finalJson);
        writeBreak();
        tl.debug("Task [Merge JSON] completed 🎉");
        writeBreak();
    }
    catch (error) {
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
//# sourceMappingURL=index.js.map