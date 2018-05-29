var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// Add a new cat to the database

// var george = new Cat({
// 	name: "Mrs. Norris",
// 	age: 7,
// 	temperament: "Evil"
// });

// // George is what we send to databse. Cat is what is returned from databse
// george.save(function(err, cat){
// 	if(err){
// 		console.log("Something went wrong");
// 	} else {
// 		console.log("We just saved a cat to the DB");
// 		console.log(cat);
// 	}
// });

Cat.create({
	// makes new and saves in database
	name: "Snow White",
	age: 15,
	temperament: "Bland"
}, function(err, cat) {
	if(err) {
		console.log(err);
	} else {
		console.log(cat);
	}
});

// Retrieve all cats from the DB and console.log each one

Cat.find({}, function(err, cats){
	if(err) {
		console.log("Oh no, ERROR!");
		console.log(err);
	} else {
		console.log("ALL THE CATS......");
		console.log(cats);
	}
});