const express = require("express");
const controlador = require("./cont-comida");
const respuesta=require('../../respuestas/respuestas');
const router = express.Router();
//PAra las imagenes
const multer = require('multer');
const upload = multer();

router.get("/listarcomida", async function (req, res) {
  try {
    const items = await controlador.listarComida();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


router.post('/addFood', upload.single('img'), async function (req, res) {
  const { name, price, des } = req.body;
  const img = req.file; // Esto contiene la información del archivo
  
  if (!img) {
    return res.status(400).json({ success: false, message: 'No se proporcionó una imagen válida.' });
  }

  try {
    const comida = await controlador.addFood(name, price, des, img.buffer); // Pasar el buffer del archivo
    respuesta.success(req, res, comida, 200);
  } catch (error) {
    console.error('Error al insertar la comida:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
