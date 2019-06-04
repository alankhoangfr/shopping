import React, {Component} from "react"
import { ListGroup, ListGroupItem,ListGroupItemText,ListGroupItemHeading} from 'reactstrap';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import {connect} from "react-redux"
import {deleteSuperMarket,changeMarkerSelected,getSuperMarkets} from "../../actions/SuperMarketActions"
import PropTypes from "prop-types"
import cancel from "../../image/cancel.png"

export class InfoAreaAddShop extends Component {
	constructor(props){
		super(props)
		this.state={
			markerHighlighted:"",
			activeTab: '1',
		}
	}

	shouldComponentUpdate(nextProps,nextState){
		if(this.props!==nextProps){
			return true
		}else if(this.state!==nextState){
			return true
		}
		else {return false}
	}

	componentDidUpdate(prevProps,prevState){
		if(this.props.superMarket.markerSelected!==prevProps.superMarket.markerSelected&&this.props.superMarket.markers===prevProps.superMarket.markers){		
			this.toggle('1')
			this.setState({
				markerHighlighted:this.props.superMarket.markerSelected.id})
		}if(this.props.markerHighlighted!==prevProps.markerHighlighted){
			this.setState({
				markerHighlighted:this.props.markerHighlighted.id
			})
		}
	}
		toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  	}
	onclickMarker = (marker,event) =>{
		this.setState({markerHighlighted:marker.id})
	}
	onDoubleClick = (markerObject)=>{
		this.props.changeMarkerSelected(markerObject)
		this.toggle('2')

	}
	markersInBound = (markers)=>{
		return markers.map((marker)=>{
			let active = ""
			if (marker.id===this.state.markerHighlighted){
				active = "success"
			}
			return(
				<ListGroupItem 
				onClick={this.onclickMarker.bind(this,marker)}  
				key={marker.id}  
				color={active}
				onDoubleClick = {this.onDoubleClick.bind(this,marker)}>
					<ListGroupItemHeading>
						{marker.name}
						<img src={cancel} align="right" width="16px" onClick={this.cancel.bind(this,marker)}/>
					</ListGroupItemHeading>
					<ListGroupItemText>
						{marker.address}
					</ListGroupItemText>
					<ListGroupItemText>
						{marker.score}
					</ListGroupItemText>
				</ListGroupItem>
				)
		})
	}
	focusOnMarker = (marker)=>{
		return(
			<ListGroupItem >
				<ListGroupItemHeading>
					{marker.name}
					<img src={cancel} align="right" width="16px" onClick={this.cancel.bind(this,marker)}/>
				</ListGroupItemHeading>
				<ListGroupItemText>
					{marker.address}
				</ListGroupItemText>
				<ListGroupItemText>
					{marker.score}
				</ListGroupItemText>
				<ListGroupItemText>
					{marker.details}
				</ListGroupItemText>
			</ListGroupItem>

			)
	}
	centerMarker=()=>{
		this.props.centerMarker(true)
	}
	cancel=(marker)=>{
		this.props.deleteSuperMarket(marker)
	}
	render() {
	let infoall =  
				<div style={{border:"1px solid black", height:"400px", overflowY: "scroll"}}>
					<div >
						<h2> Stores in the area </h2>
					</div>
					<ListGroup>
						{this.markersInBound(this.props.markersInBound)}
					</ListGroup>
				</div>
	let infoFocus =
				<div style={{border:"1px solid black", height:"400px", overflowY: "scroll"}}>
					{this.props.superMarket.markerSelected!==null?this.focusOnMarker(this.props.superMarket.markerSelected):null}
				</div>
	return (
		<React.Fragment>
			<div style={{height: '62px'}}>
			</div>
			 <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              All the Shops in the Area
            </NavLink>
          </NavItem>
          {this.props.superMarket.markerSelected!==null?<NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Focus
            </NavLink>
          </NavItem>:null}
          <NavItem>
            <NavLink
              onClick={this.centerMarker}
            >
              Center the Marker
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
                {infoall}
          </TabPane>
          <TabPane tabId="2">         
                  {infoFocus}
          </TabPane>
        </TabContent>
      </div>
		
		</React.Fragment>	
)
  }
}

InfoAreaAddShop.propTypes = {
	getSuperMarkets:PropTypes.func.isRequired,
	deleteSuperMarket:PropTypes.func.isRequired,
	changeMarkerSelected:PropTypes.func.isRequired,	
}

const mapStateToProps = (state)=>({
	superMarket:state.superMarket
})

export default connect(mapStateToProps,{deleteSuperMarket,changeMarkerSelected,getSuperMarkets})(InfoAreaAddShop)

