import React, {Component} from "react"
import {CardText,Table,CardTitle,CardSubtitle,Card,Container, Row,Col,CardImg,CardBody} from 'reactstrap';
import CBasket from "../../image/CBasket.png"


export class Basket extends Component{
	constructor(props){
		super(props)
		this.state={
			basket:[],
			itemOnDrag:"",			

		}
	}
	shouldComponenntUpdate(nextProps,nextState){
		if(this.props.itemOnDrag!==nextProps.itemOnDrag){
			return true
		}
	}
	componentDidUpdate(prevProps,prevState){
		if(this.props.itemOnDrag!==prevProps.itemOnDrag){
			this.setState({itemOnDrag:this.props.itemOnDrag})
		}
	}
	ondragover=(event)=>{
		console.log("dragover")
		event.preventDefault()
	}
	ondragenter=(event)=>{
		console.log("drag enter",event.target)
		if(event.target.className==="cardBasket"){
			document.getElementById("cardBasket").style.opacity = "0.4"	
			document.getElementById("cardBasket").style.backgroundColor = "green"	
		}
	}
	ondrop=(event)=>{
		event.preventDefault();
		console.log("onDrop",event.target)
		if(event.target.className==="cardBasket"){
			console.log("onDropasdf")
			document.getElementById("cardBasket").style.opacity="1"
			document.getElementById("cardBasket").style.backgroundColor="inherit"
			this.setState({basket:[...this.state.basket,this.state.itemOnDrag]})
			this.props.basket([...this.state.basket,this.state.itemOnDrag])
		}
		
	}
	ondragleave=(event)=>{
		if(event.target.id==="cardBasket"){
			event.target.style.opacity="1"
			event.target.style.backgroundColor="inherit"
		}
		console.log("onDragLeave")
	}
	render(){
		console.log(this.state)
		return (
			<React.Fragment>
				<Card body className="text-center cardBasket" id="cardBasket" 
					onDragOver = {this.ondragover}
					onDrop = {this.ondrop} 
				    onDragEnter = {this.ondragenter}
				    onDragLeave ={this.ondragleave}
				    style={{zIndex:"-1"}}>
					<CardTitle className="cardBasket" >Drag the Item to Add to the basket</CardTitle>
					<CardBody className="cardBasket">
						<img width="50%" src={CBasket} alt="Card image cap" style={{margin:"auto"}} className="cardBasket" />
					</CardBody>
				</Card>
			</React.Fragment>
			)
	}
}

export default Basket