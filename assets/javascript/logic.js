  var config = {
    apiKey: "AIzaSyA7uXMTmLYz6qyqSDssvQuRHE7DeX57ngc",
    authDomain: "trains-38e89.firebaseapp.com",
    databaseURL: "https://trains-38e89.firebaseio.com",
    projectId: "trains-38e89",
    storageBucket: "trains-38e89.appspot.com",
    messagingSenderId: "487315138375"
  };
  firebase.initializeApp(config);
$(document).ready(function() {
    var database = firebase.database();
    $("#add-train").on("click", function() {
      event.preventDefault();
      var trainName = $("#train-name").val();
      var destination = $("#destination").val();
      var firstTrain = $("#first-time").val();
      var frequency= $("#frequency").val();
      if($("#train-name").val() === "" || $("#destination").val() === "" || 
      	$("#first-time").val() === "" || $("#frequency").val() === "") {
      	alert("There is an empty field");
      	return false;
      }
      database.ref().push({
          train: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      });
      $("#train-name").val("");
      $("#destination").val("");
      $("#first-time").val("");
      $("#frequency").val("");
		});
		database.ref().on("child_added", function(childSnapshot){
			var sv = childSnapshot.val();
			// First Time (pushed back 1 year to make sure it comes before current time)
	    var firstTimeConverted = moment(sv.firstTrain, "hh:mm A").subtract(1, "years");
	    var currentTime = moment();// Current Time
	    // Difference between the times
	    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	    var tRemainder = diffTime % sv.frequency;// Time apart (remainder)
	    var tMinutesTillTrain = sv.frequency - tRemainder;// Minutes Until Train
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");// Next Train
			// Console.loging the last user input
      console.log(sv.train);
      console.log(sv.destination);
      console.log(sv.firstTrain);
      console.log(sv.frequency);

	 	$(".table").append($("<tr><td>" + sv.train + "</td><td>" + sv.destination + "</td><td>" + 
	 		sv.frequency + "</td><td>" + moment(nextTrain).format("hh:mm A") + "</td><td>" + tMinutesTillTrain + "</td></tr>"));
		}, function(errorObject) {
    	console.log("Errors handled: " + errorObject.code);
    });
});