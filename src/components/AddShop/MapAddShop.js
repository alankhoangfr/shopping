import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker,InfoWindow  } from "react-google-maps";
import Geocode from "react-geocode"
import Autocomplete from 'react-google-autocomplete';
import uuid from "uuid"
import {connect} from "react-redux"
import {getItems} from "../../actions/itemActions"
import MarkerShop from "../SearchShop/MarkerShop"
import PropTypes from "prop-types"

Geocode.setApiKey('AIzaSyBiffp6dvrIk_EWQHzXk05VzFKb5tioZeI');
Geocode.enableDebug();


export class MapAddShop extends Component {
	constructor(props){
		super(props)
		this.state = {
			completeAddress :"",
            address: '',
            city: '',
            postcode: '',
            state: '',
			bound:null,
			input:"",
			mapPosition:{
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition:{
				lat:this.props.center.lat,
				lng:this.props.center.lng
			},
			movePosition:{
				lat:this.props.center.lat,
				lng:this.props.center.lng		
			},
			map:null,
			markers1:[],
			zoom:10,
			moving:false,
			maploading:false,
		}
	}
	componentDidMount(){
		console.log("componentDidMount")
		this.props.getItems()
		this.updating_marker()

	}
	updating_marker = ()=>{
		console.log("updating marker>")
		if (this.state.moving===true){
			var markers1 = this.insideBound_bound(this.props.item.markers,this.state.bound)
			this.setState({
				markers1:markers1,
				moving:false,
				input:false,
				maploading:false,
			})
		}else{
			markers1 = this.insideBound(this.props.item.markers,this.state.movePosition)
			this.setState({
				markers1:markers1,
				moving:false,
				input:false,
				maploading:false,
			})		
		}
	}
	shouldComponentUpdate( nextProps, nextState ){	
		console.log("should Componeent update", nextState, this.state,nextProps,this.props)
		if (this.check_markers1(nextState.markers1,this.state.markers1)===false){
			console.log("change")
			return true
		}		
		else if(nextState.input===true){
			console.log("change position")
			return true
		}
		else if(nextProps.shopSelected !== this.props.shopSelected){
			console.log("new marker selected")
			return true
		}
		else if(nextProps.item!==this.props.item){
			console.log("new shops")
			return true
		}
		else if (this.check_markers1(nextState.markers1,this.state.markers1)===true){
			console.log("no change")
			return false
		}
	}
	componentDidUpdate(prevProps, prevState, snapshot){
		console.log("componentDidUpdate",prevState,this.state,prevProps,this.props,snapshot)
		if(this.props.shopSelected!==prevProps.shopSelected){
			return null
		}else{
			this.updating_marker()
			this.props.markers(this.props.item)
		}

	}
	getStreetNumber = ( addressArray ) => {
        let StreetNumber = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            if ( addressArray[ i ].types[0] && 'street_number' === addressArray[ i ].types[0] ) {
                StreetNumber = addressArray[ i ].long_name;
                return StreetNumber;
            }
        }
    }

    getStreet = ( addressArray ) => {
        let Street = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            if ( addressArray[ i ].types[0] && 'route' === addressArray[ i ].types[0] ) {
                Street = addressArray[ i ].long_name;
                return Street;
            }
        }
    }

    getPostcode = ( addressArray ) => {
        let postcode = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            if ( addressArray[ i ].types[0] && 'postal_code' === addressArray[ i ].types[0] ) {
                postcode = addressArray[ i ].long_name;
                return postcode;
            }
        }
    };

    getCity = ( addressArray ) => {
        let city = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            if ( addressArray[ i ].types[0]  ) {
            for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
                if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
                    city = addressArray[ i ].long_name;
                    return city;
                }
            }
        }
        }
    };

    getState = ( addressArray ) => {
    let state = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            for( let i = 0; i < addressArray.length; i++ ) {
                if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
                    state = addressArray[ i ].short_name;
                    return state;
                }
            }
        }
    };
    onMarkerDragEnd = ( event ) => {
        console.log( 'event', event );
        let newLat = event.latLng.lat(),
        newLng = event.latLng.lng(),
        addressArray = [];
        Geocode.fromLatLng( newLat , newLng ).then(
        response => {
            const completeAddress = response.results[0].formatted_address,
            addressArray =  response.results[0].address_components,
            street_number =this.getStreetNumber(addressArray),
            street =this.getStreet(addressArray),
            city = this.getCity( addressArray ),
            postcode = this.getPostcode( addressArray ),
            state = this.getState( addressArray ),
            address = street_number +" "+street
            this.props.markerInfoMap({
                completeAddress: ( completeAddress ) ? completeAddress : '',
                address: ( address ) ? address : '',
                postcode: ( postcode ) ? postcode : '',
                city: ( city ) ? city : '',
                state: ( state ) ? state : '',
                markerPosition: {
                lat: newLat,
                lng: newLng
                },
                mapPosition: {
                lat: newLat,
                lng: newLng
                },
                } )
            this.setState({
                markerPosition: {
                lat: newLat,
                lng: newLng
                },
            })
        },

        error => {
            console.error(error);
        }
    );
    };
	check_markers1=(array1,array2) => {
		var arr1 = []
		var arr2 = []
		array1.map((elem)=>{
			arr1.push(elem.id	)
		})
		array2.map((elem)=>{
			arr2.push(elem.id	)
		})
		if (arr1.sort().toString()==arr2.sort().toString()){	
			return true
		}else 
			{return false}
		}
	onPlaceSelected = ( place,event ) => {
		console.log(place)
		if (place.name!==undefined){
			Geocode.fromAddress(place.name).then(
				response => {
    			const { lat, lng } = response.results[0].geometry.location
    			console.log(lat, lng)
    			var markers1 = this.insideBound(this.props.item.markers,response.results[0].geometry.location)
    			if (lat ===undefined){
    				return null
    			}
    			this.setState({
					mapPosition: {
						lat: lat,
						lng: lng
					},
					markerPosition: {
						lat: lat,
						lng: lng
					},
					movePosition: {
						lat: lat,
						lng: lng
				},
					zoom:11,
					markers1:markers1,
					input:true,
					moving:false,
			})
    		})
		}
		else{
			const name = place.formatted_name,
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
			var markers1 = this.insideBound(this.props.item.markers,place.geometry.location)
			// Set these values in the state.
			this.setState({
				mapPosition: {
					lat: latValue,
					lng: lngValue
				},
				markerPosition: {
					lat: latValue,
					lng: lngValue
				},
				movePosition: {
					lat: latValue,
					lng: lngValue
				},
				zoom:11,
				markers1:markers1,
				input:true,
				moving:false,
			})
		}
	this.props.markerSelected("")
	return
	};
	mapmoved=()=>{
		console.log("mapMoved:"+JSON.stringify(this.state.map.getBounds()))
		var markers1 = this.insideBound_bound(this.props.item.markers,this.state.map.getBounds())
		this.setState({
			bound:this.state.map.getBounds(),
			movePosition: {
				lat: this.state.map.getCenter().lat(),
				lng: this.state.map.getCenter().lng()
			},
			mapPosition: {
				lat: this.state.map.getCenter().lat(),
				lng: this.state.map.getCenter().lng()
			},
			markers1:markers1 ,
			moving:true	
		})
	}
	maploaded=(mapRef)=>{
		console.log("maploaded")
		if(!mapRef){
			return
		}
		this.setState({
			map:mapRef,
			maploading:true})	
	}
	onZoom = ()=>{
		console.log("zoom:"+this.state.map.getCenter(),this.state.map.getZoom())
		var markers1 = this.insideBound_bound(this.props.item.markers,this.state.map.getBounds())
		this.setState({
			bound:this.state.map.getBounds(),
			movePosition: {
				lat: this.state.map.getCenter().lat(),
				lng: this.state.map.getCenter().lng()
			},
			mapPosition: {
				lat: this.state.map.getCenter().lat(),
				lng: this.state.map.getCenter().lng()
			},
			markers1:markers1,
			zoom:this.state.map.getZoom(),
			moving:true	
		})
	}
	insideBound = (shops,center)=>{
		if (center!=null&&shops!=null){
			var result = []
			shops.map((shop)=>{
				if (shop.lat>center.lat-0.3 && shop.lat<center.lat+0.3 && shop.lng>center.lng-0.3 && shop.lng<center.lng+0.3){
					result.push(shop)}	
			})
			console.log(result,"lets look center",center,shops)	
			this.props.markersInBound(result)		
			return result			
		}else{return []}		
	}
	insideBound_bound = (shops,bound)=>{
		if (bound!=null&&shops!=null){
			var result = []	
			shops.map((shop)=>{
				if (shop.lat>bound.na.j && shop.lat<bound.na.l && shop.lng>bound.ia.j && shop.lng<bound.ia.l){
					result.push(shop)}	
			})
			console.log(result,"lets look bound",bound,shops)		
			this.props.markersInBound(result)		
			return result			
		}else{return []}
	}
	markerSelected =(markerObject)=>{
		this.props.markerSelected(markerObject)
	}
	
	render() {
	console.log(this.state,"rendering state")
	console.log(this.props,"rendering props")
	
	const AsyncMap = withScriptjs(
		withGoogleMap(
			props => (
				<GoogleMap 
				ref = {this.maploaded}
				zoom={this.state.zoom}
				defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
				center={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
				onDragEnd={this.mapmoved}
				onZoomChanged = {this.onZoom}
				>
					<Autocomplete
						style={{
						width: '200%',
						height: '40px',
						paddingLeft: '16px',
						margin:"2px auto 20px auto",
						}}
						onPlaceSelected={ this.onPlaceSelected }
						types={['(regions)']}
						placeholder={"Enter and select location"}
					/>
					<Marker 
						draggable={true}
						onDragEnd = {this.onMarkerDragEnd}
						position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
					/>
					<MarkerShop
						markers1={this.state.markers1}
						markerSelected = {this.markerSelected}
						shopSelected = {this.props.shopSelected}/>
				</GoogleMap>
			)
		)
	)
	let map
	map =  <div style={{width:"100%"}} >
			<AsyncMap
				googleMapURL= "https://maps.googleapis.com/maps/api/js?key=AIzaSyBiffp6dvrIk_EWQHzXk05VzFKb5tioZeI&libraries=places"
				loadingElement={
				 <div style={{ height: `100%` }} />
				}
				containerElement={
				 <div style={{ height: this.props.height,
  								display: "flex",
  								flexDirection: "column-reverse"}} />
				}
				mapElement={
				 <div style={{ height: `100%` }} />
				}

				/>
			</div>
	return (
		<React.Fragment>
			{map}
		</React.Fragment> 
	)
  }
}

MapAddShop.propTypes = {
	getItems:PropTypes.func.isRequired,
	item:PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
	item:state.item
})

export default connect(mapStateToProps,{getItems})(MapAddShop)