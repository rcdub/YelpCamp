var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose	= require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Mountain Goat's Rest", 
// 		image: "https://images.pexels.com/photos/955459/pexels-photo-955459.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
// 		description: "This is a mountain goat rest mountain that is super duper sweet. Cool"
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("NEW CAMPGROUND CREATED");
// 			console.log(campground);
// 		}
// 	});

app.get("/", function(req, res) {
	res.render("landing");
});

// INDEX Route - Show all campgrounds
app.get("/campgrounds", function(req, res) {
	// get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err) {
			console.log(err)
		} else {
			res.render("index", {campgrounds: allCampgrounds});
		}
	});
});

// CREATE Route - Add new campgrounds to database
app.post("/campgrounds", function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc}
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newCampground){
		if(err){
			console.log(err);
		} else {
			// redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

// NEW Route - Show form to create new campground
app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
});

// SHOW Route - Shows more information about one campground
app.get("/campgrounds/:id", function(req, res){
	// Find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err) {
			console.log(err);
		} else {
			// Render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});
});


app.listen(4000, function() {
	console.log("Server Initiated on Port 4000");
});