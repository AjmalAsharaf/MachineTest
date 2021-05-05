import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import PrivateRoute from './api/PrivateRoute'
import CreateMessage from './components/CreateMessage'
import Home from './components/Home'
import Menu from './components/Menu'
import Signin from './components/Signin'
import Signup from './components/Signup'
import UpdateMessage from './components/UpdateMessage'


const Routes = ()=>{
    return(
        <BrowserRouter>
            <Menu />
            <Switch>
            <PrivateRoute path='/' exact component={Home} />
                 
                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
                <PrivateRoute path='/createMessage' exact component={CreateMessage} />
                <PrivateRoute path='/updateMessage/:messageId' exact component={UpdateMessage} />

                </Switch>
        </BrowserRouter>
    )
}

export default Routes
