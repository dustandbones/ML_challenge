const { Router } = require('express');
const router = Router();

/* Sección para configuración Ej seguridad, validación token, etc */

router.get('/', (req, res) => { res.json({ "title": "API ML_challenge..." }) });

module.exports = router;