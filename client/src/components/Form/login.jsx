import React from 'react';

//helper functions
import logHelper from './Helper/Login/logHelper';
import signoffHelper from './Helper/Login/signoffHelper';

//svg files
import user from './image_svg/login.svg';
import success from './image_svg/signin.svg';

//change files
import { ChangeNameForm, ChangePasswordForm, ChangeAddressForm } from './Helper/Login/changeUserData';


/*login form if right side is clicked will switch to register form */
export class Login extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            userName:       '',
            password:       '',
            errorCheck:          '',
            logSuccess:     false,
            signError:      '',
            signSuccess:    false,
            changeName:     false,
            changeAddress:  false,
            changePassword: false
        }
    }
    
    //Form Controlled Components, event is passed as param    
    handleUsernameChange = event => { this.setState( { userName: event.target.value } ) }
    handlePasswordChange = event => { this.setState( { password: event.target.value } ) }
    
    handleSubmit = event => {    
        var data = JSON.stringify( { "userName": this.state.userName, "password": this.state.password } );
        
        logHelper(this, data)
            .then((message) => {
                console.log(message);
            })
            .catch((message) => {
                console.log(message);
            });
        event.preventDefault();
    }

    signoff = event => {
        var data = JSON.stringify( { "userName" : this.state.userName } );
        signoffHelper(data)
            .then((message) => {
                console.log(message);
            })
            .catch((message) => {
                console.log(message);
            });
        this.setState ({
            userName:       '',
            password:       '',
            errorCheck:     '',
            logSuccess:     false,
            signError:      '',
            signSuccess:    false,
            changeName:     false,
            changeAddress:  false,
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

    changeA = event => { this.setState( { changeAddress: true } ) }
    changeN = event => { this.setState( { changeName: true } ) }
    changeP = event => { this.setState( { changePassword: true } ) }

    render() {
        const isLogSuccess = this.state.logSuccess;
        const isSignSuccess = this.state.signSuccess;
        
        const { userName,  password, errorCheck, signError, changeName, changeAddress, changePassword } = this.state;

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
                                    <div>
                                        <div>
                                            <ChangeAddressForm userName ={userName} />
                                        </div>
                                        <button type="button" onClick={this.cancel} className="btn">Home Page</button>
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
