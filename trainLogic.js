  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBvmStD6RZDYJ6vBPaHXE9T8IikA_zvMgY",
    authDomain: "train-times-4280f.firebaseapp.com",
    databaseURL: "https://train-times-4280f.firebaseio.com",
    projectId: "train-times-4280f",
    storageBucket: "train-times-4280f.appspot.com",
    messagingSenderId: "816441277971"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // var name;
  // var destination;
  var first = '';
  // var frequency;

  $('#add-train-btn').on('click', function(event) {
    event.preventDefault();

    // grab user input
    var name = $('#train-name-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var first = $('#first-input').val().trim();
    var frequency = $('#frequency-input').val().trim();

    // create a local object
    var newTrain = {
      trainName: name,
      trainDestination: destination,
      firstTrain: first,
      trainFrequency: frequency
    };

    // upload the new train info
    database.ref().push(newTrain);

    // clear the form
    $('#train-name-input').val('');
    $('#destination-input').val('');
    $('#first-input').val('');
    $('#frequency-input').val('');

  })

  // let's fill out that table!
  database.ref().on('child_added', function(snapshot) {
    var sv = snapshot.val();

    //time to get the next train time
    // Assumptions
    var tFrequency = parseInt(sv.trainFrequency);

    // Time is 3:30 AM
    var firstTime = sv.firstTrain;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // put it in the table
    $('#train-table > tbody').append('<tr><td>' + sv.trainName + '</td><td>' + sv.trainDestination + '</td><td>' + sv.firstTrain  + '</td><td>' + sv.trainFrequency + '</td><td>' + moment(nextTrain).format("hh:mm") + '</td></tr>');

  })