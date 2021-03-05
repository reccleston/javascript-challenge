// from data.js
var tableData = data;

// Populate table
function showData (ufo) {
    var row = d3.select('tbody').append('tr').attr('class', 'ufo-row');
    Object.values(ufo).forEach(val => row.append('td').attr('class', 'text-center').text(val));
};

// Populating table with the entire dataset
tableData.forEach(showData);

// Table filter by date 
var filter_button = d3.select('#filter-btn');
var date_input_box = d3.select('form');

// Enter + click event
function handleFilterSightingsDate() {
    d3.event.preventDefault();
    var temp_curr_table_arry = getCurrentTable();
    var date_input = d3.select('#datetime').node().value;

    d3.selectAll('.ufo-row').remove();

    if (temp_curr_table_arry.length == tableData.length) {
        var date_input = d3.select('#datetime').node().value;
        tableData.filter(ufo => ufo.datetime == date_input).forEach(showData);
    } else {
        temp_curr_table_arry.filter(ufo => ufo.datetime == date_input).forEach(showData);    
    }
};

filter_button.on('click', handleFilterSightingsDate);
date_input_box.on('submit', handleFilterSightingsDate);

// Populating Dropdowns 
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

var filter_categories = Object.keys(tableData[0]).slice(1,5);

filter_categories.forEach(key => unique_entries[key] = tableData.map(ufo => ufo[key]).unique());
unique_entries = Object.entries(unique_entries);

// Append unique filter options to select drop downs
var dropdowns = d3.selectAll('.form-select');
dropdowns.each(function (d, i) {
    var filter_options = unique_entries[i][1];
    filter_options.forEach(opt => d3.select(this).append('option').attr('value', `${opt}`).text(opt));
});

// Multifiltering 
Array.prototype.toUFOObject = function () {
    var temp_row = {
        datetime: '',
        city: '',
        state: '',
        country: '',
        shape: '',
        durationMinutes: '',
        comments: ''
    };

    Object.keys(temp_row).forEach((key, i) => temp_row[key] = this[i]);
    return temp_row;
};

function getCurrentTable () {
    // Getting current table to filter 
    var temp_curr_table_arry = [];
    var curr_table = d3.selectAll('.ufo-row');
    // Extracting rows
    curr_table.each(function (d) {
        var temp_row = [];
        var curr_row = d3.select(this);
        var tds = curr_row.selectAll('td.text-center');

        // Extractings tds
        tds.each(function (d) {
            temp_row.push(d3.select(this).text());
        });

        // Mimicking shape of tableData object
        temp_curr_table_arry.push(temp_row.toUFOObject());
    });
    return temp_curr_table_arry;

};

function handleFilters() {
    var temp_curr_table_arry = getCurrentTable();
    d3.selectAll('.ufo-row').remove();
    var filter_value  = d3.select(this).node().value;
    var key_to_filter_on = d3.select(this).select('option').node().value.toLowerCase();
    temp_curr_table_arry.filter(ufo => ufo[key_to_filter_on] == filter_value).forEach(showData);

};

dropdowns.on('change', handleFilters);

// Clear filters 
var reset_button = d3.select('#clear-filter-btn').on('click', function() {
    dropdowns.each(function (d, i) {
        var dropdown = d3.select(this);
        dropdown.node().value = dropdown.select('option').node().value;
        d3.selectAll('.ufo-row').remove();
        tableData.forEach(showData);
    });
});
