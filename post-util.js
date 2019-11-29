var fs = require('fs');

function loadData() {
    return JSON.parse(fs.readFileSync('post.json'));
}

function saveData(data) {

    var obj = {
        posts: data
    };

    fs.writeFileSync('post.json', JSON.stringify(obj));
}

module.exports = {
    loadData: loadData,
    saveData: saveData,
}
