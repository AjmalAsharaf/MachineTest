import React,{Fragment,useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button} from 'react-bootstrap'
import Layout from './Layout';
import {Link} from 'react-router-dom'
import { isAuthenticated, createMessage } from '../api';
const CreateMessage = () =>{
    const [messageText,setMessage]=useState({
        message:'',
       
        error:'',
        succes:false     

    })
    const { user, token } = isAuthenticated();

    const {message,error,success} = messageText

    const onHandleChange=name=> event=>{
        setMessage({...messageText,error:false,[name]:event.target.value})
    }

    const clickSubmit=(event)=>{
        event.preventDefault()
        setMessage({...messageText,error:false})
        console.log('from message',message)
        createMessage({message},token).then((data)=>{
            console.log(data,"The data")
            if(data.error){
                setMessage({...messageText,error:data.error,success:false})
            }else{
                setMessage({...messageText,message:'',success:true})
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
           Message Created success fully. Go to Home <Link to="/">Home</Link>
        </div>
    )    

    const creatOrderForm = () =>(
        <from>
        <Card style={{ width: '22rem' }}>
        <Card.Body>
          <Card.Title>Create New messages</Card.Title>
          <Card.Text>
            
            <div className="form-group">
                <label className="text-muted">Create Message</label>
                <input  type="text" className="form-control" placeholder="Enter Your message here" onChange={onHandleChange('message')} value={message}/>
            </div>
          </Card.Text>
          <Button variant="primary" onClick={clickSubmit}>Create Message</Button>
        </Card.Body>
      </Card>
      </from>
    )
    return (
        <Layout title="Create Order" className="container col-md-4 offset-md-4">
            {showSuccess()}
            {showError()}
            {creatOrderForm()}
            
        </Layout> 
    )
}

export default CreateMessage