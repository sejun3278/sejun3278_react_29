import React, { Component } from 'react';
import './main.css';

class write extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div className='Write'>
          <div>
            <input type='text' autoComplete='off' id='title_txt' name='title' placeholder='제목'/>
          </div>

          <div>
            <textarea id='content_txt' name='contents' placeholder='내용을 입력하세요.'></textarea>
          </div>
        </div>
    );
  }
}

export default write;
