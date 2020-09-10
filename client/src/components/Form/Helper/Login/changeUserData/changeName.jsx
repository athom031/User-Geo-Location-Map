import React from 'react';

//svg files
import change from '../../../image_svg/change.svg';

// Form to Change Name that is called from login.jsx after successful login
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
    
    handleFullnameChange = event => { this.setState( { fullName: event.target.value } ) }
    handleConfnameChange = event => { this.setState( { confName: event.target.value } ) }
    
    handleSubmit = event => {    
        if(this.state.fullName === this.state.confName) {
            this.setState( { error: '' } );

            var data = JSON.stringify( { "userName": this.props.userName, "fullName": this.state.fullName } );
        
            let xhr  = new XMLHttpRequest();
            
            //without http:// -> Access-Control-Allow-Origin error
            let url =  'http://localhost:3000/api/changeName';
            
            //create form variable to assign this.setState within xhr function call
            const form = this;
            
            xhr.open("POST", url, true);
        
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function () {
                if(xhr.readyState === 4 && xhr.status === 200)
                    form.setState( { changeSuccess: true } )
                else if(xhr.readyState === 4)
                    form.setState( { error: JSON.parse(this.responseText).message } )
            };

            xhr.send(data);
        }
        else {
            this.setState( { error: 'ERROR: Names do not match' } )
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
                                            < input type='text' value = { fullName }  
                                              onChange = { this.handleFullnameChange } 
                                              placeholder='Full Name' 
                                              required 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirm Name</label>
                                            < input type='text' value = { confName }  
                                              onChange = { this.handleConfnameChange } 
                                              placeholder='Confirm Name' 
                                              required 
                                            />
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