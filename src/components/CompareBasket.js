import React, {Component} from 'react';
import { Container, Row,Col } from 'reactstrap';
import InfoArea from "./SearchShop/InfoArea"
import Map from "./SearchShop/Map"

class CompareBasket extends Component {
	state ={
		markerSelected :"",
		markersInBound:[],
		shopSelected:"",
	}
  markerSelected=(marker)=>{
  	this.setState({markerSelected:marker})  }
  markersInBound = (markers)=>{
  	this.setState({markersInBound:markers})
  }
  shopSelected = (markers)=>{
  	this.setState({shopSelected:markers})
  }
  render(){

  	console.log(this.state,"CompareBasket")
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

export default CompareBasket;


