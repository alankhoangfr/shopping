import React, {Component} from 'react';
import { Container, Row,Col } from 'reactstrap';
import InfoArea from "./SearchShop/InfoArea"
import Map from "./SearchShop/Map"

class SearchShop extends Component {
	state ={
		markerSelected :"",
		markersInBound:[],
		shopSelected:"",
	}
  markerSelected=(markerObject)=>{
  	this.setState({markerSelected:markerObject})
  	if (this.props.fromAddItem===true){
  		this.props.supermarket_selected(markerObject)
  	}
  }
  markersInBound = (markers)=>{
  	this.setState({markersInBound:markers})
  }
  shopSelected = (markerObject)=>{
  	this.setState({shopSelected:markerObject})
  	  	if (this.props.fromAddItem===true){
  		this.props.supermarket_selected(markerObject)
  	}
  }
  shopSelectedCompare=(markerObject,event)=>{
		this.props.shopSelectedCompare(markerObject	)
	} 
	render(){

  	console.log(this.state,"SearchShop")
  		return (
   			<div>
			    <Container>
			    	<div className="title">
						<h1>
							Search for the Supermarkets near you
						</h1>
							
					</div>
			    	<Row>
			    		<Col sm={6}>
					      	<Map
						    center={{lat: -33.78, lng: 151.2}}
						    height='500px'
						    zoom={8}
						    markerSelected = {this.markerSelected}
						    markersInBound = {this.markersInBound}
						    shopSelected = {this.state.shopSelected}
							/>
						</Col>
						<Col sm={6}>
							<InfoArea
								shopSelectedCompare={this.shopSelectedCompare}
								compareBasket={this.props.compareBasket}
								markerSelected	={this.state.markerSelected}
								markersInBound	={this.state.markersInBound}
								shopSelected = {this.shopSelected}
							/>
						</Col>
					</Row>
			    </Container>
			</div>

	

  );
  }

}

export default SearchShop;


