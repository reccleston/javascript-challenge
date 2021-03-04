// from data.js
var tableData = data;

function showData (ufo) {
    var row = d3.select('tbody').append('tr').attr('class', 'ufo-row');
    Object.values(ufo).forEach(val => row.append('td').attr('class', 'text-center').text(val));
};

// Populating table with the entire dataset
tableData.forEach(showData);

// Table filter by date 
// var filter_button = d3.select('#filter-btn');

// Enter + click event
function handleFilterSightingsDate() {
    // MAKE IT MORE ROBUST TO MORE OPTIONS OF DATEIMES (nothing entered, leading 0's)
    var temp_curr_table_arry = getCurrentTable();
    d3.selectAll('.ufo-row').remove();
    var date_input = d3.select('#datetime').node().value;
    temp_curr_table_arry.filter(ufo => ufo.datetime == date_input).forEach(showData);
};

// filter_button.on('click', handleFilterSightingsDate);

// Enter and filter in realtime with typing (for my version)
var input_box = d3.select('#datetime');

// have filter run with each key --> type all matches 
input_box.on('change', handleFilterSightingsDate);

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

// Append unique options to select drop downs
var dropdowns = d3.selectAll('.form-select');
dropdowns.each(function (drop, i) {
    var options = unique_entries[i][1];
    options.forEach(opt => d3.select(this).append('option').attr('value', `${opt}`).text(opt));
});

// Listen for change event and filter table 

// get current table 
    // turn into  and obj similar to tableData
    // filter 
// filter tableData for val per filter DONE
    // use d3.select(this) -->
// showData of subet table DONE

Array.prototype.toObject = function () {
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
    curr_table.each(function (row, i) {
        var temp_row = [];
        var curr_row = d3.select(this);
        var tds = curr_row.selectAll('td.text-center');

        // Extractings tds
        tds.each(function (td, ii) {
            temp_row.push(d3.select(this).text());
        });

        // Mimicking shape of tableData object
        temp_curr_table_arry.push(temp_row.toObject());
    });
    return temp_curr_table_arry;

};

function handleFilters() {
  
    var temp_curr_table_arry = getCurrentTable();
    d3.selectAll('.ufo-row').remove();
    console.log(temp_curr_table_arry);
    var filter_value  = d3.select(this).node().value;
    var key_to_filter_on = d3.select(this).select('option').node().value.toLowerCase();
    // temp_curr_table_arry.filter(ufo => ufo[key_to_filter_on] == filter_value).forEach(showData);

    if (temp_curr_table_arry.length == 0){
        tableData.filter(ufo => ufo[key_to_filter_on] == filter_value).forEach(showData);
    } else {
        temp_curr_table_arry.filter(ufo => ufo[key_to_filter_on] == filter_value).forEach(showData);
    };
};

dropdowns.on('change', handleFilters);


// BUGS:
    // fix multifiltering
        // if nothing exists in the intersection of filters --> run filter functions on tableData 
        // when no date matches or table is empty page reloads --> why?