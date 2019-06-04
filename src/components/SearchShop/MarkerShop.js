import React, { Component } from 'react';
import basket from "../../image/basket.png"
import basketSelected from "../../image/basketSelected.png"
import { Marker,InfoWindow  } from "react-google-maps";
import {connect} from "react-redux"
import {getSuperMarkets,changeMarkerSelected} from "../../actions/SuperMarketActions"
import PropTypes from "prop-types"

export class MarkerShop extends Component {
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.getSuperMarkets()

	}
	shouldComponentUpdate(nextProps, nextState){
		console.log("markerShop ShouldCOmponentUpdate",nextProps,this.props)
		if(this.props.superMarket.markerSelected!==nextProps.superMarket.markerSelected){
			console.log("marker clicked")
			return true	
		}else{
			return false	
		}
	}
	onDblClick = (marker,event)=>{	
		var markerObject = this.props.markers1.filter((mark)=>{
			return mark.id=== marker
		})
		markerObject = markerObject[0]
		this.props.changeMarkerSelected(markerObject)
	} 
	iconBasket = (marker)=>{
		let icon = basket
		if(this.props.superMarket.markerSelected!==null){
			if (this.props.superMarket.markerSelected.id===marker.id){
				icon = basketSelected
			}
		}
		
		return icon	
	}	  		
	render(){
		return(
			this.props.markers1.map((marker) => {				
			return( 
				<Marker
						key={marker.id}
						position={{ lat: marker.lat, lng: marker.lng }}
						icon ={this.iconBasket(marker)}
						onDblClick = {this.onDblClick.bind(this,marker.id)}
						animation={window.google.maps.Animation.DROP}
				>

				</Marker>
			)
				
		})

    	)

	}

	}



MarkerShop.propTypes = {
	getSuperMarkets:PropTypes.func.isRequired,
	superMarket:PropTypes.object.isRequired,
	changeMarkerSelected:PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
	superMarket:state.superMarket
})

export default connect(mapStateToProps,{getSuperMarkets,changeMarkerSelected})(MarkerShop)