import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { logout } from '../../../services/userService';


class Logout extends Component {
    state = {}
    async componentDidMount() {
        try {
            const response = await logout();
            console.log(response);
            if (response.status === 200) {
                localStorage.clear();
                window.location = "/";
                //this.props.history.push("/");
            }
        } catch (ex) {
            console.log(ex);
        }
    }
    render() { 
        return ( null );
    }
}
 
export default withRouter(Logout);