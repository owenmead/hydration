'use strict';

angular.module('hydrationApp')
  .service('waterRecord', function waterRecord($rootScope) {

    var today_amount_percentage = 20,
        today_data = {};

    // current weight / 2 = oz to drink per day
    // 206lb == 103 oz
    // 1oz == 29.5735ml

    //50% weight in oz
    //70% weight in oz :: high range

    // True if two dates are equal (not time)
    var equal_date = function(d1, d2) {
      return d1.getDate() === d2.getDate() &&
             d1.getMonth() === d2.getMonth() &&
             d1.getFullYear() === d2.getFullYear();

    }

    var update_percentage_water = function() {
      // Weight in lbs / 2 ... in oz
      // 206lb == 103 oz
      var total_drink_ml = $rootScope.model.weight * 2.20462 / 2 * 29.5735;
      today_amount_percentage = today_data.amount_ml / total_drink_ml * 100;
    }

    // Set amounts in ml
    var AMOUNTS = {
      'LARGE_GLASS' : 350,
      'SMALL_GLASS' : 200
    }


    return {
      AMOUNTS: AMOUNTS,

      init: function() { // root
        var today = new Date();

        // See if we have data for today, if not create it
        today_data = $rootScope.model.water_dates.
              filter(function(d) {
                return equal_date(d.date, today);
              });
        if (today_data.length > 0) {
          today_data = today_data[0];
        } else {
          today_data = {
            date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
            amount_ml: 0
          }
        }
        update_percentage_water();
      },

      today_amount_percentage: function() {
        return today_amount_percentage;
      },

      add_amount: function(amount) {
        today_data.amount_ml += amount;
        update_percentage_water();
      }
    }
  });
