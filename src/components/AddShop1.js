import React, {Component} from 'react';
import { Container, Row,Col } from 'reactstrap';
import InfoShop from "./AddShop/InfoShop"
import InfoAreaAddShop from "./AddShop/InfoAreaAddShop"
import MapAddShop from "./AddShop/MapAddShop"

class AddShop1 extends Component {
    state ={
        markerSelected :"",
        markerHighlighted:"",
        markersInBound:[],
        shopSelected:"",
        markerPosition:{
            lat:-33.865143,
            lng: 151.209900
                },
        markerInfo:"",
        mapPosition:{
            lat:-33.865143,
                lng: 151.209900
            },
        markers:[]
    }
    markerSelected=(markerObject)=>{
      this.setState({markerSelected:markerObject})  }
    markersInBound = (markers)=>{
      this.setState({markersInBound:markers})
    }
    shopSelected = (markerObject)=>{
      this.setState({shopSelected:markerObject})
    }
    markerPosition=(center)=>{
    this.setState({markerPosition:center})
    }
    markerInfoMap  = (newMarkerObject)=>{
        console.log("new info added")
    this.setState({
        markerInfo:newMarkerObject,
        shopSelected:newMarkerObject,
        markerSelected:newMarkerObject,
    })
    }
    markerInfoFromAddress          = (newMarkerObject)=>{
        console.log("new info added")
    this.setState({
        markerInfo:newMarkerObject,
        shopSelected:newMarkerObject,
        markerHighlighted:newMarkerObject,
    })
    }
    mapPosition  = (center)=>{
    this.setState({mapPosition:center})
    }
    markers = (markers)=>{
        this.setState({markers:markers})
    }


    render(){

      console.log(this.state,"AddShop1")
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
                            center={{lat: -33.78, lng: 151.2}}
                            height='500px'
                            zoom={8}
                            markerSelected = {this.markerSelected}
                            markersInBound = {this.markersInBound}
                            shopSelected = {this.state.shopSelected}
                            markerHighlighted={this.state.markerHighlighted}
                            markerInfoMap={this.markerInfoMap}
                            mapCoord = {this.mapPosition}
                            markCoord = {this.markerPosition}
                            markers = {this.markers}
                            
                            />
                        </Col>
                        <Col sm={6}>
                            <InfoAreaAddShop
                                markerSelected  ={this.state.markerSelected}
                                markersInBound  ={this.state.markersInBound}
                                shopSelected = {this.shopSelected}
                                markers ={this.state.markers}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <InfoShop
                                markerPosition={this.markerPosition}
                                markerInfo = {this.state.markerInfo}
                                mapPosition ={this.mapPosition}
                                markerInfoFromAddress = {this.markerInfoFromAddress}
                                />
                    </Row>
                </Container>
            </div>



    );
    }

    }

export default AddShop1;


