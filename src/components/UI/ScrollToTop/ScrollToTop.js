import React, { Component } from 'react';
import './ScrollToTop.scss';
import { IoIosArrowUp } from 'react-icons/io';

class ScrollToTop extends Component {
  state = {
    intervalId: 0
  };

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render() {
    return (
      <div className="ScrollToTop">
        <button title='Back to top' className="scroll"
          onClick={() => { this.scrollToTop(); }}>
          <IoIosArrowUp  className="ArrowTop"/>
        </button>
      </div>
    )
  }
}

export default ScrollToTop;