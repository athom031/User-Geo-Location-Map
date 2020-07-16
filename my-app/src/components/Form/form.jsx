import React from 'react';
//import User from '../User/userModel'
import {checkData , submitHelper } from './submit';
import user from '../../image_svg/user.svg';
export class Form extends React.Component {
    
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
        if(checkData(data)) {
            submitHelper(data); //call imported function with json data
            //alert(`Congrats ${this.state.fullName}, ${this.state.userName} has been registered.`);
            event.preventDefault();
        } else {
            
            event.preventDefault(); //stops page from refreshing which we will take out after handling success/error
        }
    }
    render() {
        const { fullName, userName, address, password, confPassword } = this.state;  
        return(
            <div className="reg-container">
                <div className="header">Register</div>
                <div className="content">
                    <div className="image">
                        <img src={user}/>
                    </div>
                    <div className="form">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type='text' value = { fullName }  onChange = { this.handleFullnameChange } required />
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <input type='text' value = { userName }  onChange = { this.handleUsernameChange } required />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type='text' value = { address }  onChange = { this.handleAddressChange } required />
                            </div>
                            <div className="pass">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type='password' value = { password }  onChange = { this.handlePasswordChange } required minLength="6" />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input type='password' value = { confPassword }  onChange = { this.handleConfpasswordChange } required minLength="6"/>
                            </div>
                            </div>
                            <div className="footer">
                                <button type="submit" className = "btn">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

//export default Form;
