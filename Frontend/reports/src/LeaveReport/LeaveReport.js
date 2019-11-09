import React,{Component} from 'react';

class App extends React.Component {
   state = {
      data1:[],
      data:[]
  };

  componentDidMount() {
   //alert(' UserName: ' + this.state.userName+'Password: ' + this.state.password);
   fetch('http://192.168.8.100:8000/leave/', {
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
        getEmp(id) {
         //alert(' UserName: ' + this.state.userName+'Password: ' + this.state.password);
         fetch('http://192.168.8.100:8000/leave/', {
           method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
           //console.log(responseJson);
                 this.setState({
                    data1: responseJson
                 })
              //console.log(this.state.data);
              })
              .catch((error) => {
                 this.setState({
                 data1: '0'
              })
              });
              
              }
  
   render() {
      return (
         <div>
            <table id="items">
    <thead>
    <tr>
      <th>Employee ID</th>
      <th>Name</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th>Reason</th>
      <th>Status</th>
      

    </tr>
    </thead>
    <tbody>
          {this.state.data.map(item => (
             
          <tr > 
            <td >
              {item.employeeId} 
          </td>
          <td >
              {item.firstName}  {item.lastName} 
          </td>
          <td >
              {item.leaveStart} 
          </td>
          <td >
          {item.leaveEnd} 
          </td>
         
          <td >
              {item.reason} 
          </td>
           <td >
          {item.status} 
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