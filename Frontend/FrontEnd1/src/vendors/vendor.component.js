import { connect } from 'react-redux';
import { vendorAction } from '../_actions';
import React, { Component } from 'react';
import AppBar from '../_components/appbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Nav from '../_components/nav'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';

const drawerWidth = 240;


const styles = theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: "#00c5fb",
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    // backgroundColor: "#00c5fb",
  
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,

  },
  'appBar-left': {
    marginLeft: drawerWidth,
    
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    backgroundColor: "#00c5fb",
  
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "gray",
    padding: theme.spacing.unit * 3,
   
  },

  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: "gray",
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,

  },
  
});
const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

class Vendor extends Component {
    
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(vendorAction.getVendor());
    }
    
      handleChange = event => {
        this.setState({
          anchor: event.target.value,
        });
      };


      handleClick = (event, id) => {
        console.log(id);
        const { dispatch } = this.props;
        dispatch(vendorAction.deleteVendorById(id))
      };
    
   render() {
     const { classes } = this.props;
     const { vendor } = this.props.vendor;
     
      return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
            <AppBar title={'Employee List'}/>
            <Nav />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={24}>

                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={3} container justify="flex-end">
                            
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={3} container justify="flex-end">
                      <Button variant="contained" color="primary" className={classes.button} component='a' href="/add-vendor">
                        New Employee 
                      </Button>      
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={24}>
                  <Paper className={classes.root}>
                    <h2 style={{textAlign: 'left'}}>ADMIN</h2>
                      <Table className={classes.table}>
                          <TableHead>
                          <TableRow >
                              <StyledTableCell>Employee ID</StyledTableCell>
                              <StyledTableCell>First Name</StyledTableCell>
                              <StyledTableCell>Last Name</StyledTableCell>
                              <StyledTableCell>Email</StyledTableCell>
                              <StyledTableCell numeric>Project</StyledTableCell>
                              <StyledTableCell numeric>Reliability</StyledTableCell>
                              <StyledTableCell>Status</StyledTableCell>
                              <StyledTableCell>Action</StyledTableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                          {vendor.map(employee => {
                            if (employee.role=="ADMIN"){
                              return (
                              <TableRow key={employee._id}>
                                <TableCell component="th" scope="row">
                                  {employee.empId}
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                  {employee.firstName}
                                  </TableCell>
                                  <TableCell>{employee.lastName}</TableCell>
                                  <TableCell email>{employee.email}</TableCell>
                                  <TableCell numeric>{employee.numOfProject}</TableCell>
                                  <TableCell numeric>{employee.reliability}</TableCell>
                                  <TableCell>{employee.status}</TableCell>
                                  <TableCell>
                                    <IconButton className={classes.button} aria-label="Edit" component='a' href={`/edit-vendor/${employee._id}`}>
                                      <EditIcon />
                                    </IconButton>
                                    
                                  </TableCell>
                              </TableRow>
                              );
                            }
                          })}
                          </TableBody>
                      </Table>
                      <h2 style={{textAlign: 'left'}}>Project Manager</h2>
                      <Table className={classes.table}>
                          <TableHead>
                          <TableRow >
                              <StyledTableCell>Employee ID</StyledTableCell>
                              <StyledTableCell>First Name</StyledTableCell>
                              <StyledTableCell>Last Name</StyledTableCell>
                              <StyledTableCell>Email</StyledTableCell>
                              <StyledTableCell numeric>Project</StyledTableCell>
                              <StyledTableCell numeric>Reliability</StyledTableCell>
                              <StyledTableCell>Status</StyledTableCell>
                              <StyledTableCell>Action</StyledTableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                          {vendor.map(employee => {
                            if (employee.role=="GM"){
                              return (
                              <TableRow key={employee._id}>
                                <TableCell component="th" scope="row">
                                  {employee.empId}
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                  {employee.firstName}
                                  </TableCell>
                                  <TableCell>{employee.lastName}</TableCell>
                                  <TableCell email>{employee.email}</TableCell>
                                  <TableCell numeric>{employee.numOfProject}</TableCell>
                                  <TableCell numeric>{employee.reliability}</TableCell>
                                  <TableCell>{employee.status}</TableCell>
                                  <TableCell>
                                    <IconButton className={classes.button} aria-label="Edit" component='a' href={`/edit-vendor/${employee._id}`}>
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton className={classes.button} aria-label="Delete" onClick={(event) => this.handleClick(event, employee._id)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                              </TableRow>
                              );
                            }
                          })}
                          </TableBody>
                      </Table>
                      <h2 style={{textAlign: 'left'}}>Employee</h2>
                      <Table className={classes.table}>
                          <TableHead>
                          <TableRow >
                              <StyledTableCell>Employee ID</StyledTableCell>
                              <StyledTableCell>First Name</StyledTableCell>
                              <StyledTableCell>Last Name</StyledTableCell>
                              <StyledTableCell>Email</StyledTableCell>
                              <StyledTableCell numeric>Project</StyledTableCell>
                              <StyledTableCell numeric>Reliability</StyledTableCell>
                              <StyledTableCell>Status</StyledTableCell>
                              <StyledTableCell>Action</StyledTableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                          {vendor.map(employee => {
                            if (employee.role=="EMPLOYEE"){
                              return (
                              <TableRow key={employee._id}>
                                <TableCell component="th" scope="row">
                                  {employee.empId}
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                  {employee.firstName}
                                  </TableCell>
                                  <TableCell>{employee.lastName}</TableCell>
                                  <TableCell email>{employee.email}</TableCell>
                                  <TableCell numeric>{employee.numOfProject}</TableCell>
                                  <TableCell numeric>{employee.reliability}</TableCell>
                                  <TableCell>{employee.status}</TableCell>
                                  <TableCell>
                                    <IconButton className={classes.button} aria-label="Edit" component='a' href={`/edit-vendor/${employee._id}`}>
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton className={classes.button} aria-label="Delete" onClick={(event) => this.handleClick(event, employee._id)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                              </TableRow>
                              );
                            }
                          })}
                          </TableBody>
                      </Table>
                  </Paper>
                </Grid>
            </main>
            </div>
        </div>
      );
   }
}


Vendor.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) =>{
  return {
      vendor : state.vendor
  };
}

const connectedVendorPage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(Vendor)));

export { connectedVendorPage as Vendor };