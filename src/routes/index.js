const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { searchByName, getDiets } = require("../handlers/recipesRoute");
const { getDetailByIdHandler } = require("../handlers/getDetailByIdHandler");
const { postRecipeHandler } = require("../handlers/postRecipeHandler");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes/:id", getDetailByIdHandler);
router.get("/recipes", searchByName);
router.post("/recipes", postRecipeHandler);
router.get("/diets", getDiets);

module.exports = router;
