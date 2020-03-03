import React, { Component } from 'react';
import '../main.css';

import axios from 'axios';

class right_write extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title : "",
      contents : "",
    }
  }

  _submitBoard = async function() {
    const title = document.getElementsByName('title')[0].value.trim();
  
    const contents = this.props.contents;

    if(title === "") {
      return alert('제목을 입력해주세요.');

    } else if(contents === "") {
      return alert('내용을 입력해주세요.');
    }

    const data = { title : title, contents : contents };
    const res = await axios('/add/board', {
      method : 'POST',
      data : data,
      headers: new Headers()
    })

    if(res.data) {
      alert('글 등록이 완료되었습니다.');
      return window.location.replace('/')
    }
  }

  render() {
    return (
        <div>
          <div id='post_submit'>
            <button onClick={() => this._submitBoard()}> 포스트 등록 </button>
          </div>
        </div>
    );
  }
}

export default right_write;
