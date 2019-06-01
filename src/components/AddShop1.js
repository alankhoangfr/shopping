import React, {Component} from 'react';
import { Container, Row,Col,Alert  } from 'reactstrap';
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
        markers:[],
        visible: false,
        visibleDetails: false,
    }
    onDismiss= () =>{
    this.setState({ visible: false });
      }
    openAlert= () =>{
    this.setState({ visible: true });
      }
    onDismissDetails= () =>{
    this.setState({ visibleDetails: false });
      }
    openAlertDetails= () =>{
    this.setState({ visibleDetails: true });
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

    })
    }
    markerInfoFromAddress = (newMarkerObject)=>{
        console.log("new info added")
    this.setState({
        markerInfo:newMarkerObject,
        shopSelected:newMarkerObject,
        markerHighlighted:newMarkerObject,
        mapPosition:{
            lat:newMarkerObject.lat,
            lng:newMarkerObject.lng
            },
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
                <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                    You already have added a supermaket with the same address and name!
                </Alert>
                <Alert color="danger" isOpen={this.state.visibleDetails} toggle={this.onDismissDetails}>
                    Please enter the details correctly
                </Alert>
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
                            markerSelected = {this.markerSelected}
                            markersInBound = {this.markersInBound}
                            shopSelected = {this.state.shopSelected}      
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
                                markerHighlighted={this.state.markerHighlighted}
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
                                openAlert = {this.openAlert}  
                                openAlertDetails = {this.openAlertDetails} 
                                />
                        </Col>
                    </Row>
                </Container>

            </div>



    );
    }

    }

export default AddShop1;


