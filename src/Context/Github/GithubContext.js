import React from 'react'
import { createContext,useReducer } from 'react'
import GithubReducers from './GithubReducers'


const GithubContext=createContext();

const GITHUB_TOKEN=process.env.REACT_APP_GITHUB_TOKEN;
    const GITHUB_URL=process.env.REACT_APP_GITHUB_URL;

export const GithubContextProvider=({children})=>{

    const initialState= {
        users:[],
        user:{},
        repos:[],
        loading:false
    }

    const [state,dispatch]=useReducer(GithubReducers,initialState)

    
    
    const fetchUsers=async (text)=>{
        setLoading()

        const params=new URLSearchParams({
            q:text
        })

        const response= await fetch(`${GITHUB_URL}/search/users?${params}`,{
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        const {items}=await response.json();
        console.log(items)
        
        dispatch({
            type:'GET_USERS',
            payload: items
        })

    }




    const fetchUserProfile=async (login)=>{
        setLoading()

        const response= await fetch(`${GITHUB_URL}/users/${login}`,{
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        if(response.status===404){
             window.location('./NotFound')
        }else{

            const data=await response.json();
            
            
            dispatch({
                type:'GET_USER',
                payload: data
            })
        }


    }

    const fetchUserRepos=async (login)=>{
        setLoading()

        const params=new URLSearchParams({
            sort:'created',
            per_page:10
        })

        const response= await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,{
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        if(response.status===404){
             window.location('./NotFound')
        }else{

            const data=await response.json();
            
            
            dispatch({
                type:'GET_USER_REPOS',
                payload: data
            })
        }


    }




    const clearUser=()=>{
        dispatch({
            type:'CLEAR_USERS',
            
        })
    }

  const setLoading=  ()=>dispatch({
        type:'SET_LOADING'
    })


    return <GithubContext.Provider value={{
     users:state.users,
     loading:state.loading,
     user:state.user,
     repos:state.repos,
     fetchUsers,
     clearUser,
     fetchUserProfile,
     fetchUserRepos
     } }>
        {children}
    </GithubContext.Provider>

}

export default GithubContext
