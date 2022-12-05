// import React from 'react';
import './AboutMe1.css';

const AboutMe = () => {
    return (
        <div className="sm-aboutme-container">

             <div className='sm-socials-inner'>

              <span>
                <a href='https://github.com/wangaijia618' className="sm-social-link" target="_blank"><span className='sm-name-link'>About</span></a>
              </span>

              <span>
                <a href='https://github.com/wangaijia618' className="sm-social-link" target="_blank"><span className='sm-name-link'>Github</span></a>
              </span>

              <span>
                <a href='https://www.linkedin.com/in/aijia-wang-b18726131/' className="sm-social-link" target="_blank"><span className='sm-name-link'>LinkedIn</span></a>
              </span>
            </div>
            <div className='about-me'>2022 Aroma</div>
            <div className='about-me'>A site to explore blogs about perfumes.</div>
            <div className="aboutme-name">-  Aijia Wang</div>
        </div>
    )
}

export default AboutMe
