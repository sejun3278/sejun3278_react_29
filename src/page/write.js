import React, { Component } from 'react';
import './main.css';

import { CKEditor } from '../inc/index.js'; 

class write extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title : "",
    }
  }

  componentDidMount() {
  }

  _changeTitle = () => {
    const title = document.getElementsByName('title')[0].value.trim();
    
    this.setState({ title : title })
  }

  render() {
    const { _getContents, contents } = this.props;
    const { title } = this.state;
    const { _changeTitle } = this;


    return (
        <div className='Write'>
          <div id='Title'>
            <input type='text' autoComplete='off' id='title_txt' name='title' placeholder='제목' defaultValue={title}
                   onChange={() => _changeTitle()}
            />
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
