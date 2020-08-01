import React from 'react';

//helper functions

//svg files
import change from '../../../../image_svg/change.svg';


export class ChangeAddressForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address: '',
            error: '',
            changeSuccess: false
        }
    }
    
    //Form Controlled Components    
    //when handler is assigned to on change event, event itself is passed as param    
    handleAddressChange = event => { this.setState({ address: event.target.value }) }
    
    handleSubmit = event => {    
        
        var data = JSON.stringify({ "userName": this.props.userName, "address": this.state.address });
    
        //create the xhr object
        let xhr  = new XMLHttpRequest();
        let url =  'http://localhost:3000/api/changeAddress';
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
    
        event.preventDefault();
    }

    render() {
        
        const { changeSuccess, address, error } = this.state;

        return(
            <div className="change-container">
                <div className="header">New Address</div>
                <div className="content">
                    <div className="image">
                        <img src={change}/>
                    </div>
                    <div>
                        {changeSuccess
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
                                        <input type='text' value = { address }  onChange = { this.handleAddressChange } placeholder='U.S. Address' required />
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
            