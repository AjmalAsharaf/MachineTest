import { API } from "../config";
export const signup=user=>{
    return fetch(`${API}/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const signin=user=>{
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const authenticate=(data,next)=>{
    if(typeof window!=='undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()
    }
}

export const signout = (next)=>{
    if(typeof window!=='undefined'){
        localStorage.removeItem('jwt')
        next()
        return fetch(`${API}/signout`,{
            method:"GET"
        }).then((res)=>{
            console.log("signout",res)   
        }).catch((err)=>console.log(err))
    }
}

export const isAuthenticated = ()=>{
    if(typeof window =='undefined'){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else{
        return false
    }
}

export const createMessage = (message,token) =>{
    console.log('data received,',message,token)
    console.log('api',API)
    return fetch(`${API}/createMessage`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`

        },
        body:JSON.stringify(message)
    })
    .then(response=>{
        console.log('message passed after')
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const getAllMessages =(token)=>{
    return fetch(`${API}/getMessage`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`

        }
    }).then(response=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })

}

export const getSingleMessage = (messageId,token) =>{
    return fetch(`${API}/getSingleMessage/${messageId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`


        },
    }).then(response=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })

}
export const updateMessage = (order,token) =>{
    console.log('tokent and order',order,token)
    return fetch(`${API}/updateMessage`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`

        },
        body:JSON.stringify(order)
    })
    .then(response=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const removeMessage=(id,token)=>{
    console.log('prodi',JSON.stringify(id))
    return fetch(`${API}/deleteMessage`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`

        },
        body:JSON.stringify(id)
        
    })
}