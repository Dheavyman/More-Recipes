module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    category: {
      type: Sequelize.STRING,
      allowNull: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    preparationTime: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    ingredients: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    directions: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    upvotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    downvotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    views: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Recipes')
};
