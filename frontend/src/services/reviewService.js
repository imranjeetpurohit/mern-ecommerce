import api from "./api";


export const createReview = async(productId,reviewData)=>{


    const response = await api.post(

        `/reviews/${productId}`,

        reviewData

    );


    return response.data;

};