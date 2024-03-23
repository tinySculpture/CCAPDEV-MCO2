import { Router } from "express";
const userRouter = Router();
import { hash, compare } from "bcrypt";

import jwt from "jsonwebtoken";
const { sign } = jwt;

import { UserModel } from "../schemas.js";
import "dotenv/config";


userRouter.post("/api/login", async (req, res) => {
	const data = req.body
	try {
		// get user with username
		const user = await UserModel.findOne({
			username: data.username,
		}).lean().exec();

		// throw error when user isnt found
		if (!user) {
			res.sendStatus(404);
			return;
		}

		// validate password
		compare(data.password, user.password, (err, result) => {
			if (!result) {
				// throw unauthorized error
				res.sendStatus(401)
				return;
			}

			// create jwt token
			const token = sign(user, process.env.DB_URL)
			
			// send user object and jwt token
			res.send(JSON.stringify({
				user: {
					id: user._id,
					username: user.username,
					role: user.role,
				},
				token: token,
			}));
		})
		
	} catch (err) {
		res.sendStatus(500);
	}
})

userRouter.post("/api/signup", async (req, res) => {
	const data = req.body

	try {
		// check if user exists
		const doesUserExist = await UserModel.exists({
			username: data.username,
		})

		// send error if user is in database
		if (doesUserExist) {
			res.sendStatus(400)
			return;
		}

		// create a hashed password
		hash(data.password, 10).then(async (hash) => {
			try {
				// create new user with hashed password
				const newUser = new UserModel({
					displayName: data.fullname,
					username: data.username,
					email: data.email,
					password: hash,
					role: "user",
				});
	
				// save new user
				await newUser.save()
				res.sendStatus(201)
			} catch (err) {
				console.error(err);
				res.sendStatus(500);
			}
		}).catch((err) => {
			console.log(err)
			res.sendStatus(500)
		})
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

export default userRouter;

// app.post("/login", async (req, res) => {
	// UserModel.findOne({username: req.body.username})
	// .then((user) => {
	//   const uid = user._id
	//   const username = user.username
	//   const role = user.role
	//   if (user.password === req.body.password) {
	//     const token = jwt.sign({
	//       uid, username, role
	//     }, process.env.SECRET_KEY)
  
	//     res.cookie("token", token, {
	//       httpOnly: true,
	//       sameSite: true
	//     })
  
	//     res.send("Token sent")
	//   } else {
	//     console.log("Nothing")
	//   }
	// })
	// .catch((err) => {
	//   console.log(err)
	// })
//   });