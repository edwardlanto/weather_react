# Weather React Project #

### What is it? ###

A React application that takes in a city name and matches it with Open Weather API DB to pull corresponding information. Also creates instance of Google Map and plugs in co-ordinates of searched city to pull up appropriate map location.

### Demonstrates ### 

* Binding of form events 
* Setting 'State' after value is entered
* Using constructor to set inital state
* Making Action Creator to fetch city from API & returning data only matched with specific case
* Conditional to see if weather city is defined
* Using and importing Spark Lines Plugin to give visuals of city information
* Used Redux Promise middleware to stop action and checks if its a Promise, if so, resolve and send unravelled promise
* Creating Smart Containers to be aware of Redux state using Connect function