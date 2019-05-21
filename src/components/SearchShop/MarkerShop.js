import React, { Component } from 'react';
import basket from "../../image/basket.png"
import basketSelected from "../../image/basketSelected.png"
import { Marker,InfoWindow  } from "react-google-maps";

export class MarkerShop extends Component {
	constructor(props){
		super(props)
		this.state={
			markerSelected:"",
			currentlySelected:"",
		}
	}
	shouldComponentUpdate(nextProps, nextState){
		console.log("markerShop ShouldCOmponentUpdate",nextProps,this.props)
		if(this.props.shopSelected !==nextProps.shopSelected){
			console.log("new marker selected")
			return true
		}else if(this.props.markerSelected===nextProps.markerSelected){
			console.log("marker clicked")
			return true	
		}else{
			return false	
		}
	}
	componentDidUpdate(prevProps, prevState, snapshot){
		console.log("markerShop componentDidUpdate",prevProps,this.props)
		if(this.props.shopSelected !==prevProps.shopSelected){
			console.log("marker clicked")
			this.setState({currentlySelected:true})
		}
	}
	onDblClick = (marker,event)=>{	
		var markerObject = this.props.markers1.filter((mark)=>{
			return mark.photo_id=== marker
		})
		markerObject = markerObject[0]
		this.props.markerSelected(markerObject)
		this.setState({
			markerSelected:markerObject.photo_id,
			currentlySelected:true})
	} 
	iconBasket = (marker)=>{
		let selected 
		if(this.props.shopSelected===""||this.state.currentlySelected===true){
			selected=this.state.markerSelected
		}else{
			selected=this.props.shopSelected.photo_id
		}
		let icon
		if (selected===marker.photo_id){
				icon = basketSelected
			}else{
				icon = basket
			}
		return icon	
	}	  		
	render(){
		console.log("markershop",this.props,this.state)
		return(
			this.props.markers1.map((marker) => {				
			return( 
				<Marker
						key={marker.photo_id}
						position={{ lat: marker.lat, lng: marker.lng }}
						icon ={this.iconBasket(marker)}
						onDblClick = {this.onDblClick.bind(this,marker.photo_id)}
						animation={window.google.maps.Animation.DROP}
				>

				</Marker>
			)
				
		})

    	)

	}

	}


export default MarkerShop