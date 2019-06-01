import grocery_sampleJSON from "../../Data/grocery_sampleJSON.json"
import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '',emptySearchBox:false }
const source = grocery_sampleJSON

export  class SearchBox extends Component {
  state = initialState
    shouldComponentUpdate(nextState,nextProps){
         if(this.props.supermarket_selected!==nextProps.supermarket_selected	){
			return true
		}if(nextProps.emptySearchBox===true){
			console.log("clear search box")
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
    	}
    }
  handleResultSelect = (e, { result }) => {
  	this.setState({ value: result.title, emptySearchBox:false })
  	this.props.result(result )
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
export default SearchBox 