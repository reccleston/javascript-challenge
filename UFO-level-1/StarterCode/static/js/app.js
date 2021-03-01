// from data.js
var tableData = data;

function showData (ufo) {
    var row = d3.select('tbody').append('tr').attr('class', 'ufo-row');
    Object.values(ufo).forEach(val => row.append('td').attr('class', 'text-center').text(val));
};

// Populating table with the entire dataset
tableData.forEach(showData);

// Table filter by date 
var filter_button = d3.select('#filter-btn');
console.log(filter_button);

// Enter + click event
function handleFilterSightings() {
    // MAKE IT MORE ROBUST TO MORE OPTIONS OF DATEIMES 
    d3.selectAll('.ufo-row').remove();
    var date_input = d3.select('#datetime').node().value;
    var subset = tableData.filter(ufo => ufo.datetime == date_input);
    subset.forEach(showData);
};

filter_button.on('click', handleFilterSightings);

// Enter and filter in realtime with typing (for my version)