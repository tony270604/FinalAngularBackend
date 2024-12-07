const express = require("express");
const controlador = require("./cont-comida");
const router = express.Router();

router.get("/listarcomida", async function (req, res) {
  try {
    const items = await controlador.listarComida();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
