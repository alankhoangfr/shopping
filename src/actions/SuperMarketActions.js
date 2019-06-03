import{GET_SUPERMARKETS, ADD_SUPERMARKET, DELETE_SUPERMARKET,ADD_ITEMTOSHOP,ADD_ITEMTOBASKET,DELETE_ALLFROMBASKET,DELETE_ITEMFROMBASKET} from "./types"

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
export const addItemToShop = (superMarket) =>{
	return {
		type:ADD_ITEMTOSHOP,
		payload: superMarket
	}
}
export const addItemToBasket = (superMarket) =>{
	return {
		type:ADD_ITEMTOBASKET,
		payload: superMarket
	}
}
export const deleteItemFromBasket = (superMarket) =>{
	return {
		type:DELETE_ITEMFROMBASKET,
		payload: superMarket
	}
}
export const deleteAllBasket = (superMarket) =>{
	return {
		type:DELETE_ALLFROMBASKET,
	}
}