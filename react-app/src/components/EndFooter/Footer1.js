// import React from 'react';
import './Footer1.css'

const Footer = () => {
  return (
    <div className='footer-main-container'>

        {/* <img src={footer} className='main-footer-img' alt=''></img> */}
      <div className='footer-lower'>
        <div className='socials-main'>
          <div className='footer-middle-left'>
            <div className='footer-happily-header'> 2022 Aroma     &nbsp; --Aijia Wang</div>
            <div className='footer-happily-description'>A site to explore blogs about perfumes.</div>
          </div>
          <div className='footer-middle-right'>
            <div className='socials-inner'>
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
            </div>
            </div>
            </div>
            </div>
            </div>
            )}


export default Footer;
