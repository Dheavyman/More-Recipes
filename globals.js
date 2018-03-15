const models = require('./server/models');

const chromedriver = require('chromedriver');

module.exports = {
  before: (done) => {
    models.sequelize.sync({
      force: true,
      match: /(?:^more_recipes_test)$/
    })
      .then(() => {
        chromedriver.start();
        done();
      })
      .catch((error) => {
        done(error);
      });
  },

  after: (done) => {
    chromedriver.stop();
    done();
  }
};
