import React from 'react';
//import User from '../User/userModel'
import submitHelper from './submit';

class Form extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            fullName:     '',
            userName:     '',
            address:      '',
            password:     '',
            confPassword: ''
        }
    }
    
    //Form Controlled Components    
    //when handler is assigned to on change event, event itself is passed as param    
    handleFullnameChange = event => {
        this.setState({
            fullName: event.target.value 
        })
    }
    handleUsernameChange = event => {
        this.setState({ 
            userName: event.target.value
        })
    }
    handleAddressChange = event => {
        this.setState({
            address: event.target.value
        })
    }
    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    }
    handleConfpasswordChange = event => {
        this.setState({
            confPassword: event.target.value
        })
    }

    handleSubmit = event => {
        
        var data = JSON.stringify({"fullName": this.state.fullName,
                                   "userName": this.state.userName,
                                   "address":  this.state.address,
                                   "password": this.state.password,
                                   "confPassword": this.state.confPassword
                                  });

        submitHelper(data);
        event.preventDefault(); //stops page from refreshing which we will take out after handling success/error
    }
    render() {
        const { fullName, userName, address, password, confPassword } = this.state;  
        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Full Name</label>
                    <input type='text' value = { fullName }  onChange = { this.handleFullnameChange }/>
                </div>    
                <div>
                    <label>Username</label>
                    <input type='text' value = { userName }  onChange = { this.handleUsernameChange }/>
                </div>
                <div>
                    <label>Address</label>
                    <input type='text' value = { address }  onChange = { this.handleAddressChange }/>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' value = { password }  onChange = { this.handlePasswordChange }/>
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type='password' value = { confPassword }  onChange = { this.handleConfpasswordChange }/>
                </div>
                <button type="submit">Register</button>
            </form>
        );
    }
}

export default Form;
