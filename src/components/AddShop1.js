import React, {Component} from 'react';
import { Container, Row,Col,Alert  } from 'reactstrap';
import InfoShop from "./AddShop/InfoShop"
import InfoAreaAddShop from "./AddShop/InfoAreaAddShop"
import MapAddShop from "./AddShop/MapAddShop"
import {connect} from "react-redux"
import {getSuperMarkets,changeMarkerSelected} from "../actions/SuperMarketActions"
import PropTypes from "prop-types"

class AddShop1 extends Component {
    state ={
        markerHighlighted:"",
        markersInBound:[],
        markerPosition:{
            lat:-33.865143,
            lng: 151.209900
                },
        markerInfo:"",
        mapPosition:{
            lat:-33.865143,
                lng: 151.209900
            },
        markers:[],
        centerMarker:false,
    }
    componentDidMount(){
        this.props.getSuperMarkets()
    }
    markersInBound = (markers)=>{
      this.setState({markersInBound:markers})
    }
    markerPosition=(center)=>{
    this.setState({markerPosition:center})
    }
    markerInfoMap  = (newMarkerObject)=>{
    this.setState({
        markerInfo:newMarkerObject,

    })
    }
    markerInfoFromAddress = (newMarkerObject)=>{
    this.setState({
        markerInfo:newMarkerObject,
        shopSelected:newMarkerObject,
        markerHighlighted:newMarkerObject,
        mapPosition:{
            lat:newMarkerObject.lat,
            lng:newMarkerObject.lng
            },
    })
    this.props.changeMarkerSelected(newMarkerObject)
    }
    mapPosition  = (center)=>{
    this.setState({mapPosition:center})
    }

    centerMarker=()=>{
       this.setState({centerMarker:!this.state.centerMarker})
    }

    render(){
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
                              <MapAddShop
                            center={{lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng}}
                            height='500px'
                            zoom={8}
                            markerInfo = {this.state.markerInfo}
                            markersInBound = {this.markersInBound}
                            markerInfoMap={this.markerInfoMap}
                            mapCoord = {this.mapPosition}
                            markCoord = {this.markerPosition}
                            centerMarker={this.state.centerMarker}
                            />
                        </Col>
                        <Col sm={6}>
                            <InfoAreaAddShop
                                markersInBound  ={this.state.markersInBound}
                                markerHighlighted={this.state.markerHighlighted}
                                centerMarker = {this.centerMarker}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <div className="title" style={{marginTop:"30px"}}>
                            <h1>
                                Enter the Details or move the Marker
                            </h1>  
                        </div>
                        <Col sm={12}>
                            <InfoShop
                                markerPosition={this.markerPosition}
                                markerInfo = {this.state.markerInfo}
                                mapPosition ={this.mapPosition}
                                markerInfoFromAddress = {this.markerInfoFromAddress}  
                                />
                        </Col>
                    </Row>
                </Container>

            </div>



    );
    }

    }
AddShop1.propTypes = {
    getSuperMarkets:PropTypes.func.isRequired,
    superMarket:PropTypes.object.isRequired,
    changeMarkerSelected:PropTypes.func.isRequired    
}

const mapStateToProps = (state)=>({
    superMarket:state.superMarket
})

export default connect(mapStateToProps,{getSuperMarkets,changeMarkerSelected})(AddShop1)