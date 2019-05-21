import{GET_ITEMS, ADD_ITEM, DELETE_ITEMS} from "./types"

export const getItems = () =>{
	return {
		type:GET_ITEMS
	}
}
export const addItem = (item) =>{
	return {
		type:ADD_ITEM,
		payload: item
	}
}