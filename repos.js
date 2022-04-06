const fs = require("fs");
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");

function getAllRepos(url){
    console.log(url);
    request(url, cb);
}

function cb (err, response, body) {
    if (err) {
        console.err("error", err);
    } else {
        handleHtml(body);
    }
}

function handleHtml(html){
    let selecTool = cheerio.load(html);
    let anchorElem = selecTool('.text-bold.wb-break-word');
    for (let i = 0; i < 10; i++) {
        let relativeLink = selecTool(anchorElem[i]).attr("href");
        console.log(relativeLink);
        // let fullLink = "https://github.com" + relativeLink;
        // console.log(fullLink);
        // reposPageObj.getAllRepos(fullLink);
    }
}

module.exports = {
    getRepo: getAllRepos
};