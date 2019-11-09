import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from"./Home/Home"

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

      }
      handleSubmit(event) {
        //alert(' UserName: ' + this.state.userName+'Password: ' + this.state.password);
        fetch('http://localhost:3001/users/auth/?email='+this.state.userName+'&password='+this.state.password+'', {
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
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.userName} onChange={this.handleChangeUserName} />
        </label>
        <br/>
        <label>
         PASSWORD:
          <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
        </label>
        <button id="b1" onClick ={this.try}>Click me</button>
        {/* <Route path="/hello" component={Home}/> */}

        
      </form>
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