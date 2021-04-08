
import React from 'react';
import { animateScroll as scroll } from 'react-scroll'
import './Footer.css';

export default class Footer extends React.Component {
 
  scrollToTop() {
    scroll.scrollToTop();
  }

   /*button for footer*/
  render() {
    return (
      <footer className="footer" id='contact'>
        <div className='scroll-to-top'>
          <button className='anim' onClick={this.scrollToTop}>
          <i className="fas fa-chevron-circle-up" alt="button-togo-up" style={{ color: '#266150', padding: '5px' , fontSize: '5em'}}></i>
          </button>
        </div>
        <div className='footer-text'>
        <h4>Thank you for visiting! 
          </h4>
        </div>
      </footer>
    );
  }
}

