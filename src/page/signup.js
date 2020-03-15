import React, { Component } from 'react';
import './main.css';

import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email_writer : false,
    }
  }

  _changeEmailSelect = function() {
    const select = document.getElementsByName('signup_email_select')[0].value;

    if(select === 'write') {
      this.setState({ email_writer : true })
    } else {
      this.setState({ email_writer : false })
    }
  }

  _signup = async function() {

    const id = document.getElementsByName('signup_id')[0].value.trim();
    const password = document.getElementsByName('signup_password')[0].value.trim();
    const psw_check = document.getElementsByName('signup_pswCheck')[0].value.trim();
    const name = document.getElementsByName('signup_name')[0].value.trim();
    const birthday = document.getElementsByName('signup_birthday')[0].value.trim();
    const sex = document.getElementsByName('signup_sex')[0].value.trim();

    // 이메일 구하기
    const email_first = document.getElementsByName('signup_email')[0].value.trim();
    let email_select = document.getElementsByName('signup_email_select')[0].value;
    
    if(email_select === 'write') {
      email_select = document.getElementsByName('signup_email_write')[0].value.trim();
    }
    const email = email_first + '@' + email_select;

    const eng_check = /^[a-z]+[a-z0-9]{5,19}$/g;
    if(!eng_check.test(id)) {
      return alert('아이디는 영문자로 시작하는 6~20자여야만 합니다.')
    }
    
    const pw_check = /^[a-z]+[a-z0-9]{5,19}$/g;
    if(!pw_check.test(password)) {
      return alert('비밀번호는 영문자로 시작하는 6~20자여야만 합니다.')

    } else if(password !== psw_check) {
      return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
    }

    if(name.length === 0 || name.length < 2) {
      return alert('이름은 최소 2글자 이상 입력해야 합니다.');

    } else if(birthday.length < 6 || sex.length === 0) { 
      return alert('생년월일을 모두 입력해주세요.');

    } else if(isNaN(Number(birthday)) || isNaN(Number(sex))) {
      return alert('생년월일은 숫자만 입력할 수 있습니다.');
    }

    const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if(!email.match(email_check)) {
      return alert('올바른 이메일 형식을 입력해주세요.');
    }

    const data = { id : id, 
                   password : password, 
                   name : name, 
                   birthday : birthday, 
                   sex : sex, 
                   email : email };
    const add_user = await axios('/add/user', {
      method : 'POST',
      headers: new Headers(),
      data : data
    })

    if(!add_user) {
      return alert('이미 존재하는 아이디입니다.');

    } else {
      alert('회원가입이 완료되었습니다.');
      return window.location.href = '/';
    }
  }

  render() {
    return (
      <div>
        <form id='signup_form'>
        <div>
          <h3 id='signup_title'> 회원가입 (Signup) </h3>
        </div>
        <div className='Signup'>
          <div>
            {/* 아이디 */}
            <div>
              <h5> 아이디 </h5>
              <input type='text' maxLength='20' name='signup_id'/>
            </div>

            {/* 비밀번호 */}
            <div>
              <h5> 비밀번호 </h5>
              <input type='password' maxLength='15' name='signup_password'/>
            </div>

            {/* 비밀번호 */}
            <div>
              <h5> 비밀번호 확인 </h5>
              <input type='password' maxLength='15' name='signup_pswCheck'/>
            </div>
          </div>

          <div id='signup_section'>
            {/* 이름 */}
            <div>
              <h5> 이름 </h5>
              <input type='text' maxLength='10' name='signup_name'/>
            </div>

            {/* 생년월일 */}
            <div>
              <h5> 생년월일 </h5>
              <input type='text' maxLength='6' name='signup_birthday'/> - 
              <input type='text' maxLength='1' name='signup_sex'/> ******
            </div>

            {/* 생년월일 */}
            <div>
              <h5> 이메일 </h5>
              <input type='text' maxLength='15' name='signup_email'/> @
              <select name='signup_email_select' onChange={() => this._changeEmailSelect()}>
                <option value='google.com'> google.com </option>
                <option value='naver.com'> naver.com </option>
                <option value='write'> 직접 입력 </option>
              </select>

              {this.state.email_writer ? <div> <input type='text' name='signup_email_write' maxLength='20'/> </div>
                                       : null
              }
            </div>
            
          </div>
        </div>

        <div>
          <input type='button' value='가입하기' name='sigunup_submit' onClick={() => this._signup()}/>
        </div>
        </form>
      </div>
    );
  }
}

export default Signup;
