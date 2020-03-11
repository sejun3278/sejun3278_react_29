import React, { Component } from 'react';
import './main.css';

import { Link } from 'react-router-dom';
import { Search } from './index.js';

class list extends Component {

  render() {
    const { 
      list_data, list_all_page, list_search, list_page, _changePage
    } = this.props;
    
    return (
      <div className='List'>
        <div className='list_grid list_tit'>
          <div> 제목 </div>
          <div> 조회수 </div>
          <div className='acenter'> 날짜 </div>
        </div>

          {/* data && data.length > 0 ? data.map( (el, key) => { */} 
          {list_data !== "[]" && list_data.length > 0 ? JSON.parse(list_data).map( (el, key) => {
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
              {/* search !== "" */}
              {list_search && list_search  !== "" 
                                   ? <div> 검색된 결과가 없습니다. </div> // 검색 사용
                                   : <div> 데이터가 없습니다. </div> // 검색 사용 X
              }
              </div>
            }

          <div className='paging_div'>
            <div> </div>
            <div>
              <ul>
                {/* all_page ? all_page.map( (el, key) => { */}
                {list_all_page ? list_all_page.map( (el, key) => {
                  return(
                    /* el === page ? */
                    el === list_page ? <li key={key} className='page_num'> 
                                          <b> {el} </b> 
                                       </li>

                                      /* <li key={key} className='page_num' 
                                      onClick={() => this._changePage(el)}> {el} 
                                      </li> */
                                     : <li key={key} className='page_num' 
                                           onClick={() => _changePage(el)}> {el} 
                                        </li>
                  )
                })
                
                : null }
              </ul>
                <Search 
                  search = {list_search}
                />
            </div>
            <div> </div>
          </div>

      </div>
    );
  }
}

export default list;
