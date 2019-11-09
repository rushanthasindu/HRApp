import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
// import InventryTable from './inventryTable'
class Home extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
          itemCode: '102',
          description: 'Biscuit',
          qty :10,
          data:''
      };
      const getFirstName=()=>{
        return (this.state.data[0].email);
      } 
      this.handleChangeDescription = this.handleChangeDescription.bind(this);
      this.handleChangeQty = this.handleChangeQty.bind(this);
      this.handleChangeItemCode = this.handleChangeItemCode.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    try = () => {
      // this.setState({auth:false })
      // this.props.history.push('/hello');
  }
    handleChangeItemCode(event) {
      this.setState({itemCode: event.target.itemCode});
    }
    handleChangeDescription(event) {
      this.setState({description: event.target.description});
    }
    handleChangeQty(event) {
      this.setState({qty: event.target.qty});
    }
    componentDidMount() {
 //alert(' UserName: ' + this.state.userName+'Password: ' + this.state.password);
 fetch('http://localhost:3001/inventry', {
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


    handleSubmit(event) {
      //alert(' UserName: ' + this.state.userName+'Password: ' + this.state.password);
      fetch('http://localhost:3001/inventry/addNew/?itemCode='+this.state.userName+'&description='+this.state.description+'&qty='+this.state.qty+'', {
        method: 'GET'
     })
     .then((response) => response.json())
     .then((responseJson) => {
        console.log(responseJson);
        this.setState({
           data: responseJson
        })
     })
     .catch((error) => {
         this.setState({
          data: '0'
       })
     });
      this.props.history.push('/hello');
     event.preventDefault();
    }
   render() {
     
      return (
         <div>
            <h1>Add New Inventry...</h1>
            <form onSubmit={this.handleSubmit}>
        <label>
          Item Code:
          <input type="text" value={this.state.itemCode} onChange={this.handleChangeItemCode} />
        </label>
        <br/>
        <label>
          Description:
          <input type="text" value={this.state.description} onChange={this.handleChangeDescription} />
        </label>
        <br/>
        <label>
         Qty:
          <input type="text" value={this.state.qty} onChange={this.handleChangeQty} />
        </label>
        <button id="b1" onClick ={this.try}>Click me</button>        
      </form>
{/* <div>

  {this.state.data.map((detail,index)=>{
  return <h1>{detail.itemCode}</h1>
})}



</div> */}


         </div>



      );
   }
}
export default Home;