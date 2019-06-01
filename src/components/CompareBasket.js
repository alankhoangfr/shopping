import React, {Component} from "react"
import SearchShop from "./SearchShop"
import ItemDisplay from "./Compare/ItemDisplay"
import {CardText,Table,CardTitle,CardSubtitle,Card,Container, Row,Col,CardImg,CardBody} from 'reactstrap';
import CBasket from "../image/CBasket.png"
import CardShops from "./Compare/CardShops"
import Basket from "./Compare/Basket"

export class CompareBasket extends Component{
	constructor(props){
		super(props)
		this.state={
			supermarket_selected:"",
			basket:[],
			itemOnDrag:"",
			shopSelectedCompare:"",	
			allSpace:true,
			space:[]
		}
	}
	shouldComponentUpdate(nextState,nextProps){
		if(this.props.allSpace!==nextProps.allSpace){
			return true
		}
	}
	itemOnDrag=(result)=>{
		this.setState({itemOnDrag:result})
	}
	basket = (basket)=>{
		this.setState({basket:basket})
	}
	supermarket_selected=(markerObject)=>{
		this.setState({supermarket_selected:markerObject})
	}
	shopSelectedCompare=(markerObject)=>{
		console.log("good")
		this.setState({shopSelectedCompare:markerObject})
	}

	allSpace=(allSpace)=>{
		this.setState({
			allSpace:allSpace.nonVisible,
			space:allSpace.space
		})
	}
	cancelCardSpace=()=>{
		this.setState({shopSelectedCompare:""})
	}
	render(){
		console.log(this.state)
		let shopSelected = 
			<ItemDisplay
				supermarket_selected={this.state.supermarket_selected}
				itemOnDrag={this.itemOnDrag}
				basket={this.basket}
				space={this.state.space}
			/>
		if(this.state.allSpace===true){shopSelected=null}
		return (
			<React.Fragment>
				<SearchShop
					supermarket_selected={this.supermarket_selected}
					fromAddItem = {true}
					compareBasket={true}
					shopSelectedCompare={this.shopSelectedCompare}
					/>
				<Container style={{marginTop:"50px"}}>
					<Row>
						<Col sm={3}  style={{zIndex:"1"}}>
							<Basket
								itemOnDrag={this.state.itemOnDrag}
								basket={this.basket}/>
							{shopSelected}
						</Col>		
					<CardShops
						shopSelectedCompare={this.state.shopSelectedCompare}
						allSpace={this.allSpace}
						basket={this.state.basket}
						cancelCardSpace={this.cancelCardSpace}/>
					</Row>
				</Container>
			</React.Fragment>
			)
	}
}

export default CompareBasket

