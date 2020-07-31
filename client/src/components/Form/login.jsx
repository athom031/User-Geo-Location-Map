import React from 'react';

//helper functions
import logHelper from './Helper/logHelper';

//svg files
import user from '../../image_svg/login.svg';
import success from '../../image_svg/success.svg';
export class Login extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            userName:     '',
            password:     '',
            error: '',
            logSuccess: false
        }
    }
    
    //Form Controlled Components    
    //when handler is assigned to on change event, event itself is passed as param    
    handleUsernameChange = event => { this.setState({ userName: event.target.value }) }
    
    handlePasswordChange = event => { this.setState({ password: event.target.value }) }
    
    handleSubmit = event => {    
        var data = JSON.stringify({ "userName": this.state.userName, "password": this.state.password });
        console.log(data);

        logHelper(this, data);
        /*
        if(checkData(this, data)) {
            //check data for matching passwords, password constraints
            submitHelper(this, data);
            
            //username being in db/us address to be handled on server side
        }*/
        //stops page from refreshing, allows user to fix mistakes
        event.preventDefault();
    }

    regAgain = event => {
        
        this.setState ({
            userName:     '',
            password:     '',
            error:        '',
            logSuccess:   false
        })
    }

    render() {
        const isLogSuccess = this.state.logSuccess;
        const errorCheck = this.state.error;

        const { userName,  password } = this.state;

        return(
            <div>
                {isLogSuccess
                ?
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
                                Welcome Back:<br/>{userName}
                            </div>
                        </div>
                        <button type="button" onClick={this.regAgain} className="btn">Logout</button>
                    </div>
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
