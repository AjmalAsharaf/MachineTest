import React,{useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { signin,authenticate } from '../api'
import Layout from './Layout'


const Signin = ()=>{

    const [values,setValues]=useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        redirectToReferrer:false
    })

    const {email,password,loading,error,redirectToReferrer} = values

    const onHandleChange=name=> event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }

    const clickSubmit=(event)=>{
        event.preventDefault()
        setValues({...values,error:false,loading:true})
        signin({email,password}).then((data)=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }else{
        
                authenticate(data,()=>{
                    setValues({...values,redirectToReferrer:true,loading:false})
                })
            }
        })
    }

    const showError = ()=>(
        <div className="alert alert-danger" style={{display:error? '':'none'}}>
        {error}
    </div>
    )
    
    const showLoading = ()=>  loading && (<div className="alert alert-info">Loading</div>)
    

    const redirectUser = ()=>{
        if(redirectToReferrer){
            return <Redirect to="/" />
        }
    }

    const signupForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={onHandleChange('email')} type="email" className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={onHandleChange('password')} type="password" className="form-control" value={password}/>
            </div>
            <button onClick={clickSubmit} className='btn btn-primary mx-auto'>Submit</button>
        </form>
    )

    return(
    <Layout title="Signin" className="container col-md-4 offset-md-4">
       {showError()}
       {showLoading()}
       {signupForm()}
       {redirectUser()}
    </Layout>
    )
    }

export default Signin