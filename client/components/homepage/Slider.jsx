import React from 'react';

import slide1 from '../../public/images/slide1.jpg';
import slide2 from '../../public/images/slide2.jpg';
import slide3 from '../../public/images/slide3.jpg';
import slide4 from '../../public/images/slide4.jpg';

console.log(slide1, slide2, slide3, slide4);

const Slider = () => (
  <div className="slider col s12">
    <ul className="slides">
      <li>
        <img src={slide1} alt="Picture1" />
        <div className="caption center-align">
          <h3>The taste of nature&apos;s gift.</h3>
          <h5 className="light white-text">The source of healthy living.</h5>
        </div>
      </li>
      <li>
        <img src={slide2} alt="Picture2" />
        <div className="caption left-align">
          <h3>We eat to live.</h3>
          <h5 className="light white-text text-lighten-3">
            Let the food be worth it.
          </h5>
        </div>
      </li>
      <li>
        <img src={slide3} alt="Picture3" />
        <div className="caption right-align">
          <h3>Let healthiness be your priority.</h3>
          <h5 className="light white-text text-lighten-3">Health is wealth.</h5>
        </div>
      </li>
      <li>
        <img src={slide4} alt="Picture4" />
        <div className="caption center-align">
          <h3>Share your wonderful recipe</h3>
          <h5 className="light white-text text-lighten-3">
            Never let your ideas get lost.
          </h5>
        </div>
      </li>
    </ul>
  </div>
);

export default Slider;
