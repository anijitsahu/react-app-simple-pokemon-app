import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

// components 
import Title from './components/layout/Title';
import Content from './components/layout/Content';
import ErrorBoundary from './components/ErrorBoundary'

// css
import './css/style.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInfo: ''
    }

    this.sendUserInfo = this.sendUserInfo.bind(this)
  }

  sendUserInfo(userInfo) {
  	console.log("userInfo received in APP", userInfo)
    this.setState({ userInfo })
  }


  render() {
  	let {userInfo} = this.state
    return (
      <BrowserRouter>
	    <ErrorBoundary>
		    <div className="container">
		    	{ /* including the Title as well as Content components */ }
			  		<Title userInfo={userInfo}/>
			  		<Content sendUserInfo={this.sendUserInfo}/>	
		  	</div>
			</ErrorBoundary>
		</BrowserRouter>
    );
  }
};



export default App;