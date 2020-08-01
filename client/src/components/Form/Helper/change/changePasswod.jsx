import React from 'react';

//helper functions

//svg files
import change from '../../../../image_svg/change.svg';


export class ChangePasswordForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            confPassword: '',
            error: '',
            changeSuccess: false
        }
    }
    
    //Form Controlled Components    
    //when handler is assigned to on change event, event itself is passed as param    
    handlePasswordChange = event => { this.setState({ password: event.target.value }) }
    handleConfPasswordChange = event => { this.setState({ confPassword: event.target.value }) }
    
    handleSubmit = event => {    
        if(this.state.password != this.state.confPassword) {
            this.setState({
                error: 'ERROR: Typed passwords do not match'
            });
        }
        else if(this.state.password.toLowerCase() === this.state.password || /^[a-zA-Z]+$/.test(this.state.password) || this.state.password.length < 6) {
            this.setState({
                error: 'ERROR: Password must have a minimum of 6 characters with atleast 1 uppercase letter and 1 non-letter'
            });
        }
        else {

            var data = JSON.stringify({ "userName": this.props.userName, "password": this.state.password });
        
            //create the xhr object
            let xhr  = new XMLHttpRequest();
            let url =  'http://localhost:3000/api/changePassword';
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
        event.preventDefault();
    }

    render() {
        
        const { changeSuccess, password, confPassword, error } = this.state;

        return(
            <div className="change-container">
                <div className="header">New Password</div>
                <div className="content">
                    <div className="image">
                        <img src={change}/>
                    </div>
                    <div>
                        {changeSuccess
                        ?
                        <div className="content">
                            <div className="message">
                                Your Password Has Been Changed.
                            </div>
                            <div className = "changed-container">
                                <div className = "userInfo">
                                    Your Security is our<br/>Top Priority!
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="content">
                                <div className="form">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label>Password </label>
                                            <input type='password' value = { password }  onChange = { this.handlePasswordChange } placeholder='Min-length: 6, 1 Capital, 1 Special' required />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirm Password</label>
                                            <input type='password' value = { confPassword }  onChange = { this.handleConfPasswordChange } placeholder='Must Match Password' required />
                                        </div>
                                        <div className="footer">
                                            <button type="submit" className = "changebtn" >
                                                Change Password
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div>
                                {this.state.error === ''
                                ?
                                    <div/>
                                : 
                                    <div className="error">
                                        {error}
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    </div>
                </div>
            </div>
        );
    }
}