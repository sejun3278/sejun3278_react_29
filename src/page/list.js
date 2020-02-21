import React, { Component } from 'react';
import './main.css';

import { Link } from 'react-router-dom';

import queryString from 'query-string';
import { Search } from './index.js';

import axios from 'axios';

class list extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : [],
      page : 1,
      limit : 10,
      all_page : [],
      search : "",
    }
  }

  componentWillMount() {
    this._getListData();
    this._setPage();
  }

  _getListData = async function() {
    const { limit } = this.state;
    const page = this._setPage();
    
    let search = queryString.parse(this.props.location.search);
    if(search) {
      search = search.search;
    }

    // Board 테이블 데이터 전체 수
    const total_cnt = await axios('/get/board_cnt', {
      method : 'POST',
      headers: new Headers(),
      data : { search : search }
    });

    // 데이터 가져오기
    const total_list = await axios('/get/board', {
      method : 'POST',
      headers: new Headers(),
      data : { limit : limit, page : page, search : search }
    })

    // 전체 페이지 수 구하기
    let page_arr = [];

    for(let i = 1; i <= Math.ceil(total_cnt.data.cnt / limit); i++) {
      page_arr.push(i);
    }

    this.setState({ data : total_list, 
                    all_page : page_arr, 
                    search : search })
  }

  _changePage = function(el) {
    this.setState({ page : el })
    sessionStorage.setItem('page', el);

    return this._getListData();
  }

  _setPage = function() {
    if(sessionStorage.page) {
      this.setState({ page : Number(sessionStorage.page) })
      return Number(sessionStorage.page);
    }

    this.setState({ page : 1 })
    return 1;
  }

  render() {
    const list = this.state.data.data
    const { all_page, page, search } = this.state;
    
    return (
      <div className='List'>
        <div className='list_grid list_tit'>
          <div> 제목 </div>
          <div> 조회수 </div>
          <div className='acenter'> 날짜 </div>
        </div>

        
          {list && list.length > 0 ? list.map( (el, key) => {
            const view_url = '/view/' + el.board_id;

            return(
              <div className='list_grid list_data' key={key}>
                <div> <Link to={view_url}> {el.title} </Link> </div>
                <div> </div>
                <div className='acenter'> {el.date.slice(0, 10)} </div>
              </div>
            )
          })
            : <div className='not_data acenter'>
              {search !== "" ? <div> 검색된 결과가 없습니다. </div> // 검색 사용
                            : <div> 데이터가 없습니다. </div> // 검색 사용 X
              }
              </div>
            }

          <div className='paging_div'>
            <div> </div>
            <div>
              <ul>
                {all_page ? all_page.map( (el, key) => {
                  return(
                    el === page ? <li key={key} className='page_num'> <b> {el} </b> </li>
                                : <li key={key} className='page_num' onClick={() => this._changePage(el)}> {el} </li>
                  )
                })
                
                : null }
              </ul>
                <Search 
                  search = {search}
                />
            </div>
            <div> </div>
          </div>

      </div>
    );
  }
}

export default list;
