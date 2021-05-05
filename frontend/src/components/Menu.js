import React from "react"
import {Link, withRouter} from 'react-router-dom'
import { signout,isAuthenticated } from "../api" 
import { Fragment } from 'react'

const isActive = (history,path) =>{
    if(history.location.pathname === path){
        return { color:'#fff'}
    }else{
        return {color:'#000'}
    }
}

const Menu = ({history})=>(
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-items">
                <Link className="nav-link" style={isActive(history,'/')} to="/">Home</Link>
            </li>
            {!isAuthenticated() && (    
                <Fragment>
                    <li className="nav-items">
                <Link className="nav-link" style={isActive(history,'/signin')} to="/signin">Signin</Link>
            </li>
            <li className="nav-items">
                <Link className="nav-link" style={isActive(history,'/signup')} to="/signup">Signup</Link>
            </li>
                </Fragment>
            )}
            {isAuthenticated() && (
                <Fragment>
                    <li className="nav-items">
                <Link className="nav-link" style={isActive(history,'/createMessage')} to="/createMessage">Create Message</Link>
            </li>
                     <li className="nav-items">
                <span className="nav-link" style={{cursor:"pointer",color:'#fffff'}} onClick={()=>{
                    signout(()=>{
                        history.push('/')
                    })
                }}>Signout</span>
            </li>
                </Fragment>
            )}
            
        </ul>
    </div>
)
export default withRouter(Menu)