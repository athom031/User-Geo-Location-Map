import React from 'react';
//import User from '../User/userModel'
import submitHelper from './submitHelper';
import checkData from './checkData';

import user from '../../image_svg/user.svg';
import success from '../../image_svg/success.svg';
export class Form extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            fullName:     '',
            userName:     '',
            address:      '',
            password:     '',
            confPassword: '',
            regSuccess: false,
            pendingSearch: false
            //feature that while searching for something dont do anything for register
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
        if(!this.state.pendingSearch) {
            this.state.pendingSearch = true;

            var data = JSON.stringify({"fullName": this.state.fullName,
                                   "userName": this.state.userName,
                                   "address":  this.state.address,
                                   "password": this.state.password,
                                   "confPassword": this.state.confPassword
                                  });
            if(checkData(data)) {
                //check data for matching passwords, address is in the us, password constraints
                submitHelper(this, data);
                event.preventDefault();
                //if successfully sends data refresh page -> potentially after a success message?
                //username being in db to be handled on server side
            } else {
            event.preventDefault(); //stops page from refreshing which we will take out after handling success/error
            }
            this.state.pendingSearch = false;
        }
        event.preventDefault();
    }

    regAgain = event => {
        
        this.setState ({
            fullName:     '',
            userName:     '',
            address:      '',
            password:     '',
            confPassword: '',
            regSuccess: false,
            pendingSearch: false
        })
    }

    render() {
        const isRegSuccess = this.state.regSuccess;
        const { fullName, userName, address, password, confPassword } = this.state;  
        return(
            <div>
            {isRegSuccess
                ?
                <div className="suc-container">
                    <div className="content">
                        <div className="image">
                            <img src={success}/>
                        </div>
                        <div className="message">
                            Successfully registered:
                        </div>
                        <div className="user-container">
                            <div className="userInfo">
                                {fullName}<br/>{userName}
                            </div>
                        </div>
                        <button type="button" onClick={this.regAgain} className="btn">Register Another User</button>
                    </div>
                </div>
                :
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
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type='password' value = { password }  onChange = { this.handlePasswordChange } required />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input type='password' value = { confPassword }  onChange = { this.handleConfpasswordChange } required />
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
            }
            </div>
        );
    }
}

//export default Form;
