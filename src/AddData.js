// import React, { Component } from 'react';
// import './App.css';
// import axios from 'axios';

// class AddData extends Component {
//   constructor() {
//     super()
//     this.state = {
//       teacher : '',
//     }
//   }

//   _teacherUpdate(e) {
//     this.setState({ teacher : e.target.value });
//   }

//   _addData = async (e) => {
//     const { teacher } = this.state;
//     e.preventDefault();

//     const res = await axios('/test/add', {
//       method : 'POST',
//       data : teacher,
//       headers: new Headers()
//       })

//       if(res.data) {
//         alert('데이터가 추가되었습니다.');
//         return window.location.reload();
//       }
//   }

//   render() {
//     return(
//       <div>
//         <form method='POST' onSubmit={this._addData}>
//           <input type='text' maxLength='10' onChange={(e) => this._teacherUpdate(e)}/>
//           <input type='submit' value='추가하기'/>
//         </form>
//       </div>
//     )
//   }
// }

// export default AddData;
