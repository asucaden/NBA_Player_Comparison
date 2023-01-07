import React from 'react';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>NBA Player Comparer</h1>
          <p className='lead'>
            Did you know that Shai Gilgeous-Alexander had almost the same amount
            of points, rebounds, and assists as all-time-great Steph Curry last
            year? Explore more suprisingly similar players!
          </p>
          <div className='buttons'>
            <Link to='/Dashboard' className='btn btn-primary'>
              View comparisons now
            </Link>
            <a
              href='https://twitter.com/c_swish_stats'
              target='_blank'
              rel='noreferrer'
              className='btn btn-light'
            >
              Check out the twitter bot
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
