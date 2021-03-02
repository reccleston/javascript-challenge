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

// Enter + click event
function handleFilterSightings() {
    // MAKE IT MORE ROBUST TO MORE OPTIONS OF DATEIMES (nothing entered, leading 0's)
    d3.selectAll('.ufo-row').remove();
    var date_input = d3.select('#datetime').node().value;
    tableData.filter(ufo => ufo.datetime == date_input).forEach(showData);
};

filter_button.on('click', handleFilterSightings);

// Enter and filter in realtime with typing (for my version)
var input_box = d3.select('#datetime');

// have filter run with each key --> type all matches 
input_box.on('keyup', handleFilterSightings);

// Multifiltering 

// Populate Dropdowns 

// getting unique values in cols
var unique_entries = {};
Array.prototype.contains = function(v) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === v) return true;
    }
    return false;
};
  
Array.prototype.unique = function() {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
      if (!arr.contains(this[i])) {
        arr.push(this[i]);
      }
    }
    return arr;
};

var relevant_keys = Object.keys(tableData[0]).slice(1,5);

relevant_keys.forEach(key => unique_entries[key] = tableData.map(ufo => ufo[key]).unique());
unique_entries = Object.entries(unique_entries);
console.log(unique_entries);

// Append unique options to select drop downs
var dropdowns = d3.selectAll('.form-select');
dropdowns.each(function (drop, i) {
    var options = unique_entries[i][1];
    options.forEach(opt => d3.select(this).append('option').attr('value', `${opt}`).text(opt));
});

// Listen for change event and filter table 

  