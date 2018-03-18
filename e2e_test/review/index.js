export default {
  'user should be able to view recipe details': (browser) => {
    browser
      .url('http://localhost:8080/recipes/1')
      .waitForElementVisible('body', 2000)
      .pause(1000)
      .url('http://localhost:8080/recipes/2')
      .waitForElementVisible('body', 2000)
      .pause(1000);
  },
  'unauthenticated user should not favorite, upvote or downvote': (browser) => {
    browser
      .moveToElement('a#favorite', 10, 10)
      .pause(500)
      .click('a#favorite')
      .pause(2000)
      .moveToElement('a#upvote', 10, 10)
      .pause(500)
      .click('a#upvote')
      .pause(2000)
      .moveToElement('a#downvote', 10, 10)
      .pause(500)
      .click('a#downvote')
      .pause(2000);
  },
  'user should be able to review a recipe': (browser) => {
    browser
      .moveToElement('button#view-more-reviews', 20, 20)
      .pause(500)
      .moveToElement('form.add-review', 20, 20)
      .pause(500)
      .moveToElement('textarea#new-review', 10, 10)
      .pause(500)
      .setValue('textarea#new-review', 'This is a nice recipe')
      .pause(1000)
      .moveToElement('button#post-review', 20, 20)
      .pause(500)
      .click('button#post-review')
      .pause(2000)
      .moveToElement('a.dropdown-user', 20, 20)
      .pause(500)
      .click('a.dropdown-user')
      .pause(1000)
      .moveToElement('a#signin', 20, 20)
      .pause(500)
      .click('a#signin')
      .pause(3000)
      .setValue('input[name=username]', 'Jonascot')
      .setValue('input[name=password]', 'password')
      .moveToElement('button#signin', 20, 20)
      .pause(500)
      .click('button#signin')
      .pause(2000)
      .moveToElement('button#post-review', 20, 20)
      .pause(500)
      .click('button#post-review')
      .pause(2000)
      .moveToElement('h4.title-header', 20, 20)
      .pause(500)
      .moveToElement('a#favorite', 10, 10)
      .pause(500)
      .click('a#favorite')
      .pause(2000)
      .moveToElement('a#upvote', 10, 10)
      .pause(500)
      .click('a#upvote')
      .pause(2000)
      .moveToElement('a#downvote', 10, 10)
      .pause(500)
      .click('a#downvote')
      .pause(2000);
  },
  'user should see favorite recipes in his dashboard': (browser) => {
    browser
      .moveToElement('a.dropdown-user', 20, 20)
      .pause(500)
      .click('a.dropdown-user')
      .pause(1000)
      .moveToElement('#dashboard', 20, 20)
      .pause(500)
      .click('#dashboard')
      .pause(1000)
      .waitForElementVisible('body', 2000)
      .assert.urlEquals('http://localhost:8080/users/1/dashboard')
      .pause(2000)
      .moveToElement('[data-tab=user-favorites]', 20, 20)
      .click('[data-tab=user-favorites]')
      .pause(1000)
      .moveToElement('#remove-favorite', 10, 10)
      .pause(500)
      .click('#remove-favorite')
      .pause(2000)
      .assert.containsText('div.modal-title', 'Remove Recipe')
      .assert.containsText(
        'p#delete-message',
        'Are you sure you want to remove recipe from your favorites?'
      )
      .moveToElement('#confirm-delete-button', 20, 20)
      .pause(500)
      .click('#confirm-delete-button')
      .pause(2000)
      .end();
  },
};
