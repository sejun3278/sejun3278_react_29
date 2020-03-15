import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

import { Back_And_Close } from './index.js'; 

import axios from 'axios';

class search_pw extends Component {
  constructor(props) {
    super(props);
    this.state = {
        result : false,
        secret : "",
        user_data : "",
        change : false,
    }
}

  _searchPassword = async function() {
    const user_id = document.getElementsByName('search_pw_id')[0].value.trim();

    // 이메일 구하기
    const email_id = document.getElementsByName('search_pw_email')[0].value.trim();
    const email_host = document.getElementsByName('search_pw_write_email')[0].value.trim();

    const user_email = email_id + '@' + email_host;

    // 아이디 체크
    const id_check = /^[a-z]+[a-z0-9]{5,19}$/g;

    // 이메일 체크
    const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if(!id_check.test(user_id)) {
      return alert('아이디는 영문자로 시작하는 6~20자여야만 합니다.')
    }

    if(email_id === "" || email_host === "") {
      return alert('이메일을 모두 입력해주세요.');

    } else if(!user_email.match(email_check)) {
      return alert('올바른 이메일 형식을 입력해주세요.');
    }

    const obj = { user_id : user_id, user_email : user_email }
    const res = await axios('/search/pw', {
      method : 'POST',
      data : obj,
      headers: new Headers()
    })

    if(res.data === false) {
      return alert('일치하는 데이터가 없습니다 \n다시 확인해주세요.');
    }

    document.getElementsByName('search_pw_id')[0].value = '';

    alert(res.data.result[0].email + '의 주소로 \n6자리의 숫자코드가 수신되었습니다.');
    return this.setState({ 
      result : true, 
      secret : res.data.secret, 
      user_data : res.data.result[0]
    })
  }

  _checkSecretCode = function() {
    const secret_code = Number(this.state.secret);
    const secret_input = Number(document.getElementsByName('pw_secret')[0].value.trim());
    
    if(String(secret_input).length !== 6) {
      return alert('6자리의 숫자코드를 입력해주세요.');

    } else if(secret_code !== secret_input) {
      return alert('숫자코드가 일치하지 않습니다.');
    }

    return this.setState({ change : true })
  }

  _changePassword = async function() {
    const change_password = document.getElementsByName('change_password')[0].value.trim();
    const check_change_password = document.getElementsByName('check_change_password')[0].value.trim();

    // 비밀번호 확인
    const pw_check = /^[a-z]+[a-z0-9]{5,19}$/g;
    if(!pw_check.test(change_password)) {
      return alert('비밀번호는 영문자로 시작하는 6~20자여야만 합니다.')

    } else if(change_password !== check_change_password) {
      return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
    }

    const user_id = this.state.user_data.id;
    const obj = { user_id : user_id, change_password : change_password }
    await axios('/update/password', {
      method : 'POST',
      data : obj,
      headers: new Headers()
    })

    alert('비밀번호가 변경되었습니다.');
    this.setState({ result : false, change : false })
    return this.props._backSearchModal(this.props.target);
  }

  _resetPWResult = () => {
    this.setState({ result : false, change : false })
  }

  render() {
    const { 
      _closeSearchModal, _backSearchModal, target
    } = this.props;

    const { _resetPWResult } = this;
    const { result, user_data, change } = this.state;

    return (
        <div>
            <Modal visible={this.props.search_pw_modal} 
                    width="400" height="420"
                    effect="fadeInDown" 
                >
              <Back_And_Close 
                _closeSearchModal = {_closeSearchModal}
                _backSearchModal = {_backSearchModal}
                _resetPWResult = {_resetPWResult}
                target = {target}
              />
              {!result ? 
              <div className='Search_div'>
                <h4> 비밀번호 찾기 </h4>

                <div>  
                  <h5> 아이디 </h5>
                  <input type='text' maxLength='15' name='search_pw_id'/>
                </div>

                <div>  
                  <h5> 이메일 </h5>
                  <input type='text' maxLength='20' name='search_pw_email'/> 
                
                  <div id='search_id_email_div'>
                    @
                    <input type='text' maxLength='15' name='search_pw_write_email'/>
                  </div>
                </div>

                <div>
                  <input type='button' value='조회하기' name='search_pw_submit'
                         onClick={() => this._searchPassword()}
                  />
                </div>
              </div>

              : 
                !change ? 
                <div className='search_result_div'>
                  <h4> 비밀번호 찾기 </h4>

                  <div>
                    <p> <b> {user_data.email} </b> 이메일 주소로 <br />전송된 6자리 숫자코드를 입력해주세요. </p>
                    <input type='text' maxLength='6' name='pw_secret'
                          placeholder='6자리 숫자코드 입력'/>
                    <input type='button' value='확인' name='pw_secret_submit'
                          onClick={() => this._checkSecretCode()}
                    />
                  </div>
                </div>

                : 
                  <div className='change_password_div'>
                    <h4> 비밀번호 변경 </h4>

                    <div>
                      <span> 
                        변경하려는 비밀번호를 입력해주세요.
                        <p> ( 영문자로 시작해 영문 또는 숫자로 6~20자 입력 )</p>
                      </span>

                      <div>
                        <h5> 비밀번호 </h5>
                        <input type='password' name='change_password' maxLength='20'/>
                      </div>

                      <div>
                        <h5> 비밀번호 확인 </h5>
                        <input type='password' name='check_change_password' maxLength='20'/>
                      </div>

                      <input type='button' value='비밀번호 변경' name='change_password_submit'
                             onClick={() => this._changePassword()}
                      />
                    </div>
                  </div>
              }
            </Modal>
        </div>
    );
  }
}

export default search_pw;