import React from 'react';
import {Button } from 'reactstrap';
import {addItemToShop,getSuperMarkets} from "../../actions/SuperMarketActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import grocery_sampleJSON from "../../Data/grocery_sampleJSON.json"
import moment from "moment"

const source = grocery_sampleJSON

export class GenerateData extends React.Component {
    constructor(props){
        super(props)
        this.state={
            visible:true,
             
         }
     }

     componentDidMount(){
		this.props.getSuperMarkets()
	}
    shouldComponentUpdate(nextProps,nextState){
        console.log(nextProps,this.props,this.state)
        if(this.props.superMarket.markers!==nextProps.superMarket.markers){
            return true
        }else if(this.state!==nextState){
            return true
        }
        else{
            return false
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.superMarket.markers!==this.props.superMarket.markers){
            this.setState({visible:true})
        }
    }
    randomShuffle=(array)=>{
        for(var i = array.length-1;i>0;i--){
            var j = Math.floor(Math.random()*(i+1))
            var temp = array[i]
            array[i]=array[j]
            array[j]=temp
        }
        var numberOfItems = Math.floor(Math.random()*array.length)
        return array.slice(0,numberOfItems)

    }
	onClick=(event)=>{
        this.props.superMarket.markers.map((mark)=>{
            let shoppingItems = {}
            var randomSource = this.randomShuffle(source)
            randomSource.forEach((item)=>{
            let eachItem = {
                item_id:item.item_id,
                brand_name:item.brand_name,    
                price:(Math.random()*(20)+0.5).toFixed(2),
                timeStamp:moment().format(),
                superMarket_id:mark.id,
                date:moment().format("ddd Do MMM YY")
            }
            shoppingItems[item.item_id]=eachItem
            this.props.addItemToShop(eachItem)    
            })
        })
        this.setState({visible:false})
	}
    render() {
    	
	return (
        <React.Fragment>
           {this.state.visible===true?<Button onClick = {this.onClick} >Generate random Item Data for all shops</Button>:null}
         </React.Fragment>
		);
	}
}

GenerateData.propTypes = {
	addItemToShop:PropTypes.func.isRequired,
	getSuperMarkets:PropTypes.func.isRequired,
	superMarket:PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
	superMarket:state.superMarket

})

export default connect(mapStateToProps,{getSuperMarkets,addItemToShop})(GenerateData)