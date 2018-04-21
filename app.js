
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDJAmn9nMqzp2g4V6_zf08EZbdidEwqhc8",
    authDomain: "empdata-1529a.firebaseapp.com",
    databaseURL: "https://empdata-1529a.firebaseio.com",
    projectId: "empdata-1529a",
    storageBucket: "",
    messagingSenderId: "588352993551"
};
firebase.initializeApp(config);


// Get a reference to the database service
var database = firebase.database();


// Whenever a user clicks the submit-bid button
$("#submit-emp-btn").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    // Get the input values
    var empName = $("#InputName").val().trim();
    var empRole = $("#InputRole").val().trim();
    var empStart = $("#InputStart").val().trim();
    var empRate = $("#InputRate").val().trim();

    // console.log("bidder: " + newBidder + " bidprice:" + bidderPrice);


    // Log the Bidder and Price (Even if not the highest)

    // Save the new price in Firebase
    // Note how we are using the Firebase .set() method
    database.ref().push({
        empName: empName,
        empRole: empRole,
        empStart: empStart,
        empRate: empRate
    });
})

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("child_added", function(snapshot, prevChildKey) {
    var newEmp = snapshot.val();
    console.log(prevChildKey);
    console.log("Name: " + newEmp.empName);
    console.log("Role: " + newEmp.empRole);
    console.log("Start: " + newEmp.empStart);
    console.log("Rate: " + newEmp.empRate);

    $("#emp-table-body").append(`<tr><td>${newEmp.empName}</td><td>${newEmp.empRole}</td><td>${newEmp.empStart}</td><td>${newEmp.empRate}</td></tr>`)
})

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#email-display").text(snapshot.val().email);
    $("#age-display").text(snapshot.val().age);
    $("#comment-display").text(snapshot.val().comment);
  });