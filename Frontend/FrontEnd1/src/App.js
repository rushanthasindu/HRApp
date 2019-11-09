import React, { Component } from 'react';
import './App.css';
import { Router, Switch, Route} from 'react-router-dom';
import { Vendor } from './vendors/vendor.component';
import { LeaveList } from './leaves/leave.component';
import { ProjectList } from './project/project.component';
import { AddVendor } from './vendors/addvendor.component';
import { AddLeave } from './leaves/addLeave.component';
import { ApproveLeave } from './leaves/approveLeave.component';
import { EditVendor } from './vendors/editVendor.component';
import { AddEditProject } from './project/addEditProject.component';
import  { Login } from './login/';
import { Profile } from './vendors/profile.component';
import { history } from './_helpers';
import { PrivateRoute } from './_components';


class App extends Component {
  render() {
    return (
      <div className="App background  ">
        <Router history={history}>
          <div>            
              <Switch>
                <PrivateRoute exact path='/home' component={Profile} />
                <PrivateRoute exact path='/vendor' component={Vendor} />
                <PrivateRoute exact path='/leave' component={LeaveList} />
                <PrivateRoute exact path='/project' component={ProjectList} />
                <PrivateRoute exact path='/add-vendor' component={AddVendor} />
                <PrivateRoute exact path='/add-leave' component={AddLeave} />
                <PrivateRoute exact path='/add-project' component={AddEditProject} />
                <PrivateRoute exact path='/approve-leave' component={ApproveLeave} />
                <PrivateRoute exact path='/edit-vendor/:id' component={EditVendor} />
                <PrivateRoute exact path='/edit-leave/:id' component={AddLeave} />
                <PrivateRoute exact path='/edit-project/:id' component={AddEditProject} />
                <Route exact path='/' component={Login} />
              </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
