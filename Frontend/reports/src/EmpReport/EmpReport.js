import React,{Component} from 'react';
import './EmpReport.css'

class App extends React.Component {
   state = {

      data:[]
  };

  componentDidMount() {
   //alert(' UserName: ' + this.state.userName+'Password: ' + this.state.password);
   fetch('http://192.168.8.100:8000/employee/', {
     method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {
     //console.log(responseJson);
           this.setState({
              data: responseJson
           })
        //console.log(this.state.data);
        })
        .catch((error) => {
           this.setState({
           data: '0'
        })
        });
        
        }
  
   render() {
      return (
         <div>
            <table  id="items">
    <thead>
    <tr>
      <th>Employee ID</th>
      <th>Name</th>
      <th>Address</th>
      <th>Email</th>

      <th>Status</th>
      <th>Number Of projects Done</th>
      <th>Role</th>

    </tr>
    </thead>
    <tbody>
          {this.state.data.map(item => (
          <tr > 
            <td >
              {item.empId} 
          </td>
          <td >
              {item.firstName}  {item.lastName} 
          </td>
          <td >
              {item.address} 
          </td>
          <td >
              {item.email} 
          </td>
          
          <td >
              {item.status} 
          </td>
          <td >
              {item.numOfProject} 
          </td>
          <td >
              {item.role} 
          </td>
          </tr> 
          ))} 

   </tbody>
      
          </table>
         </div>
      );
   }
}
export default App;