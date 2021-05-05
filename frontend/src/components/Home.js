import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { getAllMessages,isAuthenticated,removeMessage } from '../api';
import Layout from './Layout';

const Home = () =>{

    const [message,setMessage] = useState({
        messageDetails:[],
        erro:false
    })
    const {messageDetails} = message
    const { user, token } = isAuthenticated();
    
    const init = () =>{
        getAllMessages(token).then((data)=>{
            if(data){
                setMessage({...message,messageDetails:data})
            }
        })
    }

    const deleteMessage =(id) =>
        {console.log('hello',id,token)
        removeMessage({id},token).then((response)=>{
            init()
        })
    }
    
    
    
    const showMessages = () =>(
        <div className="mt-3">
       <h2>All Message Details</h2>
       <Link to="/createMessage">
       <button  className="btn btn-success" style={{'margin-left':'475px'}}>Create New Message</button>
       </Link>
       
       <table className="table mt-4">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Message Details</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    
      {messageDetails.map((p,i)=>(
          <tr key={i}>
          <th scope="row" >{i+1}</th>
          <td>{p.message}</td>
         
          <td>
          <Link to={`/updateMessage/${p._id}`} className="btn btn-success" >Edit</Link>
          </td>
          <td><button  className="btn btn-danger" onClick={()=>deleteMessage(p._id)}>Delete</button></td>
          </tr>
      ))}
    
  </tbody>
</table>
   </div>
    )

    useEffect(()=>{
        init()
    },[])
        
    return(
        <Layout title="All Messages" className="container col-md-4 offset-md-4">
            {showMessages()}
            
            
        </Layout> 
    )
        
    }

export default Home