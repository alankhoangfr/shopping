import React, {Component} from "react"
import {Switch, Route} from "react-router-dom"
import CompareBasket from "./CompareBasket"
import AddShop1 from "./AddShop1"

class PageContent extends Component {
	render(){
		return(
			<div>
				<Switch>
					<Route exact path="/" component={CompareBasket}/>
					<Route path="/AddShops" component={AddShop1}/>
				</Switch>
			</div>
			);
	}
}

export default PageContent