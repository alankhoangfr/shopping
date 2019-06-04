import uuid from "uuid"
import {GET_SUPERMARKETS,ADD_SUPERMARKET,DELETE_SUPERMARKET,ADD_ITEMTOSHOP,ADD_ITEMTOBASKET,DELETE_ITEMFROMBASKET,DELETE_ALLFROMBASKET,CHANGE_MARKERSELECTED} from '../actions/types';

const initialState ={
	markers:[
		{id: 1,lat: -33.8959144,lng: 151.0984299,name: "Shop 1",address: "26 Stanley Street",score: "",details: "",city: "Croydon Park",state: "NSW",
		postcode: "2133",completeAddress: "26 Stanley Street Croydon Park NSW 2133"},
		{id:2,lat: -33.7750542,lng: 151.0397441,name: "Shop 2",address: "58 Farnell Avenue",score: "",details: "",city: "Carlingford",state: "NSW",
		postcode: "2118",completeAddress: "58 Farnell Avenue Carlingford NSW 2118"},
		{id: 3,lat: -34.08779579999999,lng: 150.7909654,name: "Shop 3",address: "3 Gargery Street",score: "",details: "",city: "Ambarvale",state: "NSW",
		postcode: "2560",completeAddress: "3 Gargery Street Ambarvale NSW 2560"},
	],
	markerSelected:null,
	basket:[],
	1:{id: 1,lat: -33.8959144,lng: 151.0984299,name: "Shop 1",address: "26 Stanley Street",score: "",details: "",city: "Croydon Park",state: "NSW",
		postcode: "2133",completeAddress: "26 Stanley Street Croydon Park NSW 2133"},
	2:{id: 2,lat: -33.7750542,lng: 151.0397441,name: "Shop 2",address: "58 Farnell Avenue",score: "",details: "",city: "Carlingford",state: "NSW",
		postcode: "2118",completeAddress: "58 Farnell Avenue Carlingford NSW 2118"},
	3:{id:3,lat: -34.08779579999999,lng: 150.7909654,name: "Shop 3",address: "3 Gargery Street",score: "",details: "",city: "Ambarvale",state: "NSW",
		postcode: "2560",completeAddress: "3 Gargery Street Ambarvale NSW 2560"}

}

export default function (state=initialState, action) {
	switch(action.type){
		case GET_SUPERMARKETS:
			return {
				...state
			}
		case ADD_SUPERMARKET:

			return {
				...state,
				markers:[action.payload,...state.markers],
				[action.payload.id]:action.payload
			}
		case DELETE_SUPERMARKET:
			delete state[action.payload.id]
			return {
				...state,
				markers:state.markers.filter((shop)=>shop.id!==action.payload.id)
			}	
		case ADD_ITEMTOSHOP:
			if(state[action.payload.superMarket_id].hasOwnProperty("item")===false){
				return {
				...state,
				[action.payload.superMarket_id]:{...state[action.payload.superMarket_id],item:{[action.payload.item_id]:action.payload}}
				}
			}else{
				return {
				...state,
				[action.payload.superMarket_id]:{...state[action.payload.superMarket_id],
					item:{...state[action.payload.superMarket_id].item,[action.payload.item_id]:action.payload}}
				}
			}
		case ADD_ITEMTOBASKET:
			return {
				...state,
				basket:[action.payload,...state.basket]
			}
		case DELETE_ITEMFROMBASKET:
			return {
				...state,
				basket:state.basket.filter((item)=>item.item_id!==action.payload.item_id)
			}
		case DELETE_ALLFROMBASKET:
			return {
				...state,
				basket:[]
			}
		case CHANGE_MARKERSELECTED:
			return {
				...state,
				markerSelected:action.payload
			}
		default:
		 return state

	}
}