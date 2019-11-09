import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom'
import Home from"../Home/Home"
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',

        
        };
    
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      try = () => {
        this.props.history.push('/hello');
    }
      handleChangeUserName(event) {
        this.setState({userName: event.target.value});
      }
      handleChangePassword(event) {
        this.setState({password: event.target.value});
      }
    
      handleSubmit(event) {
        alert(' UserName: ' + this.state.userName+'Password: ' + this.state.password);
        this.props.history.push('/hello');
        event.preventDefault();
      }
  render() {
     return (
        <div className="App">
        <div className="container">
            <button id="b1" onClick ={this.try}>Click mennnnnnnnn</button>
            <Route path="/hello" component={Home}/>
        </div>
      </div>
    //     <form onSubmit={this.handleSubmit}>
    //     <label>
    //       Name:
    //       <input type="text" value={this.state.userName} onChange={this.handleChangeUserName} />
    //     </label>
    //     <br/>
    //     <label>
    //      PASSWORD:
    //       <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
    //     </label>
    //     <button id="b1" onClick ={this.try}>Click me</button>
    //     <Route path="/hello" component={Home}/>

        
    //   </form>
     )
  }
}
export default () => (
    <div>
       <Router>
            <Route component={Login} />
       </Router>
   </div>
 );
//export default Login;


