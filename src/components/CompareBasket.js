import React, {Component} from "react"
import SearchShop from "./SearchShop"
import ItemDisplay from "./Compare/ItemDisplay"
import {CardText,Table,CardTitle,CardSubtitle,Card,Container, Row,Col,CardImg,CardBody,Button} from 'reactstrap';
import CBasket from "../image/CBasket.png"
import CardShops from "./Compare/CardShops"
import Basket from "./Compare/Basket"
import GenerateData from "./Compare/GenerateData"
import RemoveAllBasket	 from "./Compare/RemoveAllBasket"

export class CompareBasket extends Component{
	constructor(props){
		super(props)
		this.state={
			supermarket_selected:"",
			itemOnDrag:"",
			shopSelectedCompare:"",	
			allSpace:true,
			space:[]
		}
	}
	itemOnDrag=(result)=>{
		this.setState({itemOnDrag:result})
	}
	supermarket_selected=(markerObject)=>{
		this.setState({supermarket_selected:markerObject})
	}
	shopSelectedCompare=(markerObject)=>{
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
		let shopSelected = 
			<div>
				<RemoveAllBasket/>
				<ItemDisplay
					supermarket_selected={this.state.supermarket_selected}
					itemOnDrag={this.itemOnDrag}
					space={this.state.space}
				/>
			</div>
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
							<GenerateData/>
							<Basket
								itemOnDrag={this.state.itemOnDrag}/>
							{shopSelected}
						</Col>		
					<CardShops
						shopSelectedCompare={this.state.shopSelectedCompare}
						allSpace={this.allSpace}
						cancelCardSpace={this.cancelCardSpace}/>
					</Row>
				</Container>
			</React.Fragment>
			)
	}
}



export default CompareBasket
