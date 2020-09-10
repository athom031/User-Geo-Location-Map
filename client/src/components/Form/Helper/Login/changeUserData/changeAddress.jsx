import React from 'react';

//svg files
import change from '../../../image_svg/change.svg';

// Form to Change Address that is called from login.jsx after successful login
export class ChangeAddressForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address: '',
            error: '',
            changeSuccess: false
        }
    }
    
    handleAddressChange = event => { this.setState( { address: event.target.value } ) }
    
    handleSubmit = event => {    
        
        var data = JSON.stringify( { "userName": this.props.userName, "address": this.state.address } );
    
        let xhr  = new XMLHttpRequest();
    
        //without http:// -> Access-Control-Allow-Origin error
        let url =  'http://localhost:3000/api/changeAddress';
        
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
    
        event.preventDefault();
    }

    render() {
        
        const { address, error, changeSuccess } = this.state;

        return(
            <div className="change-container">
                <div className="header">New Address</div>
                <div className="content">
                    <div className="image">
                        <img src={change}/>
                    </div>
                    <div>
                        { changeSuccess
                        ?
                            <div className="content">
                                <div className="message">
                                    Your Address Has Been Changed.
                                </div>
                                <div className = "changed-container">
                                    <div className = "userInfo">
                                        Congrats on the new home!
                                    </div>
                                </div>
                            </div>
                        :
                            <div>
                                <div className="form">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label>Address</label>
                                            < input type='text' 
                                              value = { address }  
                                              onChange = { this.handleAddressChange } 
                                              placeholder='U.S. Address' 
                                              required 
                                            />
                                        </div>
                                        <div className="footer">
                                            <button type="submit" className = "changebtn">
                                                Change Address
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
            