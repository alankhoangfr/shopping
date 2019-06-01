import{GET_SUPERMARKETS, ADD_SUPERMARKET, DELETE_SUPERMARKET,ADD_ITEMTOSHOP,PUT_PRICE} from "./types"

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
export const addItemToShop = (superMarket) =>{
	return {
		type:ADD_ITEMTOSHOP,
		payload: superMarket
	}
}
