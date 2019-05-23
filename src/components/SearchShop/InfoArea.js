import React, {Component} from "react"
import { ListGroup, ListGroupItem,ListGroupItemText,ListGroupItemHeading} from 'reactstrap';


export class InfoArea extends Component {
	constructor(props){
		super(props)
		this.state={
			markerHighlighted:"",
			markerSelected:this.props.markerSelected
		}
	}
	componentDidUpdate(prevProps){
		if(this.props.markerSelected!==prevProps.markerSelected){
			this.setState({
				markerSelected:this.props.markerSelected,
				markerHighlighted:""})
		}
	}
	onclickMarker = (marker,event) =>{
		console.log(marker)
		this.setState({markerHighlighted:marker.id})
	}
	onDoubleClick = (marker)=>{
		this.setState({markerSelected:marker})
		this.props.shopSelected(marker)

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
	render() {
	console.log(this.props,this.state)
	let info
	let infoall =  
				<div style={{border:"1px solid black", height:"438px", overflowY: "scroll"}}>
					<div >
						<h2> Stores in the area </h2>
					</div>
					<ListGroup>
						{this.markersInBound(this.props.markersInBound)}
					</ListGroup>
				</div>
	let infoFocus =
				<div style={{border:"1px solid black", height:"438px", overflowY: "scroll"}}>
					{this.focusOnMarker(this.state.markerSelected)}
				</div>
				
	if (this.state.markerSelected===""){
		info = infoall
	}else if(this.state.markerSelected!==""){
		info = 	infoFocus
	}		
	
	return (
		<React.Fragment>
		<div style={{height: '62px'}}>
		</div>
			{info}
		</React.Fragment>	
)
  }
}

export default InfoArea

