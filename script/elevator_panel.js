'use strict';

var times = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var timeTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var grandTotal = 0;

var locationSalesData = [];

function LocationSalesData(locationName, minimumCustomers, maximumCustomers, cookiesPerCustomer) {
  this.locationName = locationName;
  this.minimumCustomers = minimumCustomers;
  this.maximumCustomers = maximumCustomers;
  this.cookiesPerCustomer = cookiesPerCustomer;
  this.totalCookiesSold = 0;
  locationSalesData.push(this);
}

var salesTable = document.getElementById('salesTable');

LocationSalesData.prototype.render = function(){  
  var trE1 = document.createElement('tr');

  var tdE1 = document.createElement('td');
  tdE1.textContent = this.locationName;
  trE1.appendChild(tdE1);

  for (var i = 0; i < times.length; i++) {

    tdE1 = document.createElement('td');

    var randomCustomerNumber = Math.floor(Math.random() * (this.maximumCustomers - this.minimumCustomers) + this.minimumCustomers);

    var randomCookiesSold = randomCustomerNumber * Math.floor(this.cookiesPerCustomer);

    tdE1.textContent = randomCookiesSold;

    trE1.appendChild(tdE1);

    this.totalCookiesSold = this.totalCookiesSold + randomCookiesSold;

    var timeTotalsNow = timeTotals[i] + randomCookiesSold;

    timeTotals[i] = timeTotalsNow;

    grandTotal = grandTotal + timeTotalsNow;
  }

  tdE1 = document.createElement('td'),

  tdE1.textContent = this.totalCookiesSold;

  trE1.appendChild(tdE1);

  salesTable.appendChild(trE1);

};

function renderLocationSalesData(){
  for (var i in locationSalesData) {
    locationSalesData[i].render();
  }
}

function makeHeaderRow() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Location Name';
  trEl.appendChild(thEl);

  for (var i = 0; i < times.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = times[i];
    trEl.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = 'Total Cookies Sold';
  trEl.appendChild(thEl);

  salesTable.appendChild(trEl);
}

function makeTimeTotalsRow() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Total Cookies per Hour';
  trEl.appendChild(tdEl);

  for (var i in timeTotals) {
    tdEl = document.createElement('td');
    tdEl.textContent = timeTotals[i];
    trEl.appendChild(tdEl);
  }

  tdEl = document.createElement('td');
  tdEl.textContent = grandTotal;
  trEl.appendChild(tdEl);

  salesTable.appendChild(trEl);
}

function addNewLocation(event) {
  event.preventDefault();
  var newLocationName = event.target.locationName.value;
  var newMinimumCustomers = event.target.minimumCustomers.valueAsNumber;
  var newMaximumCustomers = event.target.maximumCustomers.valueAsNumber;
  var newCookiesPerCustomer = event.target.cookiesPerCustomer.valueAsNumber;

  new LocationSalesData(newLocationName, newMinimumCustomers, newMaximumCustomers, newCookiesPerCustomer);

  salesTable.innerHTML = '';

  makeHeaderRow();
  renderLocationSalesData();
  makeTimeTotalsRow();
}

makeHeaderRow();
var firstAndPike = new LocationSalesData('1st and Pike', 23, 65, 6.3);
var seatacAirport = new LocationSalesData('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new LocationSalesData('Seattle Center', 11, 38, 3.7);
var capitalHill = new LocationSalesData('Capital Hill', 20, 38, 2.3);
var alki = new LocationSalesData('Alki', 2, 16, 4.6);

salesTableInput.addEventListener('submit', addNewLocation);

renderLocationSalesData();
makeTimeTotalsRow();