import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../api'
import Layout from './Layout'

const Signup = ()=>{

    const [values,setValues]=useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    })

    const {name,email,password,success,error} = values
    const onHandleChange=name=> event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }


    const clickSubmit=(event)=>{
        event.preventDefault()
        setValues({...values,error:false})
        signup({name,email,password}).then((data)=>{
            console.log(data,"The data")
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }else{
                setValues({...values,name:'',email:'',password:'',error:'',success:true})
            }
        })
    }

    const showError = ()=>(
        <div className="alert alert-danger" style={{display:error? '':'none'}}>
        {error}
    </div>
    )
    const showSuccess = ()=>(
        <div className="alert alert-info" style={{display:success? '':'none'}}>
            Account Created successfully. Please <Link to="/signin">Signin</Link>
        </div>
    )
    const signupForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={onHandleChange('name')}  type="text" className="form-control" value={name} required />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={onHandleChange('email')} type="email" className="form-control" value={email} required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={onHandleChange('password')} type="password" className="form-control" value={password} required/>
            </div>
            {/* <button className='btn btn-primary'>Submit</button> */}
            <button onClick={clickSubmit} className='btn btn-primary'>Submit</button>
        </form>
    )

    return(
    <Layout title="Signup" className="container col-md-4 offset-md-4">
       {showError()}
       {showSuccess()}
       {signupForm()}
    </Layout>
    )
    }

export default Signup