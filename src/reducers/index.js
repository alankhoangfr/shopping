    
import { combineReducers } from 'redux';
import SuperMarketReducers from './SuperMarketReducers';
import ItemReducers from "./ItemReducers"

export default combineReducers({
  superMarket: SuperMarketReducers,
  item:ItemReducers
});