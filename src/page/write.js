import React, { Component } from 'react';
import './main.css';

import { CKEditor } from '../inc/index.js'; 

class write extends Component {
  
  render() {
    const { _getContents, contents } = this.props;

    return (
        <div className='Write'>
          <div id='Title'>
            <input type='text' autoComplete='off' id='title_txt' name='title' placeholder='제목'/>
          </div>

          <div>
            <CKEditor 
              _getContents = { _getContents } 
              contents = { contents }
            /> 
          </div>
        </div>
    );
  }
}

export default write;
