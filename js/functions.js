/*=================================
=        CREATING THE TSV FILE    =
=================================*/

// Load and parse data
d3.json("dataset.json", function(err, data) {
    dataset = data;

    // Create array of "users" only
    var users = dataset.map(function(i) {
        return i.users;
    });

    // Create a count for each users.value
    var civil = 0;
    var commercial = 0;
    var military = 0;
    var government = 0;
    users.forEach(function(user, index) {
        if (user == "Civil") {
            civil++;
        } else if (user == "Commercial") {
            commercial++;
        } else if (user == "Government") {
            government++;
        } else if (user == "Military") {
            military++;
        }
    });
});


/*-----  End ------*/


