const express = require("express");
const controlador = require("./cont-comida");
const respuesta=require('../../respuestas/respuestas');
const router = express.Router();
//Para las imagenes
const multer = require('multer');
const upload = multer();
//version anterior
router.get("/listarcomida", async function (req, res) {
  try {
    const items = await controlador.listarComida();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
//nueva version
/*
router.get("/listarcomida", async (req, res) => {
  try {
    const search = req.query.search;
    const items = await comidaDAO.listarComida(search);
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});*/

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

router.post('/editFood', upload.single('img'), async function (req, res) {
  const { cod_com, name, price, des } = req.body;
  const img = req.file;
  
  // Si la imagen no es proporcionada, pasar 'null' o 'undefined' para que no la actualice
  const imgBuffer = img ? img.buffer : null;

  try {
    const comida = await controlador.editFood(cod_com, name, price, des, imgBuffer); 
    respuesta.success(req, res, comida, 200);
  } catch (error) {
    console.error('Error al editar la comida:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

router.post('/deleteFood', async function(req, res) { 
  const { cod_com} = req.body; 
  try { 
      const comida = await controlador.deleteFood(cod_com);
      respuesta.success(req, res, comida, 200); 
  } catch (error) { 
      console.error("Error al eliminar la comida:", error.message); 
      res.status(400).json({ success: false,message: error.message });
  }
});

module.exports = router;
