module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn(
    'Recipes', 'recipeImage', {
      type: Sequelize.STRING,
      allowNull: true,
    }
  ),

  down: (queryInterface, Sequelize) => queryInterface.changeColumn(
    'Recipes', 'recipeImage', {
      type: Sequelize.STRING,
      allowNull: false,
    }
  )
};
