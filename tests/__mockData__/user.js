export const validSignupSeed = [{
  username: 'Scotch',
  password: 'scotchpassword',
  email: 'scotch@example.com',
  firstName: 'John',
  lastName: 'Scotch',
}, {
  username: 'Jessy',
  password: 'jessypassword',
  email: 'jessy@example.com',
  firstName: 'Jessy',
  lastName: 'Sanders',
}, {
  username: 'Vincent',
  password: 'vincentpassword',
  email: 'scotch@example.com',
  firstName: 'Vincent',
  lastName: 'Cross',
}, {
  username: 'Francis',
  password: 'francispassword',
  email: 'francis@example.com',
  firstName: 'Francis',
  lastName: 'Johnson',
}];

export const invalidSignupSeed = [{
  username: '  ',
  password: 'awesome',
  email: '@example.com',
  firstName: 'Alex',
  lastName: 'Scotch',
}, {
  username: 'Paul',
  password: '  ',
  email: 'paul@example.com',
  firstName: 'Paul',
  lastName: 'Sunders',
}, {
  username: 'Paul',
  password: 'awesome',
  email: '   ',
  firstName: 'Paul',
  lastName: 'Sunders',
}, {
  username: 'Paul',
  password: 'awesome',
  email: 'paul@example.com',
  firstName: '   ',
  lastName: 'Sunders',
}, {
  username: 'Paul',
  password: 'awesome',
  email: 'paul@example.com',
  firstName: 'Paul',
  lastName: '  ',
}, {
  username: 'Paul#',
  password: 'awesome',
  email: 'paul@example.com',
  firstName: 'Paul',
  lastName: 'Sunders',
  gender: 'male'
}, {
  username: 'paul',
  password: 'awesome',
  email: 'paulexample.com',
  firstName: 'Paul',
  lastName: 'Sunders',
}];

export const validSigninSeed = [{
  username: 'Jessy',
  password: 'jessypassword',
}, {
  username: 'scotch',
  password: 'scotchpassword',
}, {
  username: 'Francis',
  password: 'francispassword',
}];

export const invalidSigninSeed = [{
  username: '  ',
  password: 'jessypassword',
}, {
  username: 'Jessy',
  password: '   ',
}, {
  username: 'notJessy',
  password: 'jessypassword',
}, {
  username: 'Jessy',
  password: 'notjessypassword',
}];

export const validUserSeed = [{
  firstName: 'John',
  lastName: 'Scotch',
  aboutMe: 'This is my bio',
}, {
  userImage: 'user.image.url',
}];
