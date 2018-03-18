export default {
  'user should be able to signup after providing valid details': (browser) => {
    browser
      .windowHandles((result) => {
        const handle = result.value[0];
        browser.switchWindow(handle);
      })
      .url('http://localhost:8080')
      .waitForElementVisible('body', 2000)
      .pause(3000)
      .assert.title('More-Recipes')
      .assert.containsText('a.dropdown-user', 'Welcome Guest')
      .moveToElement('a.dropdown-user', 20, 20)
      .pause(500)
      .click('a.dropdown-user')
      .pause(1000)
      .moveToElement('a#register', 20, 20)
      .pause(500)
      .click('a#register')
      .pause(3000)
      .assert.elementPresent('input[name=firstName]')
      .assert.elementPresent('input[name=lastName]')
      .assert.elementPresent('input[name=username]')
      .assert.elementPresent('input[name=email]')
      .assert.elementPresent('input[name=password]')
      .assert.elementPresent('input[name=retypePassword]')
      .assert.elementPresent('button[name=signupbtn]')
      .setValue('input[name=firstName]', '')
      .setValue('input[name=lastName]', 'Scotch')
      .pause(1000)
      .setValue('input[name=firstName]', 'Jonathan')
      .setValue('input[name=username]', 'Jona')
      .setValue('input[name=email]', 'j')
      .pause(2000)
      .setValue('input[name=username]', 'scot')
      .setValue('input[name=email]', 'onathanyahoo.com')
      .setValue('input[name=password]', 'pa')
      .pause(2000)
      .clearValue('input[name=email]')
      .setValue('input[name=email]', 'jonathan@yahoo.com')
      .clearValue('input[name=password]')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=retypePassword]', 'passwor')
      .click('button[name="signupbtn"]')
      .pause(2000)
      .clearValue('input[name=retypePassword]')
      .setValue('input[name=retypePassword]', 'password')
      .pause(1000)
      .click('button[name="signupbtn"]')
      .pause(2000)
      .assert.containsText('a.dropdown-user', 'Jonathan Scotch')
      .pause(2000);
  },
  'user should be able to logout': (browser) => {
    browser
      .moveToElement('a.dropdown-user', 20, 20)
      .pause(500)
      .click('a.dropdown-user')
      .pause(1000)
      .assert.elementPresent('#dashboard')
      .assert.elementPresent('#logout')
      .moveToElement('a#logout', 20, 20)
      .pause(500)
      .click('a#logout')
      .assert.containsText('a.dropdown-user', 'Welcome Guest')
      .pause(2000);
  },
  'user should be able to signin with valid details': (browser) => {
    browser
      .moveToElement('a.dropdown-user', 20, 20)
      .pause(500)
      .click('a.dropdown-user')
      .pause(1000)
      .moveToElement('a#signin', 20, 20)
      .pause(500)
      .click('a#signin')
      .pause(3000)
      .assert.elementPresent('input[name=username]')
      .assert.elementPresent('input[name=password]')
      .setValue('input[name=username]', 'Jonascot')
      .click('button[type=submit]')
      .pause(2000)
      .setValue('input[name=password]', 'notpassword')
      .click('button[type=submit]')
      .waitForElementVisible('#show-error', 5000)
      .clearValue('input[name=password]')
      .pause(1000)
      .setValue('input[name=password]', 'password')
      .pause(1000)
      .click('button[type=submit]')
      .pause(2000);
  },
  'user should be able to view his/her profile and edit it': (browser) => {
    browser
      .moveToElement('a.dropdown-user', 20, 20)
      .pause(500)
      .click('a.dropdown-user')
      .moveToElement('#dashboard', 20, 20)
      .pause(500)
      .click('#dashboard')
      .pause(1000)
      .waitForElementVisible('body', 2000)
      .assert.urlEquals('http://localhost:8080/users/1/dashboard')
      .pause(2000)
      .moveToElement('button#edit-btn', 10, 10)
      .pause(500)
      .click('button#edit-btn')
      .pause(2000)
      .assert.elementPresent('input[name=username]')
      .assert.elementPresent('input[name=firstName]')
      .assert.elementPresent('input[name=lastName]')
      .assert.elementPresent('input[name=email]')
      .assert.elementPresent('textarea[name=aboutMe]')
      .moveToElement('input[name=firstName]', 20, 20)
      .pause(500)
      .clearValue('input[name=firstName]')
      .pause(500)
      .setValue('input[name=firstName]', 'Johnbull')
      .moveToElement('textarea[name=aboutMe]', 20, 20)
      .pause(500)
      .setValue('textarea[name=aboutMe]', 'I am a cool guy, who enjoys my time in the kitchen')
      .moveToElement('button#confirm-edit-btn', 10, 10)
      .pause(500)
      .click('button#confirm-edit-btn')
      .pause(2000)
      .end();
  },
};
