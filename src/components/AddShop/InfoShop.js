import React, {Component} from "react"
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {connect} from "react-redux"
import {addItem} from "../../actions/itemActions"
import PropTypes from "prop-types"
import Geocode from "react-geocode";
import uuid from "uuid"
Geocode.setApiKey("AIzaSyBiffp6dvrIk_EWQHzXk05VzFKb5tioZeI");
Geocode.enableDebug();

class InfoShop extends Component{
	constructor( props ){
		super( props )
		this.state = {
			name:"",
			address: '',
			city: '',
			state: '',
			postcode:"",
			completeAddress	:"",
			markerPresent:false,
		}
	}
	shouldComponentUpdate(nextProps,nextState){
		console.log("shouldComponentUpdate",nextProps,nextState)
		if (this.props.markerInfo.completeAddress!==nextProps.markerInfo.completeAddress){
			console.log("new address")
			return true
		}else if (this.state!==nextState){
			console.log("<chainging></chainging>")
			return true
		}else{return false}

	}
	componentDidUpdate(prevProps){
		if (this.props.markerInfo.completeAddress!==prevProps.markerInfo.completeAddress){
			console.log("componentDidUpdate",prevProps,this.props)
			this.setState({
				address:this.props.markerInfo.address,
				city:this.props.markerInfo.city,
				state:this.props.markerInfo.state,
				postcode:this.props.markerInfo.postcode,
				completeAddress:this.props.markerInfo.completeAddress,
				markerPresent:true,
			})
		}
	}
	onChange = ( event ) => {
  		this.setState({ [event.target.name]: event.target.value });
 	};
 	onSubmit = (event)=>{	
 		event.preventDefault()
 		const address = this.state.address +" "+ this.state.city  +" "+ this.state.state  +" "+  this.state.postcode
 		console.log(address)
 		Geocode.fromAddress(address).then(
				response => {
    			const { lat, lng } = response.results[0].geometry.location
    			this.props.markerPosition({lat:lat,lng:lng})
    			this.props.mapPosition({lat:lat,lng:lng})
    			console.log(lat,lng)
    			const newMarker ={
    				id:uuid(),
    				lat:lat,
    				lng:lng,
    				name:this.state.name,
    				address:address,
    				score:"",
    				details:"",
    			}
    			this.props.addItem(newMarker)
    			this.props.markerInfoFromAddress(newMarker)}
    			 )
 	}
	render(){
		console.log(this.state)
		return(
		<Form onSubmit={this.onSubmit} style={{marginTop:"20px"}} >
			<Row form>
				<Col md={12}>
					<FormGroup row>
						<Label>Name</Label>	
						<Input type="text" name="name"  onChange={ this.onChange } value={ this.state.name } required/>	
						</FormGroup>
				</Col>
				<Col md={12}>
					<FormGroup row>
						<Label>Address</Label>
							<Input type="text" name="address"  onChange={ this.onChange } value={ this.state.address } required/>						
					</FormGroup>
				</Col>
				<Col md={12}>
					<FormGroup row>
						<Label>City</Label>
							<Input type="text" name="city"  onChange={ this.onChange }  value={ this.state.city } required/>
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={6}>
					<FormGroup row>
						<Label>State</Label>
						<Input type="text" name="state"  onChange={ this.onChange } value={ this.state.state } required/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup row>
						<Label>Postcode</Label>
						<Input type="text" name="postcode"  onChange={ this.onChange } type="number" value={ this.state.postcode } required/>
					</FormGroup>
				</Col>
			</Row>
			<Button>Add Supermarket</Button>
		</Form>
		)
	}
}



InfoShop.propTypes = {
	addItem:PropTypes.func.isRequired,
	item:PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
	item:state.item
})

export default connect(mapStateToProps,{addItem})(InfoShop)