import React, {Component} from "react"
import { ListGroup, ListGroupItem,ListGroupItemText,ListGroupItemHeading} from 'reactstrap';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import {connect} from "react-redux"
import {deleteSuperMarket} from "../../actions/SuperMarketActions"
import PropTypes from "prop-types"
import cancel from "../../image/cancel.png"

export class InfoAreaAddShop extends Component {
	constructor(props){
		super(props)
		this.state={
			markerHighlighted:"",
			markerSelected:this.props.markerSelected,
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
		if(this.props.markerSelected!==prevProps.markerSelected){
			this.toggle('2')
			this.setState({
				markerSelected:this.props.markerSelected,
				markerHighlighted:""})
		}if (this.props.markers!==prevProps.markers){
			this.setState({
				markerSelected:"",
				markerHighlighted:this.props.markerSelected.id
			})
		}if(this.props.markerHighlighted!==prevProps.markerHighlighted){
			this.setState({
				markerSelected:"",
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
		console.log(marker)
		this.setState({markerHighlighted:marker.id})
	}
	onDoubleClick = (markerObject)=>{
		this.setState({markerSelected:markerObject})
		this.props.shopSelected(markerObject)
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
	console.log(this.props,this.state)
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
					{this.focusOnMarker(this.state.markerSelected)}
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
          {this.state.markerSelected!==""?<NavItem>
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
	deleteSuperMarket:PropTypes.func.isRequired,

}

const mapStateToProps = (state)=>({
	superMarket:state.superMarket
})

export default connect(mapStateToProps,{deleteSuperMarket})(InfoAreaAddShop)

