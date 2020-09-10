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

  /* componentDidMount called immediately when component is mounted/inserted into tree
     to make sure that we start with default register on the right 
  */
  componentDidMount() {
    this.rightSide.classList.add("right");
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
}

//the box to click that switches between login and register
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