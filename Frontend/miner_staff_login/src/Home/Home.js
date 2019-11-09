import React from 'react'
class Home extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
          itemCode: '',
          description: '',
          qty :10,
          error: null,
          isLoaded: true,
          items: []
      };
     
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
      console.log(event.target.itemCode);
      this.setState({itemCode: event.target.value});
    }
    handleChangeDescription(event) {
      this.setState({description: event.target.value});
    }
    handleChangeQty(event) {
      this.setState({qty: event.target.value});
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
          items: responseJson
         })
      //console.log(this.state.data);
      })
      .catch((error) => {
         this.setState({
          items: '0'
      })
      });
      
      }


    handleSubmit(event) {
      //alert(' UserName: ' + this.state.userName+'Password: ' + this.state.password);
      console.log(this.state.description);
      fetch('http://localhost:3001/inventry/addNew/?itemCode='+this.state.itemCode+'&description='+this.state.description+'&qty='+this.state.qty+'', {
        method: 'GET'
     })
     .then((response) => response.json())
     .then((responseJson) => {
        
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
     this.componentDidMount();
    }
   
  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
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
  <table>
    <thead>
    <tr>
      <th>ItemCode</th>
      <th>Descriprion</th>
      <th>Qty</th>
    </tr>
    </thead>
    <tbody>
          {items.map(item => (
          <tr > 
            <td >
              {item.itemCode} 
          </td>
          <td >
              {item.description} 
          </td>
          <td >
              {item.qty} 
          </td>
          </tr> 
          ))} 

          </tbody>
      
          </table>
       
        </div>
 
      );
    }
  }
}
export default Home;