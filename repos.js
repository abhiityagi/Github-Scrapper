const fs = require("fs");
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");
const issuesObj = require("./issues");

function getAllRepos(url){
    // console.log(url);
    request(url, cb);
}

function cb (err, response, body) {
    if (err) {
        console.error("error", err);
    } else if (response.statusCode == 404) {
        console.log("page not found");
    } else {
        extractAllReposLink(body);
    }
}

function extractAllReposLink(html){
    let selecTool = cheerio.load(html);
    let reposElemArr = selecTool('.text-bold.wb-break-word');
    for (let i = 0; i < 10; i++) {
        let reposLink = selecTool(reposElemArr[i]).attr("href");
        // console.log(reposLink);
        let reposName = reposLink.split("/").pop();
        console.log("Repos Name:=> " + reposName);
        let fullLink = "https://github.com" + reposLink + "/issues";
        // console.log(fullLink);
        issuesObj.getAllIssues(fullLink);
    }
}

module.exports = {
    getRepo: getAllRepos
};