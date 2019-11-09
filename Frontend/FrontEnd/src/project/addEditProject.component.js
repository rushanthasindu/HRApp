import React, { Component } from 'react';
import moment from 'moment';
import AppBar from '../_components/appbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Nav from '../_components/nav'; 
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { projectAction } from '../_actions';
import { vendorAction } from '../_actions';
import { withRouter } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const drawerWidth = 240;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

const skillsMap =[
    { value: 'node', label: 'Node JS' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'react', label: 'React JS' },
];

const styles = theme => ({

    root: {
        flexGrow: 1,
      },

  contentRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
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
});

class AddEditProject extends Component {
  
    handleChange = prop => event => {
        const { dispatch } = this.props;
        dispatch(projectAction.onChangeProps(prop, event));
        if (prop === 'technology') {
            dispatch(projectAction.getEmployeesBySkill(event.target.value));
        } 
    };

    componentDidMount() {
        const { match : {params } } = this.props;

        if(params.id){
            const { dispatch } = this.props;
            dispatch(projectAction.getProjectById(params.id));
            dispatch(projectAction.getAllEmployeeList());
        }
    }


    handleClick(event){
        const { match : {params } } = this.props;
        const { dispatch, authentication } = this.props;
            
        let payload={
               // id: this.props.project._id,
                projectId: this.props.project.projectId,
                projectName: this.props.project.projectName,
                startDate: this.props.project.startDate,
                endDate: this.props.project.endDate,
                actualCompletionDate: this.props.project.actualCompletionDate,
                type: this.props.project.technology,
                allocation: this.props.project.allocation,
                customerName: this.props.project.customerName,
                customerContact: this.props.project.customerContact,
                customerEmail: this.props.project.customerEmail,
                comment: this.props.project.comment,
                completionRate: this.props.project.completionRate

        }
console.log(payload);
        if(params.id){
            dispatch(projectAction.editProjectInfo(params.id, payload));
        }else{
            dispatch(projectAction.createProject(payload));
            for (const employeeId of payload.allocation) {
                dispatch(projectAction.updateProjectCount(employeeId))
            }
        }
    }


   render() {
     const { classes } = this.props;
     const { match : {params } } = this.props;
     console.log(this.props.project);
     const employeeList = this.props.project.skilledEmployeeList.length <= 0 ? this.props.project.employeeList :
     this.props.project.skilledEmployeeList

     function InsertText(props) {
        return <Typography>{'Create Project'}</Typography>;
      }
      
      function EditText(props) {
          return <Typography>{`Edit Project Details`}</Typography>;
      }


    function SegHeader() {
        if(params.id){
            return <EditText />;
        }
        return <InsertText />;
    }
     
      return (
        
        <div className={classes.root}>
            <div className={classes.appFrame}>
            <AppBar/>
            <Nav />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <SegHeader />
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={3} container justify="flex-end">                            
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <div>
                            <Paper className={classes.contentRoot} elevation={1}>
                                <form className={classes.container}>
                                <Grid container spacing={24}>
                                        <Grid item xs={5}>
                                            <TextField
                                                id="projectName"
                                                label="Project Name"
                                                multiline
                                                rowsMax="2"
                                                className={classes.textField}
                                                value={this.props.project.projectName || ''}
                                                onChange={this.handleChange('projectName')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <TextField
                                                id="customerName"
                                                label="Customer Name"
                                                multiline
                                                rowsMax="2"
                                                className={classes.textField}
                                                value={this.props.project.customerName || ''}
                                                onChange={this.handleChange('customerName')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <TextField
                                                id="customerContact"
                                                label="Customer Contact No"
                                                multiline
                                                rowsMax="2"
                                                className={classes.textField}
                                                value={this.props.project.customerContact || ''}
                                                onChange={this.handleChange('customerContact')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <TextField
                                                id="customerEmail"
                                                label="Customer Email"
                                                multiline
                                                rowsMax="2"
                                                className={classes.textField}
                                                value={this.props.project.customerEmail || ''}
                                                onChange={this.handleChange('customerEmail')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        </Grid>
                                    <Grid container spacing={24}>
                                    <Grid item xs={10}>
                                            <TextField
                                                id="startDate"
                                                label="Project Start Date"
                                                type="date"
                                                className={classes.textField}
                                                defaultValue={`${moment().year()}-${moment().month()}-${moment().day()}`}
                                                value={moment(this.props.project.startDate).format('YYYY-MM-DD')}
                                                onChange={this.handleChange('startDate')}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                            />
                                        </Grid>
                                        </Grid>
                                        <Grid container spacing={24}>
                                        <Grid item xs={10}>
                                        <TextField
                                                id="endDate"
                                                label="DeadLine"
                                                type="date"
                                                className={classes.textField}
                                                defaultValue={`${moment().year()}-${moment().month()}-${moment().day()}`}
                                                value={moment(this.props.project.endDate).format('YYYY-MM-DD')}
                                                onChange={this.handleChange('endDate')}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                            />
                                        </Grid>
                                        </Grid>
                                        <Grid container spacing={24}>
                                        <Grid item xs={10}>
                                            <TextField
                                                    id="actualCompletionDate"
                                                    label="Actual Completion Date"
                                                    type="date"
                                                    className={classes.textField}
                                                    value={moment(this.props.project.actualCompletionDate).format('YYYY-MM-DD')}
                                                    onChange={this.handleChange('actualCompletionDate')}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                        }}
                                                />
                                        </Grid>
                                        </Grid>
                                        <Grid container spacing={24}>
                                        <Grid item xs={10}>
                                        <TextField
                                            id="technology"
                                            select
                                            label="Technology"
                                            className={classes.textField}
                                            value={this.props.project.technology || ''}
                                            onChange={this.handleChange('technology')}
                                            SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                            }}
                                            helperText="Please select Technology used in Project"
                                            margin="normal"
                                        >
                                            {skillsMap.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                                ))}
                                        </TextField>
                                        </Grid>
                                        </Grid>
                                        <Grid container spacing={24}>
                                        <Grid item xs={10}>
                                        <InputLabel htmlFor="select-multiple">Allocation</InputLabel>
                                        <Select
                                            multiple
                                            value={this.props.project.allocation || []}
                                            onChange={this.handleChange('allocation')}
                                            input={<Input id="select-multiple" />}
                                            MenuProps={MenuProps}
                                            >
                                            {(employeeList).map(employee => (
                                                <MenuItem key={employee._id} value={employee._id}>
                                                {`${employee.firstName} ${employee.lastName} - ${employee.reliability}`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="comment"
                                                label="Comments(Task(s))"
                                                multiline
                                                rowsMax="2"
                                                className={classes.textField}
                                                value={this.props.project.comment || ''}
                                                onChange={this.handleChange('comment')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid container spacing={24}>
                                        <Grid item xs={10}>
                                            <TextField
                                                id="completionRate"
                                                label="Completion Rate"
                                                multiline
                                                rowsMax="2"
                                                className={classes.textField}
                                                value={this.props.project.completionRate || ''}
                                                onChange={this.handleChange('completionRate')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        </Grid>
                                    <br />
                                    <Grid container spacing={24}>
                                        <Grid item xs={3}>
                                        </Grid>
                                        <Grid item xs={6}>
                                        </Grid>
                                        <Grid item xs={3} container justify="center">
                                            <Grid container spacing={24}>
                                                <Grid item xs={6} container justify="center">
                                                    <Button variant="contained" color="secondary" className={classes.button} component='a' href="/project">
                                                        Cancel
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6} container justify="flex-start">
                            
                                                    <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.handleClick(event)}>
                                                        Save
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </form>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            </main>
            </div>
        </div>
      );
   }
}

//export default Home;

AddEditProject.propTypes = {
    classes: PropTypes.object.isRequired,
};


//export default BoxCon
const mapStateToProps = (state) =>{
    return state;
}


const connectedAddEditProjectPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(AddEditProject)));

export { connectedAddEditProjectPage as AddEditProject };