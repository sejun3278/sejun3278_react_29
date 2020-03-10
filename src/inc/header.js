import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

import Modal from 'react-awesome-modal';
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
    this.setState({
        visible : true
    });
  }

  _closeModal = function() {
    this.setState({
        visible : false
    });
  }

  _changeID = function() {
    const id_v = document.getElementsByName('id')[0].value;

    this.setState({
        id : id_v
    });
  }

  _changePW = function() {
    const pw_v = document.getElementsByName('password')[0].value;

    this.setState({
        password : pw_v
    });
  }

  _selectUserData = async (e) => {
    const id = this.state.id.trim();
    const password = this.state.password.trim();

    if(id === "") {
      return alert('아이디를 입력해주세요.');

    } else if(password === "") {
      return alert('비밀번호를 입력해주세요.');
    }

    const obj = { id : id, password : password }
    const res = await axios('/send/pw', {
        method : 'POST',
        data : obj,
        headers: new Headers()
      })

      if(res.data) {

        if(res.data.suc) {

          this.props._login(res.data);
          this._closeModal();

          return alert('로그인 되었습니다.')

        } else {
          return alert('아이디 및 비밀번호가 일치하지 않습니다.');
        }
      }
   }

  _logout = function() {
    if(window.confirm('로그아웃 하시겠습니까?')) {
      this.props._logout();
    }
  }

  _goHead = function() {
    sessionStorage.removeItem('page')

    return window.location.href = '/';
  }

  render() {
    const { login, admin, user_ip } = this.props;

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

                <Modal visible={this.state.visible} 
                       width="400" height="360"
                       effect="fadeInDown" 
                       onClickAway={() => this._closeModal()}
                >
                  <div>
                    <h4 className='acenter login_tit'> 로그인 </h4>
                    <form>
                    <div className='login_div'>
                      <div className='login_input_div'>
                        <p> ID </p>
                        <input type='text' name='id' onChange={() => this._changeID()} autoComplete="off"/>
                      </div>

                      <div className='login_input_div' style={{ 'marginTop' : '40px'}}>
                        <p> Password </p>
                        <input type='password' name='password' onChange={() => this._changePW()}/>
                      </div>

                      <div className='submit_div'>
                        <div> <input type='button' value='로그인' onClick={() => this._selectUserData()}/> </div>
                        <div> <input type='button' value='취소' onClick={() => this._closeModal()}/> </div>
                      </div>
                    </div>
                    </form>
                  </div>
                </Modal>

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
