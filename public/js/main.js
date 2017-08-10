// NEW query string will be without a date range!  e.g.
// https://api.nasa.gov/neo/rest/v1/feed?[DATE VARIABLE HERE?]&api_key=Cix4VND0FLpGOpiijzv4N4peW53CLDEkoQgn4Zw6

// "FRONT END" JAVASCRIPT:

$(document).ready(function(){
  var dangerousAsteroids = []
  $('#asteroid-form').on('submit', function(event){
      event.preventDefault()
      var asteroidDate = $('#asteroid-date').val()
      console.log('which date chosen?',asteroidDate)
      // after user submits a date, the date is sent to the /nasa_api, then the callback runs
    $.post('/nasa_api', { date: asteroidDate }).then(function(data){
      console.log(data);
      // takes returned string of data from nasa and converts into an object
      data = JSON.parse(data)
      var neo = data.near_earth_objects; // neo is all of the near earth objects for date range
      for (date in neo) { // loops through all first objects (here named "date") in near_earth_objects
        for (let i=0; i < neo[date].length; i++) { // loop through all found first "date" objects
          console.log(neo[date][i]); // logs all found objects in date range
          if (neo[date][i].is_potentially_hazardous_asteroid === true){
            dangerousAsteroids.push(neo[date][i])
          } // logs all found objects in date range

          // console.log(neo[date][i]); // HOW TO DRILL DEEPER IN OBJECT?  IS THIS A 'JSON OBJECT'?
        } // returns all near earth objects for data range
        console.log(dangerousAsteroids)
          // if ((neo[date][i]).hasOwnProperty(true)) {
          //   console.log('neo[date][i]');
          // // console.log(`neo.${date} = ${neo[date]}`);
          // }
      }

      for (let i=0; i < dangerousAsteroids.length; i++) { // now that we have created our array of just the asteroids that returned "true" as dangerous, we can now use jQuery to .append the results into our html using a template string!!!
        $("#asteroids").append(`
          <section>
            <h3>Asteroid Name:</h3>
            <p><a href="${dangerousAsteroids[i].nasa_jpl_url}" target="_blank">${dangerousAsteroids[i].name}</a></p>
            <h3>Date of Near Miss:</h3>
            <p>${dangerousAsteroids[i].close_approach_data[0].close_approach_date}</p>
            <h3>Velocity (in MPH):</h3>
            <p>${dangerousAsteroids[i].close_approach_data[0].relative_velocity.miles_per_hour}</p>
            <h3>Maxium Diameter (in feet):</h3>
            <p>${dangerousAsteroids[i].estimated_diameter.feet.estimated_diameter_max}</p>
            <h3>Distance from Earth (in miles):</h3>
            <p>${dangerousAsteroids[i].close_approach_data[0].miss_distance.miles}</p>
          </section>
          <hr>
        `);
      }
    })
  })
})





// $.post('/asteroids_by_date', {
//     name: newAnimalName,
//     species: newAnimalSpecies,
// }).then(function(data){
//     console.log('data? ', data)
//     if ( data.success ) {
//         console.log('successfully got a response from the server.')
//     }
// })
