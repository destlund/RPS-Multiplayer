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
    console.log(snapshot.val());
    var sv = snapshot.val();
    var ft = moment(sv.firstTrain, 'HH:MM');
    var tf = sv.trainFrequency;
    var newTime = ft.clone();
    console.log(ft);

    // let's moment up that next train time
    var timeNow = moment();
    var interval = moment.duration(parseInt(tf) , 'm')

    // for (newTime = moment(timeNow) ; moment(ft) < moment(timeNow)) {
      newTime.add(interval);
      console.log(interval);
      console.log(newTime);

    // }


    var nextTrain = 'something';

    // put it in the table
    $('#train-table > tbody').append('<tr><td>' + sv.trainName + '</td><td>' + sv.trainDestination + '</td><td>' + sv.firstTrain  + '</td><td>' + sv.trainFrequency + '</td><td>' + nextTrain + '</td></tr>');

  })