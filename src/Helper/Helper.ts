import {env} from "./Contranst.ts";
import axios, {AxiosResponse} from "axios";

export const getSocialLoginUrl  = ( name : string ) => {
    return `${env.url.API_BASE_URL}/oauth2/authorization/${name}?redirect_uri=${env.url.OAUTH2_REDIRECT_URI}`
}

export const getAllCategory = async () => {
    try {
        const response:AxiosResponse = await  axios.get(`${env.url.API_BASE_URL}/api/product/category/all`);
        return await response;
    }catch (e){
        return e;
    }
}

export const getProductByCategory = async (id : number | undefined) => {
    try{
        if( id === undefined ) return [];
        const response:AxiosResponse = await  axios.get(`${env.url.API_BASE_URL}/api/product/category/${id}`);
        return await response;
    }catch (e){
        return e;
    }
}

export const getProductByProductId = async (id : string | undefined, token : string) => {
    try {
        if( id === undefined ) return [];
        const response:AxiosResponse = await  axios.get(`${env.url.API_BASE_URL}/api/product/${id}`,
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            },
            );
        return await response;
    }catch (e){
        return e;
    }
}

export const getProductByPage = async (page : number | undefined) => {
    try {
        if( page === undefined ) return [];
        const response:AxiosResponse = await  axios.get(`${env.url.API_BASE_URL}/api/product?page=` + page);
        return await response.data;
    }catch (e){
        return e;
    }
}

export const getNotifyRecent = async () => {
    try {
        const response:AxiosResponse = await axios.get(`${env.url.API_BASE_URL}/api/notify/recent`);
        return await response.data;
    }catch (e){
        return e;
    }
}

export const formatTime = ( dateOld : Date) => {
    const date = new Date(dateOld);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return  `${day}/${month}/${year}`;
}

export const subscribeEmail = async ( email : string, time : Date )=> {
    return await axios.post(`${env.url.API_BASE_URL}/api/subscribe`,
        {
            email : email,
            time : time
        }
        )
}
export const registerAccount = async (
    email : string,
    firstName : string,
    lastName : string,
    image : string,
    phone : string,
    password : string

)=> {
    try{
        return await axios.post(`${env.url.API_BASE_URL}/api/user/create`,
            {
                email : email,
                firstName : firstName,
                lastName : lastName,
                imageUrl : image,
                phone : phone,
                password : password,
                role : 'USER'
            }
        )
    }catch ( e) {
        return e;
    }
}

export const parseJwt = (token : string) => {
    if (!token) { return }
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
}

export const authenticate = async (username : string, password : string ) => {
    try{
        const response = await  axios.post(`${env.url.API_BASE_URL}/api/user/authenticate`,
            {
                username : username,
                password : password
            }
        )
        return response;
    }catch (e){
        return e;
    }
}

export const getInfo = async (token: string | null, email: string) => {
    try{
        const respon = await axios.get(`${env.url.API_BASE_URL}/api/user/info/` + email,
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            },
            );
        return respon;
    }catch ( e ){
        return e;
    }
}

export const refreshToken = async ( token : string) => {
    try{
        const respon = await axios.get(`${env.url.API_BASE_URL}/api/user/refresh-token`,{
                headers : {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return respon;
    }catch ( e ){
        return e;
    }
}

export const getProductWithOption = async ( page : number, category : number, sort : number, min : number, max : number, rate : number, search :string )=> {
    try{
        const text : string[] = [];
        text.push(`page=${page}`)
        if(category !== 0){
            text.push(`category=${category}`)
        }
        if( min !== 0 ){
            text.push(`min=${min}`)
        }
        if( max !== 0 ){
            text.push(`max=${max}`)
        }
        text.push(`sort=${sort}`)
        if( rate > 0 ){
            text.push(`rate=${rate}`)
        }
        if( search ){
            text.push(`search=${search}`)
        }
        console.log(`${env.url.API_BASE_URL}/api/product` + (text.length > 0 ? `?${text.join('&')}` : ''))
        const respon = await axios.get(`${env.url.API_BASE_URL}/api/product` + (text.length > 0 ? `?${text.join('&')}` : ''));
        return respon;
    }catch ( e ){
        return e;
    }
}

export const getRangePrice = async () => {
    try{
        return await axios.get(`${env.url.API_BASE_URL}/api/product/rangePrice`);
    }catch ( e ){
        return e;
    }
}
export const updateInfoById = async (id : number, token : string, firstName : string, lastName : string, phone : string, email : string, image : string )=> {
    try{
        return  await axios.put(`${env.url.API_BASE_URL}/api/user/update/info/` + id, {
            firstName : firstName,
            lastName : lastName,
            imageUrl : image,
            email : email,
            phone : phone,
            password : '123'
        }, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        });
    }catch ( e ){
        return e;
    }
}

export const getBlogTag = async () => {
    try{
        return await axios.get(`${env.url.API_BASE_URL}/api/blog/tag`);
    }catch ( e){
        return e;
    }
}

export const getBlogByOption = async (search : string, sort : string, page : number ) => {
    const text : string[] = [];
    text.push(`page=${page}`)
    text.push(`sort=${sort}`)
    text.push(`search=${search}`)
    try{
        return await axios.get(`${env.url.API_BASE_URL}/api/notify/option?` + text.join('&'));
    }catch ( e){
        return e;
    }
}
export const addProductToCart = async ( productId : number, quantity : number, token : string) => {
    try{
        return await axios.post(`${env.url.API_BASE_URL}/api/cart`,
            {
                productId : productId,
                quantity : quantity,
            },
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    }catch ( e){
        return e;
    }
}

export const getInfoCart = async ( token : string ) => {
    try{
        return await axios.get(`${env.url.API_BASE_URL}/api/cart/all`,
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    }catch ( e){
        return e;
    }
}

export const getAddressByEmail = async ( token : string) => {
    try{
        return await axios.get(`${env.url.API_BASE_URL}/api/user/address`,
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    }catch ( e){
        return e;
    }
}

export const setAddressDefault = async ( token : string, id : number) => {
    try{
        return await axios.get(`${env.url.API_BASE_URL}/api/user/address/default/` + id,
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    }catch ( e){
        return e;
    }
}

export const removeAddressWithEmail = async ( token : string, id : number) => {
    try{
        return await axios.delete(`${env.url.API_BASE_URL}/api/user/address/remove/` + id,
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    }catch ( e){
        return e;
    }
}

export const getCart = async ( token : string) =>{
    try{
        return await axios.get(`${env.url.API_BASE_URL}/api/cart/all`,
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    }catch ( e){
        return e;
    }
}

export const paymentCart = async ( list : object[], addressId : number, fee : number, total : number, des : string, token:string) => {
    try{
        return await axios.post(`${env.url.API_BASE_URL}/api/cart/payment`,
            {
                list : list,
                addressId : addressId,
                fee : fee,
                total : total,
                description : des,
            },
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    }catch ( e){
        return e;
    }
}

export const addAddressByEmail = async (address : string, isDefault : boolean, token : string) => {
    try{
        return await axios.post(`${env.url.API_BASE_URL}/api/user/address/add`,
            {
                address : address,
                isDefault : isDefault
            },
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    }catch ( e){
        return e;
    }
}

export const addWishList = async (productId : number, token : string) => {
    try{
        return await axios.post(`${env.url.API_BASE_URL}/api/product/wishlist/add/` + productId,{},
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    }catch ( e){
        return e;
    }
}

export const removeWishList = async (productId : number, token : string) => {
    try{
        return await axios.delete(`${env.url.API_BASE_URL}/api/product/wishlist/remove/` + productId,
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    }catch ( e){
        return e;
    }
}

export const getWishList = async ( token : string ) => {
    try{
        return await axios.get(`${env.url.API_BASE_URL}/api/product/wishlist/get`,
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    }catch ( e){
        return e;
    }
}

export const addWishListToCart = async ( list : number[] , token : string) => {
    try{
        return await axios.post(`${env.url.API_BASE_URL}/api/product/wishtlist/to/cart`,
            list
                ,
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    }catch ( e){
        return e;
    }
}

export const getRevenueForYear = async (token: string | null) => {
    try{
        return await axios.get(`${env.url.API_BASE_URL}/api/cart/revenue/year`,
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    }catch ( e){
        return e;
    }
}

export const getRevenueByYear = async (year: number, token: string | null) => {
    try{
        return await axios.get(`${env.url.API_BASE_URL}/api/cart/revenue/` + year,
            {
                headers : {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    }catch ( e){
        return e;
    }
}