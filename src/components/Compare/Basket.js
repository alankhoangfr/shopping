import React, {Component} from "react"
import {CardText,Table,CardTitle,CardSubtitle,Card,Container, Row,Col,CardImg,CardBody,Modal,ModalHeader} from 'reactstrap';
import CBasket from "../../image/CBasket.png"
import {getSuperMarkets,deleteItemFromBasket,addItemToBasket} from "../../actions/SuperMarketActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"

export class Basket extends Component{
	constructor(props){
		super(props)
		this.state={
			modal: false,
		}
	}
	componentDidMount(){
        this.props.getSuperMarkets()
    }
	shouldComponenntUpdate(nextProps,nextState){
		if(this.props.itemOnDrag!==nextProps.itemOnDrag){
			return true
		}
	}
	toggle=()=> {
    this.setState({ modal: false });
 	}
	ondragover=(event)=>{
		event.preventDefault()
	}
	ondragenter=(event)=>{
		if(event.target.className==="cardBasket"){
			document.getElementById("cardBasket").style.opacity = "0.4"	
			document.getElementById("cardBasket").style.backgroundColor = "green"	
		}
	}
	ondrop=(event)=>{
		event.preventDefault();
		console.log("onDrop",event.target,this.props.itemOnDrag.quantity)
		if(event.target.className==="cardBasket"){
			if(this.props.itemOnDrag.quantity!==""){
				document.getElementById("cardBasket").style.opacity="1"
				document.getElementById("cardBasket").style.backgroundColor="inherit"
				this.props.addItemToBasket(this.props.itemOnDrag)
			}
			else{
				document.getElementById("cardBasket").style.opacity = "0.4"	
				document.getElementById("cardBasket").style.backgroundColor = "red"	
				this.setState({modal:true})
			}
			
		}
		
	}
	ondragleave=(event)=>{
		if(event.target.id==="cardBasket"){
			event.target.style.opacity="1"
			event.target.style.backgroundColor="inherit"
		}
	}
	render(){
		return (
			<React.Fragment>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          			<ModalHeader toggle={this.toggle}>How many do you want to buy?</ModalHeader>
        		</Modal>
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


Basket.propTypes = {
    getSuperMarkets:PropTypes.func.isRequired,
    superMarket:PropTypes.object.isRequired,
    deleteItemFromBasket:PropTypes.func.isRequired,
    addItemToBasket:PropTypes.func.isRequired,
}
const mapStateToProps = (state)=>({
    superMarket:state.superMarket
})

export default connect(mapStateToProps,{getSuperMarkets,deleteItemFromBasket,addItemToBasket}) (Basket)

