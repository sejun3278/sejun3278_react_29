import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import '../App.css';

import { Login } from './index.js'; 

class header extends Component {
    constructor(props) {
      super(props);
      this.state = {
          visible : false,
          id : "",
          password : "",
      }
  }
  
  _openModal = function() {
    return this.props._toggleModal(true);
  }

  _logout = function() {
    if(window.confirm('로그아웃 하시겠습니까?')) {
      this.props._logout();
    }
  }

  _goHead = function() {
    sessionStorage.removeItem('page')
    sessionStorage.setItem('category', '')

    return window.location.href = '/';
  }

  render() {
    const { login, admin, user_ip, login_modal, _toggleModal } = this.props;

    return (
        <div className='header_grid'>
            <div className='acenter'> 
            
              {login && admin === 'Y' && user_ip === "192.168.0.3"
                ? <h5> <Link to='/write'> 포스트 작성 </Link> </h5>
                : null
              }
            </div>

            <div className='acenter'>
                <Route path='/'/>
                <h3 onClick={() => this._goHead()}> <Link className='link_tit' to='/'> Sejun's Blog </Link> </h3>
            </div>

            <div className='acenter'>
              <ul className='btn_list'>
            {login ? <li className='btn_cursor' onClick={() => this._logout()}> 로그아웃 </li>
                   : <li className='btn_cursor' onClick={() => this._openModal()}> 로그인 </li>
            }

                <Login 
                  _login = {this.props._login}
                  login_modal = {login_modal}
                  _toggleModal = {_toggleModal}
                />

              {!login
                ? <li> <Link to='/signup'> 회원가입 </Link> </li>
                : null
              }
                </ul>
            </div>
        </div>
    );
  }
}

export default header;
