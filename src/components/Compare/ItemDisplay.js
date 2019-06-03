import React from 'react';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle,Form, FormGroup, Label, Input,Col,Button } from 'reactstrap';
import SearchBoxCompare from "./SearchBoxCompare"
import grocery_sampleJSON from "../../Data/grocery_sampleJSON.json"
import {getSuperMarkets,deleteItemFromBasket,addItemToBasket} from "../../actions/SuperMarketActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"


export class ItemDisplay extends React.Component {
    constructor(props){
        super(props)
        this.state={
             result:"",
             quantity:"",
             emptySearchBox:false,
             space:[],
         }
     }
    componentDidMount(){
        this.props.getSuperMarkets()
    }
    shouldComponentUpdate(nextState,nextProps){
        console.log(nextState,nextProps,"ItemDisplay should component update")
         if(this.state.result!==nextState.result){
             return true
         }
         if(this.props.supermarket_selected!==nextProps.supermarket_selected	){
			return true
		}if(this.props.space!==nextProps.space){
            return true
        }
    }
    componentDidUpdate(prevProps){
    	if(prevProps.supermarket_selected!==this.props.supermarket_selected	){
    		this.setState({result:""})
    	}if(prevProps.space!==this.props.space){
            this.setState({space:this.props.space})
        }
    }
   
	result = (result)=>{
    	this.setState({result:result})
	}

	onStartDrag=(resultInfo,event)=>{
		const info = {
            ...this.state.result,
            quantity:this.state.quantity
        }
		this.props.itemOnDrag(info)
	}
    onChange=(event)=>{
        this.setState({
            quantity:event.target.value,
            emptySearchBox:true,})
    }
    onSubmit=(event)=>{
        event.preventDefault()
        const info = {
            ...this.state.result,
            quantity:this.state.quantity
        }
        this.setState({
            quantity:"",
            result:"",
            emptySearchBox:true})
        this.props.addItemToBasket(info)
    }
    notEmptySearchBox=()=>{
        this.setState({emptySearchBox:false})
    }
    render() {
    	const {result,price}=this.state
    	let cardImage = <CardImg top width="100%" src={this.state.result.image} alt="Card image cap"
             		style={{maxWidth:"150px",maxHeight:"150px",margin:"auto"}}/>
        if(this.state.result.image===null){
        	cardImage=
        	    <CardBody className="text-center"> 
        	    	<CardText>Be the first to upload a photo</CardText>
        			<Input type="file" name="file" id="exampleFile"  style={{width:"60%",margin:"auto"}}/>
        		</CardBody>
        }		
         let card = 
            <Card style={{marginTop:"20px"}} draggable={true} onDragStart={this.onStartDrag}>
                <CardBody className="text-center">
                    <CardTitle>{this.state.result.brand_name}</CardTitle>
                    <CardSubtitle>{this.state.result.description}</CardSubtitle>        
                </CardBody>
                   {cardImage}
                <CardBody>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup row className="text-center">
                            <Col sm={10}>
                                <Input type="number" name="quantity" id="quantity" placeholder="quantity" onChange={this.onChange} required min="1" step="1"/>
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10}}>
                                <Button>Add to the Basket</Button>
                             </Col>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
    			if (this.state.result===""){
       				card=null
    			}
	return (
    	<div>
    		<h1 style={{marginTop:"20px"}}>Search an item</h1>
        	<SearchBoxCompare
            	result = {this.result}
            	supermarket_selected={this.props.supermarket_selected}
                emptySearchBox={this.state.emptySearchBox}
                notEmptySearchBox={this.notEmptySearchBox}
                space={this.state.space}/>
        	{card}
    	</div>
   
		);
	}
}


ItemDisplay.propTypes = {
    getSuperMarkets:PropTypes.func.isRequired,
    superMarket:PropTypes.object.isRequired,
    deleteItemFromBasket:PropTypes.func.isRequired,
    addItemToBasket:PropTypes.func.isRequired,
}
const mapStateToProps = (state)=>({
    superMarket:state.superMarket
})

export default connect(mapStateToProps,{getSuperMarkets,deleteItemFromBasket,addItemToBasket}) (ItemDisplay)

