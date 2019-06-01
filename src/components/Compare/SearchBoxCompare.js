import grocery_sampleJSON from "../../Data/grocery_sampleJSON.json"
import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import {getSuperMarkets} from "../../actions/SuperMarketActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"
const initialState = { isLoading: false, results: [], value: '',emptySearchBox:false }
var source = grocery_sampleJSON

export  class SearchBoxCompare extends Component {
  state = initialState
     componentDidMount(){
        this.props.getSuperMarkets()
    }
    shouldComponentUpdate(nextState,nextProps){
         if(this.props.supermarket_selected!==nextProps.supermarket_selected	){
			return true
		}if(nextProps.emptySearchBox===true){
			console.log("clear search box")
			return true
		}if(this.props.space!==nextProps.space){
            return true
        }
    }
    componentDidUpdate(prevProps){
    	if(prevProps.supermarket_selected!==this.props.supermarket_selected	){
    		this.setState({value:""})
    	}if(this.props.emptySearchBox!==prevProps.emptySearchBox){
    		console.log("clear search box")
    		this.setState({
    			value:"",
    			emptySearchBox:false})
    	}if(prevProps.space!==this.props.space){
            source = this.sourceForList(this.props.space)
        }
    }
  handleResultSelect = (e, { result }) => {
  	this.setState({ value: result.title, emptySearchBox:false })
  	this.props.result(result )
  }
 sourceForList=(arr)=>{
        let arrays=[]
        arr.map((shop)=>{
            if(this.props.superMarket[shop.id].item!==undefined){
                const list_items = Object.keys(this.props.superMarket[shop.id].item)
                arrays.push(list_items)
            }
        })
        console.log(arrays)
        var result = arrays.shift().reduce(function(res, v) {
            if (res.indexOf(v) === -1 && arrays.every(function(a) {
                return a.indexOf(v) !== -1;
            })) res.push(v);
        return res;
        }, []);
        const finalResult = grocery_sampleJSON.filter((item)=>result.indexOf(item.item_id)>=0)
        return finalResult
    }
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }
  render() {

    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}

          />
        </Grid.Column>
      </Grid>
    )
  }
}

SearchBoxCompare.propTypes = {
    getSuperMarkets:PropTypes.func.isRequired,
    superMarket:PropTypes.object.isRequired
}
const mapStateToProps = (state)=>({
    superMarket:state.superMarket
})

export default connect(mapStateToProps,{getSuperMarkets}) (SearchBoxCompare)
