
import { connect } from 'react-redux';
import moment from 'moment';
import { getFormattedEmployeeList } from '../_helpers/index';
import { projectAction } from '../_actions';
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


class ProjectList extends Component {
    
    componentDidMount() {
        const { dispatch, userId, userRole } = this.props;
        // if (userRolele !== 'EMPLOYEE') {
        //   dispatch(leaveAction.getLeaveListByManager(userId));
        // }
        dispatch(projectAction.getAllEmployeeList());
        dispatch(projectAction.getProjectList());        
    }
    
      handleChange = event => {
        this.setState({
          anchor: event.target.value,
        });
      };


      handleClick = (event, id) => {
        console.log(id);
        const { dispatch } = this.props;
        dispatch(projectAction.deleteProjectById(id))
      };
    
   render() {
     const { classes, userRole, userId } = this.props;
     const { projectList, employeeList } = this.props.project;
     
      return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
            <AppBar title={'Project List'}/>
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
                      <Button variant="contained" color="primary" className={classes.button} component='a' href="/add-project">
                        Create Project 
                      </Button>      
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={24}>
                  <Paper className={classes.root}>
                      <Table className={classes.table}>
                          <TableHead>
                          <TableRow>
                              <TableCell>Project Name</TableCell>
                              <TableCell>Start Date</TableCell>
                              <TableCell>Deadline</TableCell>
                              <TableCell>Actual Completion Date</TableCell>
                              <TableCell>Technologies</TableCell>
                              <TableCell>Allocation</TableCell>
                              <TableCell>Completion Rate</TableCell>
                              <TableCell>Action</TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                          {projectList.map(project => {
                              return (
                              <TableRow key={project._id}>
                                  <TableCell>{project.projectName}</TableCell>
                                  <TableCell component="th" scope="row">
                                  {moment(project.startDate).format('YYYY-MM-DD')}
                                  </TableCell>
                                  <TableCell>{moment(project.endDate).format('YYYY-MM-DD')}</TableCell>
                                  <TableCell>{project.actualCompletionDate? moment(project.actualCompletionDate).format('YYYY-MM-DD') : '-'}</TableCell>
                                  <TableCell>{project.type}</TableCell>
                                  <TableCell>{getFormattedEmployeeList(employeeList, project.allocation)}</TableCell>
                                  <TableCell>{project.completionRate}</TableCell>
                                  <TableCell>
                                    <IconButton className={classes.button} aria-label="Edit" component='a' href={`/edit-project/${project._id}`}>
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton className={classes.button} aria-label="Delete" onClick={(event) => this.handleClick(event, project._id)}>
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


ProjectList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { userId, userRole } = state.authentication;  
  return {
      project : state.project,
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

const connectedProjectPage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(ProjectList)));

export { connectedProjectPage as ProjectList };