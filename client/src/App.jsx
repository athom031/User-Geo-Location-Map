import React from 'react';
import './App.scss';
import { Login, Register } from './components/Form';

class App extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
    }
  }
  //this.rightSide.classList.add("right")
  //have small error that starts with blue box with no name
  //upon a double toggle, it acts fight so lets start with a default

  //componentDidMount() is a function called because of React.component
  //called immediately after component is mounted/inserted into tree
  componentDidMount() {
    this.rightSide.classList.add("right");
    //tells us that we want the tab on the right to show which should now have register text
  }

  changeState() {
    const { isLogginActive } = this.state;
    if(isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    }
    else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }

    this.setState(prevState => ({isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login"; //the tab that will show on the side
    const currentActive = isLogginActive ? "login" : "register";//the page that is showing opp of what we will transition to on click
    //<div>
    //  <RightSide current={current} containerRef={ref => this.rightSide = ref} onClick={this.changeState.bind(this)}/> 
    //</div>
    //<RightSide current={current} containerRef={ref => this.rightSide = ref} onClick={this.changeState.bind(this)}/>
    return (
      <div className="App">
        <div className="login">
          <div className="container">
            {isLogginActive && <Login containerRef={(ref) => this.current = ref}/>}
            {!isLogginActive && <Register containerRef={(ref) => this.current = ref}/>}
          </div>
          <RightSide current={current} containerRef={ref => this.rightSide = ref} onClick={this.changeState.bind(this)}/>
        </div>
      </div>
    )
  }
  
};

 
//function with props as single param
const RightSide = props => {
  return <div className="right-side" ref = {props.containerRef} onClick={props.onClick}>
    <div className="inner-container">
      <div className="text">
        {props.current}
      </div>
    </div>
  </div>
};

export default App;
