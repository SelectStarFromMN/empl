
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


// Whenever a user clicks the submit Add Employee button
$("#submit-emp-btn").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    // Get the input values
    var empName = $("#InputName").val().trim();
    var empRole = $("#InputRole").val().trim();
    var empStart = parseInt(moment($("#InputStart").val().trim(), "DD/MM/YY").format("x"));
    var empRate = $("#InputRate").val().trim();

    // Save the new Employee in Firebase
    // Note how we are using the Firebase .push() method
    database.ref().push({
        empName: empName,
        empRole: empRole,
        empStart: empStart,
        empRate: empRate
    });

    // Clear text boxes
    $("#InputName").val("");
    $("#InputRole").val("");
    $("#InputStart").val("");
    $("#InputRate").val("");
    $("#InputName").focus();
})

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("child_added", function(snapshot) {
    var empRec = snapshot.val();
    var empStart = moment(empRec.empStart).format("DD/MM/YY");
    var empMonths = moment().diff(empRec.empStart, 'months');
    
    // Table Columns: <id=pkey hidden>, Name, Role, Start, Months(computed), Rate, YTD(computed)
    $("#emp-table-body").append(`<tr id="${snapshot.key}"><td>${empRec.empName}</td><td>${empRec.empRole}</td><td>${empStart}</td><td>${empMonths}</td><td>${empRec.empRate}</td><td>${empRec.empRate * empMonths}</td></tr>`)
})

// database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().name);
//     $("#email-display").text(snapshot.val().email);
//     $("#age-display").text(snapshot.val().age);
//     $("#comment-display").text(snapshot.val().comment);
//   });