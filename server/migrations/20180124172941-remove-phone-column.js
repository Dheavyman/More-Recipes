module.exports = {
  up: queryInterface => queryInterface
    .removeColumn('Users', 'phone'),

  down: (queryInterface, Sequelize) => queryInterface
    .addColumn('Users', 'phone', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
};
