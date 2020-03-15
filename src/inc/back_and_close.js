import React, { Component } from 'react';

class back_and_close extends Component {
    constructor(props) {
        super(props);
        this.state = {
            close : "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-x-mark-2.png&r=0&g=0&b=0",
            back : "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-undo-1.png&r=0&g=0&b=0",
        }
    }

    _controller = (target, type) => {
        const { 
            _resetIDResult, _resetPWResult, _backSearchModal, _closeSearchModal
        } = this.props;

        if(target === 'id') {
            _resetIDResult();

        } else if(target === 'pw') {
            _resetPWResult();
        }

        if(type === 'back') {
            _backSearchModal(target);

        } else if(type === 'close') {
            _closeSearchModal(target);
        }
    }

  render() {
    const { close, back } = this.state;
    const { target } = this.props
    const { _controller } = this;
    
    return (
        <div className='back_and_close'>
            <div id='back_icon'> 
                <img src={back} 
                     onClick={() => _controller(target, 'back')}
                /> 
            </div>
            <div id='close_icon'> 
                <img src={close} 
                     onClick={() => _controller(target, 'close')}
                /> 
            </div>
        </div>
    );
  }
}

export default back_and_close;