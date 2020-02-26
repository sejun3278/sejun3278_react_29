import React, { Component } from 'react';
import './main.css';

import { Route, Link, Switch } from 'react-router-dom';
import { List, Write, View } from './index.js'; 

import { Right_Write } from './right/index.js'; 
import { Category } from './left/index.js'; 

class main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category : '',
      category_change : false,
    }
  }

  _fixCategory = function() {
    const category = sessionStorage.getItem('category');
    this.setState({ category : category });
  }

  _changeCatgory = (target) => {
    sessionStorage.setItem('category', target);
    this.setState({ category : target });
  }

  _withProps = function (Component, props) {
    return function(matchProps) {
      return <Component {...props} {...matchProps} />
    }
  }

   _changeState = () => {
    this.setState({ category_change : true })
  }

  render() {
    const { _changeCatgory, _changeState } = this;
    const { login } = this.props;

    return (
        <div className='Mains'>
          <div id='Mains-left'>
            {/* 변경 전 <Route path='/' component={Category} exact/> */}

            <Route path='/' 
                   render={props => <Category _changeCatgory={_changeCatgory} 
                                              login = {login}
                                              _changeState = {_changeState}
                  />} 
                   exact
            />
          </div>

          <div>
            <Switch>
              <Route path='/' 
                     component={this._withProps(List, { category : this.state.category })} 
                     exact/>
            </Switch>


            <Route path='/write' component={Write} />
            <Route path='/view/:data' component={View} />
          </div>

          <div id='Mains-right'>
            <Route path='/write' component={Right_Write} />
          </div>
        </div>
    );
  }
}

export default main;
