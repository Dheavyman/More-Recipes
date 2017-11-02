module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Votes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    hasVoted: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
  }),
  down: queryInterface => queryInterface.dropTable('Votes')
};
