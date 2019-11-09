
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
import ApproveIcon from '@material-ui/icons/ThumbUp';
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


class ApproveLeave extends Component {
    
    componentDidMount() {
        const { dispatch, userId, userRole } = this.props;
        dispatch(leaveAction.getLeaveListByManager(userId));        
    }
    
      handleChange = event => {
        this.setState({
          anchor: event.target.value,
        });
      };


      handleClick = (event, id) => {
        console.log(id);
        const { dispatch, userId } = this.props;
        dispatch(leaveAction.approveLeave(id, userId));
      };
    
   render() {
     const { classes, userRole, userId } = this.props;
     const { approvalList } = this.props.leave;
     
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
                <br />
                <br />
                <Grid container spacing={24}>
                  <Paper className={classes.root}>
                      <Table className={classes.table}>
                          <TableHead>
                          <TableRow>
                              <TableCell>Employee ID</TableCell>
                              <TableCell>Leave Start</TableCell>
                              <TableCell>Leave End</TableCell>
                              <TableCell>Reason</TableCell>
                              <TableCell>Action</TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                          {approvalList.map(leave => {
                             if (leave.status !="Approved"){
                              return (
                              <TableRow key={leave._id}>
                                <TableCell component="th" scope="row">
                                  {leave.employeeId}
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                  {moment(leave.leaveStart).format('YYYY-MM-DD')}
                                  </TableCell>
                                  <TableCell>{moment(leave.leaveEnd).format('YYYY-MM-DD')}</TableCell>
                                  <TableCell>{leave.reason}</TableCell>
                                  <TableCell>
                                    <IconButton className={classes.button} aria-label="Approve" onClick={(event) => this.handleClick(event, leave._id)}>
                                      <ApproveIcon />
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


ApproveLeave.propTypes = {
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

const connectedApproveLeavePage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(ApproveLeave)));

export { connectedApproveLeavePage as ApproveLeave };