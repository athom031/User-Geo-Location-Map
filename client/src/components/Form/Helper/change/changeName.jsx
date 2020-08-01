import React from 'react';

//helper functions

//svg files
import change from '../../../../image_svg/change.svg';


export class ChangeNameForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            confName: '',
            error: '',
            changeSuccess: false
        }
    }
    
    //Form Controlled Components    
    //when handler is assigned to on change event, event itself is passed as param    
    handleFullnameChange = event => { this.setState({ fullName: event.target.value }) }
    handleConfnameChange = event => { this.setState({ confName: event.target.value }) }
    
    handleSubmit = event => {    
        if(this.state.fullName === this.state.confName) {
            this.setState({
                error: ''
            });

            var data = JSON.stringify({ "userName": this.props.userName, "fullName": this.state.fullName });
        
            //create the xhr object
            let xhr  = new XMLHttpRequest();
            let url =  'http://localhost:3000/api/changeName';
            //if don't have the http:// -> Access-Control-Allow-Origin error
            const form = this;
            //open a connection
            xhr.open("POST", url, true);
        
            //set request header (type of content being sent)
            xhr.setRequestHeader("Content-Type", "application/json");
        
            //create state change callback
            xhr.onreadystatechange = function () {
                if(xhr.readyState === 4 && xhr.status === 200) {
                    console.log(this.responseText) 
                    form.setState({
                        changeSuccess: true
                    })
                }
                else if(xhr.readyState === 4) { 
                    console.log(JSON.parse(this.responseText).message);
                    form.setState({
                        error: JSON.parse(this.responseText).message
                    })
                }
            };
            
            xhr.send(data);
        }
        else {
            this.setState({
                error: 'ERROR: Names do not match'
            })
        }
        event.preventDefault();
    }

    render() {
        
        const { changeSuccess, fullName, confName, error } = this.state;

        return(
            <div className="change-container">
                <div className="header">New Name</div>
                <div className="content">
                    <div className="image">
                        <img src={change}/>
                    </div>
                    <div>
                        {changeSuccess
                        ?
                        <div className="content">
                            <div className="message">
                                Your Name Has Been Changed.
                            </div>
                            <div className = "changed-container">
                                <div className = "userInfo">
                                    {this.props.userName}<br/>now goes by<br/>{fullName}!
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="form">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input type='text' value = { fullName }  onChange = { this.handleFullnameChange } placeholder='Full Name' required />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm Name</label>
                                        <input type='text' value = { confName }  onChange = { this.handleConfnameChange } placeholder='Confirm Name' required />
                                    </div>
                                    <div className="footer">
                                        <button type="submit" className = "changebtn">
                                            Change Name
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {this.state.error === ''
                            ?
                                <div/>
                            : 
                                <div className="error">
                                    {error}
                                </div>
                            }
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
            
            /*
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
                                        <div className="content">
                                            <div className="message">
                                                Change Address
                                            </div>
                                            <div className="image">
                                                <img src={change}/>
                                            </div>
                                            <div>
                                                <button type="button" onClick={this.cancel} className="btn">Cancel</button>
                                            </div>
                                        </div>
                                </div>
                                :
                                <div>
                                    {changePassword
                                    ?
                                    <div className="suc-container">
                                        <div className="content">
                                            <div className="message">
                                                Change Password  
                                            </div>
                                            <div className="image">
                                                <img src={change}/>
                                            </div>
                                            <div>
                                                <button type="button" onClick={this.cancel} className="btn">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="suc-container">
                                        <div className="content">
                                            <div className="message">
                                                Change Name 
                                            </div>
                                            <div className="image">
                                                <img src={change}/>
                                            </div>
                                            <div>
                                                <button type="button" onClick={this.cancel} className="btn">Cancel</button>
                                            </div>
                                        </div>
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

export default changeNameForm;
*/