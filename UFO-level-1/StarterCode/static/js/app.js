// from data.js
var tableData = data;
// var table = d3.select('.ufo-table').select('tbody');
// console.log(table);
// console.log(table);
// console.log(table);

// function makeRow(ufo_sighting) {
//     var row = [];
//     Object.values(ufo_sighting).forEach(value => row.push(value));
//     return row;
// };

// for each sighting:
//     make row tr (give proper bootstrap classes)
//     for each thing to add
//         make and add to td (give proper bootstrap classes)

tableData.forEach(function (ufo) {
    var row = d3.select('tbody').append('tr');
    Object.values(ufo).forEach(val => row.append('td').text(val));

});