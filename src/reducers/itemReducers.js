import uuid from "uuid"
import {GET_ITEMS,ADD_ITEM,DELETE_ITEM} from '../actions/types';

const initialState ={
	markers:[
		{id	:uuid(),lat: -33.78, lng: 151.2,name:"shop 1",address:"asdfddfd",score:"50.32",details:"details"},
		{id	:uuid(),lat: -33.79, lng: 151.1,name:"shop 21",address:"asdfd",score:"54.32",details:"details"},
		{id	:uuid(),lat: -33.785, lng: 151.23,name:"shop 3",address:"asdfd",score:"20.32",details:"details"},
		{id	:uuid(),lat: -31.95, lng: 115.8605,name:"shop 4",address:"asdfd",score:"30.32",details:"details"},
		{id	:uuid(),lat: -34.070587, lng: 150.791252,name:"shop 5",address:"asdfd",score:"35.32",details:"details"}
	]
}

export default function (state=initialState, action) {
	switch(action.type){
		case GET_ITEMS:
			return {
				...state
			}
		case ADD_ITEM:
			return {
				...state,
				markers:[action.payload,...state.markers]
			}
		default:
		 return state

	}
}