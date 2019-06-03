import React from 'react';
import {deleteAllBasket,getSuperMarkets} from "../../actions/SuperMarketActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle,Form, FormGroup, Label, Input,Col,Button } from 'reactstrap';
import bin from "../../image/bin.png"

export class RemoveAllBasket extends React.Component {
     componentDidMount(){
		this.props.getSuperMarkets()
	}
   
	onClick=(event)=>{
        this.props.deleteAllBasket()
	}
    render() {
    	
	return (
        this.props.superMarket.basket.length>0? 
            <Card body className="text-center cardBasket" id="cardBasket" >
                <CardTitle className="cardBasket" >Remove All Items from the Basket</CardTitle>
                <CardBody className="cardBasket">
                    <img width="50%" src={bin} onClick = {this.onClick} alt="Card image cap" style={{margin:"auto"}} className="cardBasket" />
                </CardBody>
            </Card>:null
		)
	}
}

RemoveAllBasket.propTypes = {
	deleteAllBasket:PropTypes.func.isRequired,
	getSuperMarkets:PropTypes.func.isRequired,
	superMarket:PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
	superMarket:state.superMarket

})

export default connect(mapStateToProps,{getSuperMarkets,deleteAllBasket})(RemoveAllBasket)