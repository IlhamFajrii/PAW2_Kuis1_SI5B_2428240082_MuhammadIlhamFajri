const express = require("express");

const router = express.Router();

const controller = require("../controllers/insurancePolicyController");
const cekApiKey = require("../middlewares/cekApiKey");

// GET semua polis
router.get("/", controller.getAll);

// GET polis berdasarkan ID
router.get("/:id", controller.getById);

// POST polis
router.post("/", cekApiKey, controller.create);

// PUT polis
router.put("/:id", cekApiKey, controller.update);

// DELETE polis
router.delete("/:id", cekApiKey, controller.remove);

module.exports = router;