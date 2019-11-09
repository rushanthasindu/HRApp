import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from"./Home/Home"
import './App.css';
import logo from './logo.png'; // with import


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'rushanthasindu10@gmail.com',
            password: 'rushan',
            auth :true,
            data:''
        };
     
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      try = () => {
        // this.setState({auth:false })
        // this.props.history.push('/hello');
    }
  
      handleChangeUserName(event) {
        this.setState({userName: event.target.value});
      }
      handleChangePassword(event) {
        this.setState({password: event.target.value});
      }
      componentDidMount() {

        fetch('http://192.168.8.100:3001/users/auth/?email='+this.state.userName+'&password='+this.state.password+'', {
          method: 'GET'
       })
       .then((response) => response.json())
       .then((responseJson) => {
         // console.log(responseJson);
          this.setState({
             data: responseJson
          })
          if (this.state.data[0].email!=='') this.setState({auth:false })
          else this.setState({auth:true })
          //console.log(this.state.data[0]);
       })
       .catch((error) => {
           this.setState({
            data: '0'
         })
         this.setState({auth:true })
         //console.log(this.state.data);
       });
        this.props.history.push('/hello');
      // event.preventDefault();

      }
      handleSubmit(event) {
        //alert(' UserName: ' + this.state.userName+'Password: ' + this.state.password);
        fetch('http://192.168.8.100:3001/users/auth/?email='+this.state.userName+'&password='+this.state.password+'', {
          method: 'GET'
       })
       .then((response) => response.json())
       .then((responseJson) => {
         // console.log(responseJson);
          this.setState({
             data: responseJson
          })
          if (this.state.data[0].email!=='') this.setState({auth:false })
          else this.setState({auth:true })
          //console.log(this.state.data[0]);
       })
       .catch((error) => {
           this.setState({
            data: '0'
         })
         this.setState({auth:true })
         //console.log(this.state.data);
       });
        this.props.history.push('/hello');
       event.preventDefault();
      }
  render() {
    if (this.state.auth){
     return (
       <div>
         <br/> <br/>
         <br/>
         <br/>
      <img class='center' src={logo} />
      <h1 class='center'>Report System</h1>
      <div id="login">

        <form name='form-login' onSubmit={this.handleSubmit}>
        <span class="fontawesome-user"></span>
      
          <input type="text" id="user" placeholder="Username" value={this.state.userName} onChange={this.handleChangeUserName} />
        
        <br/>
        <span class="fontawesome-lock"></span>
         
          <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
       
        <button class="btn" id="b1" onClick ={this.try}>Login</button>
        {/* <Route path="/hello" component={Home}/> */}

        
      </form>
      </div>
      </div>
     )}
     else return(<Route path="/hello" component={Home}/>)
  }
}
export default () => (
    <div>
       <Router>
            <Route component={Login} />
       </Router>
   </div>
 );