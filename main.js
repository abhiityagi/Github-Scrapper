// first require all the needed modules
let url = "https://github.com/topics";
const fs = require("fs");
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");
const reposPageObj = require("./repos");

request(url, cb);

function cb(err, response, body) {
    if (err) {
        console.error("error", err);
    } else if (response.statusCode == 404) {
        console.log("page not found");
    } else {
        handleHtml(body);
    }
    
}

// handle html function

function handleHtml(html){
    let selecTool = cheerio.load(html);
    let anchorElem = selecTool('.no-underline.flex-1.d-flex.flex-column');
    // console.log(anchorElem);
    for (let i = 0; i < 3; i++) {
        let relativeLink = selecTool(anchorElem[i]).attr("href");
        // console.log(relativeLink);
        let fullLink = "https://github.com" + relativeLink;
        // console.log(fullLink);
        reposPageObj.getRepo(fullLink);
    }
    
}