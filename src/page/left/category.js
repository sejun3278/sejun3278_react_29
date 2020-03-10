import React, { Component } from 'react';
import '../main.css';

import { Link } from 'react-router-dom';
import axios from 'axios';

class category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category : [],
      edit : false,
    }
  }

  componentDidMount() {
    this._getCategoryData();
  }

  _getCategoryData = async function() {
    const getData = await axios('/get/category');

    this.setState({ category : getData.data })
  }

  _addCategory = async function() {
    let category_name = window.prompt('추가할 카테고리의 이름을 입력해주세요.');

    if(category_name) {
    category_name = category_name.trim();

      if(category_name !== '' && category_name.length > 0) {
        const add = await axios('/add/category', {
          method : 'POST',
          data : { name : category_name },
          headers: new Headers()
        })
        
        alert(add.data.msg);
        this._getCategoryData();

      } else {
        return alert('최소 1글자 이상 입력해야 합니다.');
      }
    }
  }

  _removeCategory = async function(category) {
    if(window.confirm(category.name + ' 카테고리를 삭제하시겠습니까?')) {

      const remove = await axios('/delete/category', {
        method : 'POST',
        data : category,
        headers: new Headers()
      })

      if(remove) {
        alert('카테고리 삭제가 완료되었습니다.');
        this._getCategoryData();
      }
    }
  }

  _modifyCategory = async function(category) {
    let modify_name = document.getElementsByName('modify_' + category.id)[0].value;
    modify_name = modify_name.trim();

    if(modify_name !== '' && modify_name.length > 0) {
      if(category.name === modify_name) {
        return alert('변경하려는 카테고리의 이름이 \n기존의 카테고리명과 동일합니다.');
      }

      if(window.confirm(category.name + ' 의 이름을 \n' + modify_name + ' 으로 수정하시겠습니까?')) {

        const data = { id : category.id, name : modify_name }
        const modfy = await axios('/modify/category', {
          method : 'POST',
          data : data,
          headers: new Headers()
        })

        alert(modfy.data.msg);
        this._getCategoryData();
      }

     } else {
       return alert('변경할 카테고리의 이름을 최소 1 글자 이상 입력해주세요.');
     }
  }

  render() {
    const { category, edit } = this.state;
    const { _changeCatgory, login, admin, user_ip } = this.props;

    let pre_cat = '';
    if(sessionStorage.getItem('category')) {
      pre_cat = Number(sessionStorage.getItem('category'));
    }

    return (
        <div className='Category'>
          <ul>
            <li> 
              <Link className={pre_cat === '' ? "pre_cat" : null} to='/' onClick={() => _changeCatgory('')}> 
                전체 보기
              </Link> 
              {login && admin === 'Y' && user_ip === "192.168.0.3"  
                               ? !edit ? <input type='button' value='Edit' className='Edit' onClick={() => this.setState({ edit : !edit })}/>
                               : <input type='button' value='Add' className='Edit' onClick={() => this._addCategory()}/> 
                                 
                       : null}
              <hr />
            </li>
            {category.length > 0 ? 
              category.map( (el, key) => {
                if(!edit) {
                  return(
                  <li key={key}> 
                    <Link className={pre_cat === el.id ? "pre_cat" : null} to='/' onClick={() => _changeCatgory(el.id)}> 
                      {el.name}
                    </Link> 
                  </li>
                  )
                } else {
                  return(
                    <li key={key}>
                      <img 
                        src='https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-x-mark-2.png&r=0&g=0&b=0'
                        className='remove_icon'
                        onClick={() => this._removeCategory(el)}
                      /> 
                      <input type='text' maxLength='20' className='edit_input' name={'modify_' + el.id} defaultValue={el.name}/>
                      <img 
                        src='https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2017/png/iconmonstr-check-mark-17.png&r=0&g=0&b=0'
                        className='modify_icon'
                        onClick={() => this._modifyCategory(el)}
                      /> 
                    </li>
                  )
                }
              })
          : null }
          </ul>
        </div>
    );
  }
}

export default category;
