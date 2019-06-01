import React, {Component} from "react"
import { ListGroup, ListGroupItem,ListGroupItemText,ListGroupItemHeading} from 'reactstrap';
import add from "../../image/add.png"

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
	onclickMarker = (markerObject,event) =>{
		console.log(markerObject)
		this.setState({markerHighlighted:markerObject.id})
	}
	onDoubleClick = (markerObject)=>{
		this.setState({markerSelected:markerObject})
		this.props.shopSelected(markerObject)

	}
	onClickAdd=(markerObject,event)=>{
		this.props.shopSelectedCompare(markerObject	)
		console.log("click add")
	}
	markersInBound = (markers)=>{
		return markers.map((markerObject)=>{
			let active = ""
			if (markerObject.id===this.state.markerHighlighted){
				active = "success"
			}
			return(
				<ListGroupItem 
				onClick={this.onclickMarker.bind(this,markerObject)}  
				key={markerObject.id}  
				color={active}
				onDoubleClick = {this.onDoubleClick.bind(this,markerObject)}>
					<ListGroupItemHeading>
						{markerObject.name}
					</ListGroupItemHeading>
					<ListGroupItemText>
						{markerObject.address}
						{this.props.compareBasket===true?<img src={add} onClick={this.onClickAdd.bind(this,markerObject)} align="right"/>:null}
					</ListGroupItemText>
					<ListGroupItemText>
						{markerObject.score}
					</ListGroupItemText>
				</ListGroupItem>
				)
		})
	}
	focusOnMarker = (markerObject)=>{
		return(
			<ListGroupItem >
				<ListGroupItemHeading>
					{markerObject.name}
				</ListGroupItemHeading>
				<ListGroupItemText>
					{markerObject.address}
					{this.props.compareBasket===true?<img src={add} align="right" onClick={this.onClickAdd.bind(this,markerObject)}/>:null}
				</ListGroupItemText>
				<ListGroupItemText>
					{markerObject.score}
				</ListGroupItemText>
				<ListGroupItemText>
					{markerObject.details}
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

