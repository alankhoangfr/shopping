import React, {Component} from "react"
import SearchShop from "./SearchShop"
import FormItem from "./AddItem/FormItem"
import { Container, Row,Col } from 'reactstrap';


export class AddItem extends Component{
	constructor(props){
		super(props)
		this.state={
			supermarket_selected:"",
			
		}
	}
	
	supermarket_selected=(markerObject)=>{
		this.setState({supermarket_selected:markerObject})
	}
	render(){
		let shopSelected = 
			<Container style={{marginTop:"50px"}}>
				<Row>
					<Col sm={4}>
						<FormItem
					supermarket_selected={this.state.supermarket_selected}
					compareCard = {false}
						/>
					</Col>
					<Col sm={7}>
						<h1>Characteristic of {this.state.supermarket_selected.name}</h1>
					</Col>
				</Row>
			</Container>
		if(this.state.supermarket_selected===""){shopSelected=null}
		return (
			<React.Fragment>

				<SearchShop
					supermarket_selected={this.supermarket_selected}
					fromAddItem = {true}
					compareBasket={false}
					/>
				{shopSelected}
			</React.Fragment>
			)
	}
}

export default AddItem