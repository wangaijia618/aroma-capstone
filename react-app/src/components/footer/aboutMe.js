import React from 'react';
import './aboutMe.css';

const aboutMe = () => {
    return (
        <div className="aboume-container">
             <div className='socials-inner'>

              <div><i className="fa-brands fa-github"></i></div>
              <div>
                <a href='https://github.com/wangaijia618' className="social-link" target="_blank"><span className='name-link'>About</span></a>
              </div>
            </div>
            <div className='socials-inner'>

              <div><i className="fa-brands fa-github"></i></div>
              <div>
                <a href='https://github.com/wangaijia618' className="social-link" target="_blank"><span className='name-link'>Github</span></a>
              </div>
            </div>
            <div className='socials-inner'>

              <div><i className="fa-brands fa-linkedin"></i></div>
              <div>
                <a href='https://www.linkedin.com/in/aijia-wang-b18726131/' className="social-link" target="_blank"><span className='name-link'>LinkedIn</span></a>
              </div>
            </div>
            <div className='about-me'>© 2022 Aroma</div>
            <div className='about-me'>A site to explore blogs about perfumes.</div>
        </div>
    )
}

export default Footer
