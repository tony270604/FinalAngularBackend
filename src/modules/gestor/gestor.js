const express = require("express");
const controlador = require("./cont-gestor");
const respuesta=require('../../respuestas/respuestas');
const router = express.Router();

router.post('/validateLogin', async function(req, res) { 
    const { email, password } = req.body; 
    try { 
        const gestor = await controlador.validateLogin(email, password);
        respuesta.success(req, res, gestor, 200); 
    } catch (error) { 
        console.error("Error durante el login de gestor:", error.message); 
        res.status(400).json({ success: false,message: error.message });
    }
});

router.post('/record', async function(req, res) { 
    const { name, number, email, password } = req.body; 
    try { 
        const gestor = await controlador.record(name, number, email, password);
        respuesta.success(req, res, gestor, 200); 
    } catch (error) { 
        console.error("Error durante el registro de gestor:", error.message); 
        res.status(400).json({ success: false,message: error.message });
    }
});

module.exports = router;