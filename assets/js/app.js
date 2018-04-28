var config = {
    apiKey: "AIzaSyAYhbfltqCO4B15-JqgQ0JwblZwDQ6ySQY",
    authDomain: "fir-rps-3e70c.firebaseapp.com",
    databaseURL: "https://fir-rps-3e70c.firebaseio.com",
    projectId: "fir-rps-3e70c",
    storageBucket: "fir-rps-3e70c.appspot.com",
    messagingSenderId: "178929945132"
};
firebase.initializeApp(config);

var database = firebase.database();

$("document").ready(function() {



    var trainObject;

    getInputs = function() {

        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var frequency = $("#frequency-input").val().trim();
        var firstTrain = $("#first-train-input").val().trim();

        var newTrain = {
            name: trainName,
            destination: destination,
            frequency: frequency,
            first: firstTrain

        };

        database.ref().push(newTrain);

        clearInput();

    }

    clearInput = function() {

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#frequency-input").val("");
        $("#first-train-input").val("");
    }

    $("#add-train-btn").on('click', function(event) {
        event.preventDefault();
        getInputs();
        swal("Trains Added!", "Check the table to view train times!", "success");
    });

    $("table").on('click', "button", function(e)  {
        $(this).closest('tr').remove();
        swal("Delete!", "You deleted a train!", "success");
    })

    database.ref().on("child_added", function(snapshot) {

        var name = snapshot.val().name;
        var dest = snapshot.val().destination;
        var freq = parseInt(snapshot.val().frequency);
        var first = snapshot.val().first;

        var trainFrequency = freq;
        var startTrain = first;

        var timeConvert = moment(first, "HH:mm").subtract(1, 'years');
        console.log(timeConvert);
        var current = moment();
        $("#current-time").html("Time : " + current.format("hh:mm a"));

        var timeDifference = moment().diff(moment(timeConvert), "minutes")
        console.log(timeDifference)
        var timeRemaining = timeDifference % trainFrequency;

        var minutesLeft = trainFrequency - timeRemaining;

        var nextTrain = moment().add(minutesLeft, "minutes");
        var arrivalTime = moment(nextTrain).format("hh:mm a");
        console.log(arrivalTime);

        var deleteButton = "X";

        

        $("tbody").append("<tr><td><button>" + deleteButton + "</button></td><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" +
            arrivalTime + "</td><td>" + minutesLeft + "</td></tr>")
        

        
    })
})