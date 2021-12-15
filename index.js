const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/myLoginApp', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, () => {
	console.log("DB connected")
});

//schemas
const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String
})

const User = new mongoose.model("User", userSchema);


//routes


app.post("/login", (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email: email }, (err, user) => {
		if (user) {
			if (password === user.password) {
				res.send({ message: "Login Successful", user })
			} else {
				res.send({ message: "Password did't match..." })
			}
		} else {
			res.send("User not Found... !")
		}
	})
})




app.post("/register", (req, res) => {
	const { name, email, password } = req.body;
	User.findOne({ email: email }, (err, user) => {
		if (user) {
			res.send({ message: "User already register" })
		} else {
			const user = new User({
				name: name,
				email: email,
				password: password
			})
			user.save(err => {
				if (err) {
					res.send(err)
				} else {
					res.send({ message: "Successfully Registered" })
				}
			})
		}
	})

})


app.listen(9002, () => {
	console.log("DB started at port 9002");
})






















