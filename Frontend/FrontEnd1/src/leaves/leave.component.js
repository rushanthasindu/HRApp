
import { connect } from 'react-redux';
import moment from 'moment';
import { leaveAction } from '../_actions';
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
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
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
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },

  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});


class LeaveList extends Component {
    
    componentDidMount() {
        const { dispatch, userId, userRole } = this.props;
        // if (userRolele !== 'EMPLOYEE') {
        //   dispatch(leaveAction.getLeaveListByManager(userId));
        // }
        dispatch(leaveAction.getLeaveListByEmployee(userId));        
    }
    
      handleChange = event => {
        this.setState({
          anchor: event.target.value,
        });
      };


      handleClick = (event, id) => {
        console.log(id);
        const { dispatch } = this.props;
        dispatch(leaveAction.deleteLeaveById(id))
      };
    
   render() {
     const { classes, userRole, userId } = this.props;
     const { leaveList } = this.props.leave;
     
      return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
            <AppBar title={'Leave List'}/>
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
                    {/* <Grid item xs={3}>
                      {
                        (userRole !== 'EMPLOYEE') ? 
                          <Button variant="contained" color="primary" className={classes.button} component='a' href="/approve-leave">
                            Approve Leaves 
                          </Button> : ''
                      
                      } 
                    </Grid>*/}
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={3} container justify="flex-end">
                    {
                      (userRole !== 'ADMIN') ?
                      <Button variant="contained" color="primary" className={classes.button} component='a' href="/add-leave">
                        Apply Leave 
                      </Button>    :''  
                    }
                    </Grid>
                    <Grid item xs={3}>
                      {
                        (userRole !== 'EMPLOYEE' ||userRole !== 'MINERSTAFF') ? 
                          <Button variant="contained" color="primary" className={classes.button} component='a' href="/approve-leave">
                            Approve Leaves 
                          </Button> : ''
                      
                      }
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={24}>
                  <Paper className={classes.root}>
                      <Table className={classes.table}>
                          <TableHead>
                          <TableRow>
                              <TableCell>Leave Start</TableCell>
                              <TableCell>Leave End</TableCell>
                              <TableCell>Reason</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Action</TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                          {leaveList.map(leave => {
                              return (
                              <TableRow key={leave._id}>
                                  <TableCell component="th" scope="row">
                                  {moment(leave.leaveStart).format('YYYY-MM-DD')}
                                  </TableCell>
                                  <TableCell>{moment(leave.leaveEnd).format('YYYY-MM-DD')}</TableCell>
                                  <TableCell>{leave.reason}</TableCell>
                                  <TableCell>{leave.status}</TableCell>
                                  <TableCell>
                                    <IconButton className={classes.button} aria-label="Edit" component='a' href={`/edit-leave/${leave._id}`}>
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton className={classes.button} aria-label="Delete" onClick={(event) => this.handleClick(event, leave._id)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                              </TableRow>
                              );
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


LeaveList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { userId, userRole } = state.authentication;  
  return {
      leave : state.leave,
      userId,
      userRole,
  };
}

// const mapStateToProps = (state) =>{
//     const { loggingIn } = state.authentication;
//     return {
//         loggingIn
//     };
// }

const connectedLeavePage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(LeaveList)));

export { connectedLeavePage as LeaveList };