const router = require("express").Router();
const admin = require("../config/firebase.config");
const user = require("../models/user")

router.get("/login", async (req, res) => {
    // return res.send(req.headers.authorization)
    if(!req.headers.authorization) {
        return res.status(500).send({message : "invalid token"});
    }

    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if(!decodeValue){
            return res.status(505).json({message : "unAuth"})
        }else{
            // cheking user exist or not
            const userExist = await user.findOne({"user_id" : decodeValue.user_id})
            if(!userExist) {
                // return res.send("Need to Create")
                newUserData(decodeValue, req, res)
            }else {
                updateUserData(decodeValue, req, res)
            }
        }
    } catch (error) {
        return res.status(505).json({message : error})
    }
})

const newUserData = async (decodeValue, req, res) => {
    const newUser = new user({
        name : decodeValue.name,
        email : decodeValue.email,
        imageURL : decodeValue.picture,
        user_id : decodeValue.user_id,
        email_verified : decodeValue.email_verified,
        role: "member",
        auth_time: decodeValue.auth_time,
    })
    try {
        const saveUser = await newUser.save();
        res.status(200).send({user : saveUser})
    } catch (error) {
        res.status(400).send({success : false, msg : error})
    }
}

const updateUserData = async (decodeValue, req, res) => {
    const filter = {user_id :decodeValue.user_id};

    const option = {
        upsert : true,
        new : true,
    }

    try {
        const result = await user.findOneAndUpdate(
            filter,
            {auth_time : decodeValue.auth_time},
            option
            );
            res.status(200).send({user : result})
    } catch (error) {
        res.status(400).send({ success: false, msg: error })
    }
}

module.exports = router;