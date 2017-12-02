import React from 'react';

const Review = () => (
  <li className="collection-item avatar">
    <img src="../../public/images/user.jpg" alt="" className="circle" />
    <span className="name"><b>John Stew</b></span>
    <p className="created-on">Oct 20, 2017 at 07:30:25 PM</p>
    <p id="review-content">
      A wonderful recipe, very tasty and easy to prepare.
    </p>
  </li>
);

export default Review;
