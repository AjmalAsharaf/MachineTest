import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button} from 'react-bootstrap'
import Layout from './Layout';
import {Link} from 'react-router-dom'
import { isAuthenticated, updateMessage,getSingleMessage } from '../api';
const UpdateMessage = ({match}) =>{
    const [messageText,setMessage]=useState({
        message:'',
        error:'',
        success:false     

    })
    const {message,error,success} = messageText
    const { user, token } = isAuthenticated();

    const init =(messageId) =>(
        getSingleMessage(messageId,token).then((response)=>{
            setMessage({...messageText,message:response.message
                
            })

        })
    )
    useEffect(() => {
        init(match.params.messageId)
     }, [])
    

    const onHandleChange=name=> event=>{
        setMessage({...messageText,error:false,[name]:event.target.value})
    }
    let id = match.params.messageId

    const clickSubmit=(event)=>{
        event.preventDefault()
        setMessage({...messageText,error:false})
        updateMessage({message,id},token).then((data)=>{
            console.log(data,"The data")
            if(data){
                setMessage({...messageText,success:true})
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
            MessageUpdated successfully. Go to Home <Link to="/">Home</Link>
        </div>
    )    

    const updateForm = () =>(
        <from>
        <Card style={{ width: '22rem' }}>
        <Card.Body>
          <Card.Title>Edit Message</Card.Title>
          <Card.Text>
            
            <div className="form-group">
                <label className="text-muted">change message</label>
                <input  type="text" className="form-control" placeholder="Change message here" onChange={onHandleChange('message')} value={message}/>
            </div>

            


           
          </Card.Text>
          <Button variant="primary" onClick={clickSubmit}>Update Message</Button>
        </Card.Body>
      </Card>
      </from>
    )
    return (
        <Layout title="Edit Order" className="container col-md-4 offset-md-4">
            {showSuccess()}
            {showError()}
            {updateForm()}
            
        </Layout> 
    )
}

export default UpdateMessage