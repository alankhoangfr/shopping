import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import AppNavBar from "./components/AppNavBar"
import PageContent from "./components/PageContent"
import {Provider} from "react-redux"
import store from "./store"

class App extends Component {

  render(){
  		return (
  			<Provider store ={store}>
	   			<div>
				    <AppNavBar/>
				    <PageContent/>
				    
				</div>
			</Provider>

	

  );
  }

}

export default App;


