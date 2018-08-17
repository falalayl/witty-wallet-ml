var fs = require('fs');
var csv = require('fast-csv');
var path = require('path');

//initialize simple linear regression from the ml-regression node module
const SLR = require('ml-regression').SLR;

var link = path.join(__dirname, './listings.csv');

//uncomment if you want to use Advertising dataset
//var link = path.join(__dirname, './Advertising.csv');

let dataset = [],
    X = [],
    y = [];
let regressionModel;

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var x = fs.createReadStream(link);

function readCSV(stream) {
    csv
        .fromStream(stream, {
            headers: true,
            ignoreEmpty: true
        })
        .on('data', function (data) {
            //column names from data set
            X.push(parseFloat(data['accommodates'])); 
            y.push(parseFloat(data['price']));
        })
        .on('end', function () {
            performRegression();
        });
};

readCSV(x);

function performRegression(){
    regressionModel = new SLR(X, y);
    console.log(regressionModel.toString(3)); //print formula derived by SLR
    predictOutput();
}

function predictOutput(){
    rl.question('Enter X for prediction: ', (answer) => {
        console.log(`At X = ${answer}, y = ${regressionModel.predict(parseFloat(answer))}`);
        predictOutput();
    });
}