const express = require("express");
const {users} = require("../data/users.json");
const {getAllUsers, getUserById, deleteUser, updateUserById, createNewUser, getSubscriptionDetailsById} = require("../controllers/user-controller");

const {UserModel, BookModel} = require("../models");

const router = express.Router();

router.get("/",getAllUsers);

router.get("/:id",getUserById);

router.post("/",createNewUser);

router.put("/:id", updateUserById);

router.delete('/:id',deleteUser);

router.get("/subscription-details/:id",getSubscriptionDetailsById);

//default export
module.exports = router;