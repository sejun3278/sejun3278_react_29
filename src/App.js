import React, { Component } from 'react';
import './App.css';

import { Head } from './inc'
import { Main } from './page/index.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login : false,
      admin : false,
      user_ip : "",
      signup : false,
    }
  }

  componentDidMount() {

    if(sessionStorage.login && sessionStorage.IP) {
      this.setState({ 
        login : JSON.parse(sessionStorage.login).id, 
        admin : JSON.parse(sessionStorage.login).admin,
        user_ip : JSON.parse(sessionStorage.IP)
      })
    }
  }

  _login = (data) => {
    sessionStorage.setItem('login', JSON.stringify(data.suc))
    sessionStorage.setItem('IP', JSON.stringify(data.ip))

    this.setState({ login : JSON.parse(sessionStorage.login).id,  
                    admin : JSON.stringify(data.suc).admin,
                    user_ip : JSON.parse(sessionStorage.IP)
    })
    return window.location.reload()
  }

  _logout = () => {
    this.setState({ login : false, admin : false, user_ip : "" })

    sessionStorage.removeItem('login')
    sessionStorage.removeItem('IP')
  }

  render() {
    const { login, admin, user_ip } = this.state;
    const { _login, _logout } = this;

    return(
    <div>
      <div>
        <Head 
          login = {login}
          admin = {admin}
          user_ip = {user_ip}
          _login = {_login}
          _logout = {_logout}
        />
      </div>

      <div>
        <Main
          admin = {admin}
          user_ip = {user_ip}
          login = {login}
        />
      </div>
    </div>
    )
  }
}

export default App;
