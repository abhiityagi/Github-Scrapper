const request = require("request");
const cheerio = require("request");

function getIssues(url){
    console.log(url);
    request(url, cb);
}

function cb (err, response, body) {
    if (err) {
        console.log("error", err)
    }
    else {
        handleHtml(body);
    }
}

function handleHtml(html){
    let extractIssues = cheerio.load(html);
    let getAllOfIssues = extractIssues('.d-block.d-md-none.position-absolute.top-0.bottom-0.left-0.right-0');
    for (let i = 0; i < 5; i++){
        let relevant = extractIssues(getAllOfIssues[i]).attr("href");
        console.log(relevant);
    }

}

module.exports = {
    getAllIssues: getIssues
}