const fs = require("fs");
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");
const jspdf = require("jspdf");

function getAllIssues(url){
    // console.log(url);
    request(url, cb);
}

function cb (err, response, body) {
    if (err) {
        console.error("error", err)
    }
    else if (response.statusCode == 404){
        console.log("page not found");
    }
    else {
        extractAllIssues(body);
    }
}

function extractAllIssues(html){
    let selecTool = cheerio.load(html);
    let issuesElemArr = selecTool(
        '.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title'
    );
    console.log(issuesElemArr.length);
    let analyzeData = [];
    for (let i = 0; i < issuesElemArr.length; i++){
        let issuesLink = selecTool(issuesElemArr[i]).attr("href");
        // console.log(issuesLink);
        let fullLink = "https://github.com" + issuesLink;
        // console.log(fullLink);
        analyzeData.push(fullLink);
        let issuesData = selecTool(issuesElemArr[i]).text();
        analyzeData.push(issuesData);
    }
    console.log(analyzeData);

}

module.exports = {
    getAllIssues: getAllIssues
}