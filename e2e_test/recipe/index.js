export default {
  'user should be able to create a recipe': (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 2000)
      .pause(1000)
      .click('a.dropdown-user')
      .pause(1000)
      .moveToElement('a#signin', 20, 20)
      .pause(500)
      .click('a#signin')
      .pause(3000)
      .setValue('input[name=username]', 'Jonascot')
      .setValue('input[name=password]', 'password')
      .pause(1000)
      .click('button[type=submit]')
      .pause(3000)
      .click('a.dropdown-user')
      .pause(1000)
      .moveToElement('#dashboard', 20, 20)
      .pause(500)
      .click('#dashboard')
      .pause(1000)
      .waitForElementVisible('body', 2000)
      .assert.urlEquals('http://localhost:8080/users/1/dashboard')
      .pause(2000);
  },
  'user should be able to add new recipe': (browser) => {
    browser
      .moveToElement('button.pulse', 10, 10)
      .pause(500)
      .click('button.pulse')
      .pause(2000)
      .assert.elementPresent('form')
      .assert.elementPresent('input[name=title]')
      .assert.elementPresent('select.browser-default')
      .assert.elementPresent('textarea[name=description]')
      .assert.elementPresent('input[name=preparationTime]')
      .assert.elementPresent('textarea[name=ingredients]')
      .assert.elementPresent('textarea[name=directions]')
      .setValue('input[name=title]', 'Rice and stew')
      .click('select.browser-default')
      .moveToElement('option[value=Lunch', 20, 20)
      .pause(500)
      .click('option[value=Lunch')
      .setValue('textarea[name=description]', 'Tasty rice and stew')
      .setValue('input[name=preparationTime]', 65)
      .setValue('textarea[name=ingredients]', 'Rice, tomatoes, water, salt')
      .setValue('textarea[name=directions]', 'Do this. Do this. Do that.')
      .moveToElement('button[name=add-recipe]', 10, 10)
      .click('button[name=add-recipe]')
      .pause(2000);
  },
  'user should be able to edit his/her recipe': (browser) => {
    browser
      .moveToElement('[data-tab=user-recipes]', 20, 20)
      .click('[data-tab=user-recipes]')
      .moveToElement('#edit-recipe-button', 5, 5)
      .pause(1000)
      .click('#edit-recipe-button')
      .pause(1000)
      .assert.elementPresent('form')
      .assert.elementPresent('input[name=title]')
      .assert.elementPresent('select.browser-default')
      .assert.elementPresent('textarea[name=description]')
      .assert.elementPresent('input[name=preparationTime]')
      .assert.elementPresent('textarea[name=ingredients]')
      .assert.elementPresent('textarea[name=directions]')
      .clearValue('textarea[name=description]')
      .pause(1000)
      .moveToElement('#cancel-edit-button', 20, 20)
      .pause(1000)
      .click('#cancel-edit-button')
      .pause(1000)
      .moveToElement('#edit-recipe-button', 5, 5)
      .pause(500)
      .click('#edit-recipe-button')
      .pause(2000)
      .clearValue('textarea[name=description]')
      .pause(1000)
      .setValue('textarea[name=description]', 'Tasty and nutritious dish')
      .moveToElement('textarea[name=directions]', 20, 20)
      .setValue('textarea[name=directions]', ' Also do this')
      .pause(1000)
      .moveToElement('button[name=edit-save]', 10, 10)
      .pause(500)
      .click('button[name=edit-save]')
      .pause(3000);
  },
  // 'user should be able to favorite a recipe': (browser) => {
  //   browser
  //     .moveToElement('span#recipe-title', 20, 20)
  //     .pause(500)
  //     .click('span#recipe-title')
  //     .pause(2000)
  //     .waitForElementVisible('body', 2000)
  //     .assert.urlEquals('http://localhost:8080/recipes/1')
  //     .moveToElement('form.add-review', 20, 20)
  //     .pause(500)
  //     .moveToElement('a#favorite', 20, 20)
  //     .pause(500)
  //     .click('a#favorite')
  //     .pause(2000)
  //     .end();
  // },
  'user should not create a recipe with same title recipe': (browser) => {
    browser
      .moveToElement('button.pulse', 10, 10)
      .pause(500)
      .click('button.pulse')
      .setValue('input[name=title]', 'Rice and stew')
      .click('select.browser-default')
      .moveToElement('option[value=Lunch]', 20, 20)
      .pause(500)
      .click('option[value=Lunch]')
      .setValue('textarea[name=description]', 'So delicious for all occasions')
      .setValue('input[name=preparationTime]', 80)
      .setValue('textarea[name=ingredients]', 'Rice, tomatoes, spices, salt')
      .setValue('textarea[name=directions]', 'Do this. Do this. Do that.')
      .moveToElement('button[name=add-recipe]', 10, 10)
      .click('button[name=add-recipe]')
      .pause(2000)
      .moveToElement('input[name=title]', 20, 20)
      .pause(500)
      .clearValue('input[name=title]')
      .pause(1000)
      .setValue('input[name=title]', 'Rice and Sauce stew')
      .pause(500)
      .moveToElement('button[name=add-recipe]', 10, 10)
      .pause(500)
      .click('button[name=add-recipe]')
      .pause(2000);
  },
  'user should be able to delete a recipe': (browser) => {
    browser
      .moveToElement('#delete-recipe-button', 5, 5)
      .pause(500)
      .click('#delete-recipe-button')
      .pause(1000)
      .assert.containsText(
        'p#delete-message', 'Are you sure you want to delete this recipe?'
      )
      .assert.containsText('div.modal-title', 'Delete Recipe')
      .moveToElement('#cancel-delete-button', 20, 20)
      .pause(500)
      .click('#cancel-delete-button')
      .pause(1000)
      .moveToElement('#delete-recipe-button', 5, 5)
      .pause(500)
      .click('#delete-recipe-button')
      .pause(1000)
      .moveToElement('#confirm-delete-button', 20, 20)
      .pause(500)
      .click('#confirm-delete-button')
      .pause(2000)
      .end();
  }
};
