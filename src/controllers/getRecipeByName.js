require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe } = require("../db");
const { Op } = require("sequelize");

const cleanArray = (array) =>
  array.map((elem) => {
    return {
      id: elem.id,
      name: elem.title,
      image: elem.image,
      summary: elem.summary,
      healthScore: elem.healthScore,
      steps: elem.analyzedInstructions?.[0]?.steps?.map((e) => e.step),
      created: false,
    };
  });

const getAllRecipe = async () => {
  let recipesDataBase = await Recipe.findAll();

  let recipesApiRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY}`
    )
  ).data.results;

  const recipesApi = cleanArray(recipesApiRaw);

  return [...recipesDataBase, ...recipesApi];
};

const getRecipeByName = async (name) => {
  let recipesDataBase = await Recipe.findAll({
    where: !!name
      ? {
          name: {
            [Op.substring]: name.toLowerCase(),
          },
        }
      : {},
  });

  let recipesApiRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY}`
    )
  ).data.results;

  const recipesApi = cleanArray(recipesApiRaw);

  const filteredApi = recipesApi.filter((recipe) =>
    recipe.name.toLowerCase().includes(name.toLowerCase())
  );

  return [...filteredApi, ...recipesDataBase];
};

module.exports = {
  getRecipeByName,
  getAllRecipe,
};
