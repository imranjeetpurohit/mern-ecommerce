import api from "./api";


export const getWishlist = async()=>{

    const response = await api.get(
        "/wishlist"
    );

    return response.data;

};



export const addWishlist = async(id)=>{

    const response = await api.post(
        `/wishlist/${id}`
    );

    return response.data;

};



export const removeWishlist = async(id)=>{

    const response = await api.delete(
        `/wishlist/${id}`
    );

    return response.data;

};