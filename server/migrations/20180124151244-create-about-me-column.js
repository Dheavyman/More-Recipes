module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users',
    'aboutMe', {
      type: Sequelize.TEXT,
      allowNull: true,
    }),
  down: queryInterface => queryInterface.removeColumn('Users', 'aboutMe')
};
