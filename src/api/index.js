import {LOCALSTORAGE_TOKEN_KEY} from '../utils'
import {API_URLS} from '../utils'

const customFetch = async (url , {body, ...customConfig}) => {
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    const headers = {
        'content-type': 'application/json',
        Accept :'application/json',
    };

    if(token){
        headers.Authorization = `Bearer ${token}`
    }
    const config = {
        ...customConfig,
        headers:{
            ...headers,
            ...customConfig.headers,
        },
    }

    if(body){
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if(data.success){
            return{
                data:data.data,
                success:true
            }
        }
        throw new Error(data.massage);

    } catch (error) {
        console.log(error);
        return{
            massage:error.massage,
            success:false
        }
    }

};

export const getPosts = (page = 1, limit = 50) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};

export const login = (email , password) =>{
    return customFetch(API_URLS.login() , {
        massage:'POST',
        body: {email, password},
    })
}
