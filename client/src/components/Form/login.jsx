import React from 'react';

//helper functions
import logHelper from './Helper/logHelper';
import signoffHelper from './Helper/signoffHelper';

//svg files
import user from '../../image_svg/login.svg';
import success from '../../image_svg/signin.svg';
import change from '../../image_svg/change.svg';

//change files
import { ChangeNameForm } from './Helper/change/changeName';
import { ChangePasswordForm } from './Helper/change/changePasswod';
import { ChangeAddressForm } from './Helper/change/changeAddress';

export class Login extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            userName:     '',
            password:     '',
            error: '',
            logSuccess: false,
            signError: '',
            signSuccess: false,
            changeName: false,
            changeAddress: false,
            changePassword: false
        }
    }
    
    //Form Controlled Components    
    //when handler is assigned to on change event, event itself is passed as param    
    handleUsernameChange = event => { this.setState({ userName: event.target.value }) }
    
    handlePasswordChange = event => { this.setState({ password: event.target.value }) }
    
    handleSubmit = event => {    
        var data = JSON.stringify({ "userName": this.state.userName, "password": this.state.password });
        
        logHelper(this, data);
        event.preventDefault();
    }

    signoff = event => {
        //signoffHelper(this, data);
        var data = JSON.stringify({ "userName" : this.state.userName });
        signoffHelper(this, data);
        this.setState ({
            userName:     '',
            password:     '',
            error: '',
            logSuccess: false,
            signError: '',
            signSuccess: false,
            changeName: false,
            changeAddress: false,
            changePassword: false
        })
    }

    cancel = event => {
        this.setState({
            changeName: false,
            changeAddress: false,
            changePassword: false
        })
    }

    changeA = event => {
        this.setState({
            changeAddress: true
        })
    }
    
    changeN = event => {
        this.setState({
            changeName: true
        })
    }
    
    changeP = event => {
        this.setState({
            changePassword: true
        })
    }

    render() {
        const isLogSuccess = this.state.logSuccess;
        const errorCheck = this.state.error;
        const isSignSuccess = this.state.signSuccess;
        
        const { userName,  password, changeName, changeAddress, changePassword, signError } = this.state;

        return(
            <div>
                {isLogSuccess && isSignSuccess
                ?
                    <div>
                        {changeName === true || changeAddress === true || changePassword === true
                        ?
                            <div>
                                {changeAddress
                                ?
                                <div className="suc-container">
                                        <div>
                                        <div>
                                            <ChangeAddressForm userName ={userName} />
                                        </div>
                                        <button type="button" onClick={this.cancel} className="btn">Home Page</button>
                                    </div>
                                </div>
                                :
                                <div>
                                    {changePassword
                                    ?
                                    <div>
                                        <div>
                                            <ChangePasswordForm userName ={userName} />
                                        </div>
                                        <button type="button" onClick={this.cancel} className="btn">Home Page</button>
                                    </div>
                                    :
                                    <div>
                                        <div>
                                            <ChangeNameForm userName ={userName} />
                                        </div>
                                        <button type="button" onClick={this.cancel} className="btn">Home Page</button>
                                    </div>
                                    }
                                </div>
                                }
                            </div>
                            
                        :
                            <div className="suc-container">
                                <div className="content">
                                    <div className="image">
                                        <img src={success}/>
                                    </div>
                                    <div className="message">
                                        You're Logged In!  
                                    </div>
                                    <div className="user-container">
                                        <div className="userInfo">
                                            Welcome Back<br/>{userName}!
                                        </div>
                                    </div>
                                    <div className="edit-container">
                                        <div className="editInfo">
                                            Would you like to edit your information?
                                        </div>
                                        <button type="button" className = "editbtn" onClick = { this.changeN } >
                                                Change Name
                                        </button>
                                        <button type="button" className = "editbtn" onClick = { this.changeA } > 
                                                Change Address
                                        </button>
                                        <button type="button" className = "editbtn" onClick = { this.changeP } >  
                                                Change Password
                                        </button>
                                    </div>
                                    <button type="button" onClick={this.signoff} className="btn">Logout</button>
                                </div>
                            </div>
                        }
                    </div>
                :
                <div className="reg-container" ref={this.props.containerRef}>
                    <div className="header">Login</div>
                    <div className="content">
                        <div className="image">
                            <img src={user}/>
                        </div>
                        <div className="form">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type='text' value = { userName }  onChange = { this.handleUsernameChange } placeholder='Username' required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type='password' value = { password }  onChange = { this.handlePasswordChange } placeholder = 'Password' required />
                                </div>
                                <div className="footer">
                                    <button type="submit" className = "btn">
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div>
                            {errorCheck === ''
                            ?
                            <div/>
                            : 
                            <div className="error">
                                {errorCheck}
                                {signError}
                            </div>
                            }
                        </div>    
                    </div>
                </div>
                }     
            </div>
            
        );
    }
}
