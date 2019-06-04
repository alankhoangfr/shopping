import{GET_SUPERMARKETS, ADD_SUPERMARKET, DELETE_SUPERMARKET,ADD_ITEMTOSHOP,ADD_ITEMTOBASKET,DELETE_ALLFROMBASKET,DELETE_ITEMFROMBASKET,CHANGE_MARKERSELECTED} from "./types"

export const getSuperMarkets = () =>{
	return {
		type:GET_SUPERMARKETS
	}
}
export const addSuperMarket = (superMarket) =>{
	return {
		type:ADD_SUPERMARKET,
		payload: superMarket
	}
}
export const deleteSuperMarket = (superMarket) =>{
	return {
		type:DELETE_SUPERMARKET,
		payload: superMarket
	}
}
export const addItemToShop = (item) =>{
	return {
		type:ADD_ITEMTOSHOP,
		payload: item
	}
}
export const addItemToBasket = (item) =>{
	return {
		type:ADD_ITEMTOBASKET,
		payload: item
	}
}
export const deleteItemFromBasket = (item) =>{
	return {
		type:DELETE_ITEMFROMBASKET,
		payload: item
	}
}
export const deleteAllBasket = (basket) =>{
	return {
		type:DELETE_ALLFROMBASKET,
	}
}
export const changeMarkerSelected = (supermarket)=>{
	return{
		type:CHANGE_MARKERSELECTED,
		payload:supermarket
	}
}