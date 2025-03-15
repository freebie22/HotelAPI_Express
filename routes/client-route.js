const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client-controller");

router.get("/", clientController.getAllClients);

router.get("/getClient/:id", clientController.getClientById);

router.post("/signUp", clientController.signUpClient);

router.post("/login", clientController.loginClient);

router.delete("/deleteClient/:id", clientController.deleteClient);

module.exports = router;
