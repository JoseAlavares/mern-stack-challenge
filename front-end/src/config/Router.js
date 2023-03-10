import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from "../views/Home/Home";
import Login from "../views/Login/Login";
import AuthenticatedRoute from "./AuthenticatedRoute";
import ListUser from "../views/ListUser/ListUser";
import EditUser from "../views/EditUser/EditUser";
import CreateUser from "../views/CreateUser/CreateUser";
import Profile from "../views/Profile/Profile";
import Page404 from "../views/Page404/Page404";
import RealStateCreate from "../views/RealState/RealStateCreate";
import RealStateList from "../views/RealState/RealStateList";
import RealStateUpdate from "../views/RealState/ReactStateUpdate";

function Router(props) {
    return (
	    <Switch>
			{/* <AuthenticatedRoute path="/profile/:id" component={Profile}/> */}
			{/* <AuthenticatedRoute path="/edit-user" component={EditUser}/> */}
			<AuthenticatedRoute path="/home" component={Home}/>
			<Route exact path="/list-user" component={ListUser}/>
	    	<Route exact path="/login" component={Login}/>
			{/* <Route exact path="/register" component={CreateUser}/> */}
			<Route exact path="/" component={Login}/>
			<Route exact path="/real-state-list" component={RealStateList}/>
			<Route exact path="/real-state-add" component={RealStateCreate}/>
			<Route exact path="/real-state-edit/:id" component={RealStateUpdate}/>
			<Route component={Page404}/>
        </Switch>
    );
}

export default Router;