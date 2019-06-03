import React, {Component} from "react"
import {CardText,Table,CardTitle,CardSubtitle,Card,Container, Row,Col,CardImg,CardBody,Alert, Modal, ModalHeader, ModalBody, ModalFooter,Button } from 'reactstrap';
import {getSuperMarkets,deleteItemFromBasket,addItemToBasket} from "../../actions/SuperMarketActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import cancel from "../../image/cancel.png"

export class CardShops extends Component{
	constructor(props){
		super(props)
		this.state={
			space1:"",
			space2:"",
			space3:"",
			modal: false,
			modalAdd:false,
			modalAddItem:false,
			notInShop:[],
			
		}
	}
	componentDidMount(){
		this.props.getSuperMarkets()
	}
	shouldComponenntUpdate(nextProps,nextState){
		const {nspace1,nspace2,nspace3} = nextState
		const {space1,space2,space3} = this.state
		const spaces =[space1,space2,space3]
		const nspaces =[nspace1,nspace2,nspace3]
		console.log("cardshop ShouldComponentUpdate",nextProps)
		if(this.props.shopSelectedCompare!==nextProps.shopSelectedCompare){
			return true
		}if(nspaces!==spaces){
			return true
		}if(this.props.superMarket.basket!==nextProps.superMarket.basket){
			return true
		}
	}
	componentDidUpdate(prevProps,prevState){
		const {pspace1,pspace2,pspace3} = prevState
		const {space1,space2,space3} = this.state
		const spaces =[space1,space2,space3]
		const pspaces =[pspace1,pspace2,pspace3]
		const numberOfNon = spaces.filter((s,index)=>
			s!==""
		)
		if(this.props.shopSelectedCompare===""){
			return null
		}
		if(this.props.shopSelectedCompare!==prevProps.shopSelectedCompare){
			this.shopSelectedCompare(this.props.shopSelectedCompare)
			
		}if(pspaces!==spaces){
			if(numberOfNon.length===0){
				this.props.allSpace({nonVisible:true,space:numberOfNon})
			}else{
				this.props.allSpace({nonVisible:false,space:numberOfNon})
			}
		}
	}
	shopSelectedCompare=(markerObject)=>{
		const {space1,space2,space3} = this.state
		const basket = this.props.superMarket.basket
		if(this.props.superMarket[markerObject.id].item===undefined){
			this.setState({modalAddItem:true})
		}else{
			if (space1===""&&space2===""&&space3===""){
			this.setState({space1:this.props.superMarket[markerObject.id]})
			}else if(space2===""&&space3===""){
				if(space1.id!==markerObject.id){
					if(basket.length===0){
						this.setState({space2:this.props.superMarket[markerObject.id]})
					}else{
						var count = 0
						var notInShop=[]
						var itemInShop = Object.keys(this.props.superMarket[markerObject.id].item)
						for(var i =0;i<basket.length;i++){
							var itemInBasket = basket[i]
							console.log(itemInBasket)
							if(itemInShop.indexOf(itemInBasket.item_id)>=0)
								{count++}
							else if(itemInShop.indexOf(itemInBasket.item_id)===-1)
								{notInShop.push(itemInBasket.title)}
						}if(count!==basket.length){
							console.log("modalAdd",count,basket,itemInShop)
							console.log(notInShop)
							this.setState({
								modalAdd:true,
								notInShop:notInShop})
						}else{
							this.setState({space2:this.props.superMarket[markerObject.id]})
						}
					}
				}
			}else if(space3===""){
				const insideTheSpace = [space1.id,space2.id]
				if (insideTheSpace.indexOf(markerObject.id)===-1){
					if(basket.length===0){
						this.setState({space3:this.props.superMarket[markerObject.id]})
					}else{
						var count = 0
						var notInShop=[]
						var itemInShop = Object.keys(this.props.superMarket[markerObject.id].item)
						for(var i =0;i<basket.length;i++){
							var itemInBasket = basket[i]
							console.log(itemInBasket)
							if(itemInShop.indexOf(itemInBasket.item_id)>=0)
								{count++}
							else if(itemInShop.indexOf(itemInBasket.item_id)===-1)
								{notInShop.push(itemInBasket.title)}
						}if(count!==basket.length){
							console.log("modalAdd",count,basket,itemInShop)
							console.log(notInShop)
							this.setState({
								modalAdd:true,
								notInShop:notInShop})
						}else{
							this.setState({space3:this.props.superMarket[markerObject.id]})
						}
					}
				}		
			}else{
				this.setState({modal:true})
			}
		}	
	}
	cancel=(event)=>{
		const {space1,space2,space3} = this.state
		const spaces =[space1,space2,space3]
		const spaces_text = ["space1","space2","space3"]
		const numberOfNon = spaces.filter((s,index)=>
			spaces_text[index]!==event.target.id && s!==""
		)
		var i = 0
		while(true){
			if(i>spaces.length-1){
				break
			}else{
				if(spaces_text[i]===event.target.id){
					break
				}
				else if(spaces[i]!==""){

					i++ 
				}else{
					break
				}
			}
		}
		console.log("cancel",numberOfNon.length,i)
		if(numberOfNon.length!==i){
			console.log("reorder")
			for(var i=0; i<numberOfNon.length;i++){
				console.log(spaces_text[i],"good")
				this.setState({[spaces_text[i]]:numberOfNon[i]})
			}for(var i=numberOfNon.length; i<spaces.length;i++){
				this.setState({[spaces_text[i]]:""})
			}
		}else{
			this.setState({[event.target.id]:""})
		}
		if(numberOfNon.length===0){
			this.props.allSpace({nonVisible:true,space:numberOfNon})
		}else{
			this.props.allSpace({nonVisible:false,space:numberOfNon})
		}
		this.props.cancelCardSpace()
	}
	totalBasket = (basket,space)=>{
		var total = []
		basket.map((eachItem)=>{
			const priceOfItem = space.item[eachItem.item_id].price
			const totalPrice = (parseFloat(eachItem.quantity)*parseFloat(priceOfItem)).toFixed(2)
			total.push(totalPrice)
		})
		const finalResult = total.reduce((a,b)=>parseFloat(a)+parseFloat(b),0)
		return parseFloat(finalResult).toFixed(2)
	}
	toggle=()=> {
    this.setState({ modal: false });
 	}
 	toggleAdd=()=> {
    this.setState({ modalAdd: false });
 	}
 	toggleAddItem=()=> {
    this.setState({ modalAddItem: false });
 	}
 	cancelItem=(eachItem)=>{
 		this.props.deleteItemFromBasket(eachItem)
 		this.props.cancelCardSpace()
 	}
	render(){
		console.log("cardShop",this.state,this.props)
		var cardComparsion=(space,id) => ( 
			<Card body className="text-center" >
				<CardTitle>
					{space.name} 
					<img src={cancel} align="right" width="16px" onClick={this.cancel} id={id}/>
				</CardTitle>
				<CardSubtitle>{space.completeAddress}</CardSubtitle>
				<Table borderless hover responsive>
			        <thead>
			          <tr>
			            <th style={{fontSize:"x-small", width:"8px"}}></th>
			          	<th style={{fontSize:"x-small"}}>Quantity</th>
			            <th style={{fontSize:"x-small"}}>Product</th>
			            <th style={{fontSize:"x-small"}}>Unit</th>
			            <th style={{fontSize:"x-small"}}>Total</th>
			          </tr>
			        </thead>
			        <tbody>
			        	{this.props.superMarket.basket.map((eachItem)=>{
			        		const priceOfItem = space.item[eachItem.item_id].price
			        		const total = (parseFloat(eachItem.quantity)*parseFloat(priceOfItem)).toFixed(2)
			        		return(
			        			<tr>
			        				<img src={cancel} align="right" width="8px" onClick={this.cancelItem.bind(this,eachItem)} id={id}/>
			        				<td style={{fontSize:"x-small", padding:"4px"}}>{eachItem.quantity}</td>
			        				<td style={{fontSize:"x-small", padding:"4px"}}>{eachItem.reference}</td>
			        				<td style={{fontSize:"x-small", padding:"3px"}}>$ {priceOfItem}</td>
			        				<td style={{fontSize:"x-small", padding:"3px"}}>$ {total}</td>
			        			</tr>
			        			)
			        	})}
			        	<tr>
			        		<td style={{width:"8px"}}></td>
			        		<td>Total</td>
			        		<td></td>
			        		<td colSpan={2} style={{padding:"10.5px 0px"}}>$ {this.totalBasket(this.props.superMarket.basket,space)}</td>
			        	</tr>
			        </tbody>
			    </Table>
			</Card>
			)
		const cardNoShop =
			<Card body className="text-center">
				<h1>Add a shop to Compare</h1>
			</Card>
		return(
			<React.Fragment>
				<Modal isOpen={this.state.modalAddItem} toggle={this.toggleAddItem} className={this.props.className}>
          			<ModalHeader toggle={this.toggleAddItem}>You must add/generate items to the shop</ModalHeader>
        		</Modal>
				<Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd} className={this.props.className}>
          			<ModalHeader toggle={this.toggleAdd}>You must remove the following items</ModalHeader>
          			<ModalBody>
            				<Table borderless hover responsive>
				          		<tbody>
				          			{this.state.notInShop.map((item)=>{
				          				return(
					          				<tr>
				        						<td>{item}</td>
				        					</tr>
			        					)
				          			})}
				          		</tbody>	
            				</Table>
         	 		</ModalBody>
        		</Modal>
        		<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          			<ModalBody>
            			You can only select 3 shops to compare
         	 		</ModalBody>
          			<ModalFooter>
            			<Button color="secondary" onClick={this.toggle}>Cancel</Button>
          			</ModalFooter>
        		</Modal>
				<Col sm={3}>
					{this.state.space1!==""?cardComparsion(this.state.space1,"space1"):cardNoShop}
				</Col>
				<Col sm={3}>
					{this.state.space2!==""?cardComparsion(this.state.space2,"space2"):cardNoShop}
				</Col>
				<Col sm={3}>
					{this.state.space3!==""?cardComparsion(this.state.space3,"space3"):cardNoShop}
				</Col>
			</React.Fragment>	
			)
	}
}

CardShops.propTypes = {
	getSuperMarkets:PropTypes.func.isRequired,
	superMarket:PropTypes.object.isRequired,
	deleteItemFromBasket:PropTypes.func.isRequired,
	addItemToBasket:PropTypes.func.isRequired,
}
const mapStateToProps = (state)=>({
	superMarket:state.superMarket
})

export default connect(mapStateToProps,{getSuperMarkets,deleteItemFromBasket,addItemToBasket}) (CardShops)

