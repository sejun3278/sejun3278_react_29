import React, { Component } from 'react';
import './main.css';

class search extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { search } = this.props;

    return (
        <div>
            <form>
              <input type='text' maxLength='20' className='search_input' name='search' placeholder='검색어를 입력해주세요.'
                     defaultValue={search}
              />
              <input type='submit' value='검색' className='serach_submit'/>
            </form>
        </div>
    );
  }
}

export default search;
