import React from 'react';

const Signup = () => (
  <div>
    <form className="col s12">
      <div className="modal-content">
        <div className="row">
          <div className="input-field col s12">
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="validate"
              required
            />
            <label htmlFor="firstName">First Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="validate"
              required
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="username"
              name="username"
              type="text"
              className="validate"
              required
            />
            <label htmlFor="username">Username</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="email"
              name="email"
              type="email"
              className="validate"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="password"
              name="password"
              type="password"
              className="validate"
              required
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="retype-password"
              name="password"
              type="password"
              className="validate"
              required
            />
            <label htmlFor="retype-password">Retype Password</label>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <div className="row" />
        <div className="row">
          <button
            type="submit"
            name="signupbtn"
            className={`col s6 offset-s3 btn btn-large waves-effect waves-light
        indigo accent-2`}
          >
            Sign Up
          </button>
        </div>
        <div className="row center-align">
          Already have an account?
          <a href="#signin" className="modal-trigger modal-close blue-text">
            Sign In
          </a>
        </div>
      </div>
    </form>
  </div>
);

export default Signup;
