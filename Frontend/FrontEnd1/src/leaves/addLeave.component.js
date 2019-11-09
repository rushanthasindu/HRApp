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
import { leaveAction } from '../_actions';
import { withRouter } from 'react-router-dom';

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

const leaveOptions =[
    { value: 'NonApproved', label: 'Non Approved' },
    { value: 'Approved', label: 'Approved' },
];

const leaveTypeOptions =[
    { value: 'SHORTLEAVE', label: 'Short Leave' },
    { value: 'HALFDAY', label: 'Half Leave' },
    { value: 'MEDICAL', label: 'Medical' },
    { value: 'ALLOCATED', label: 'Allocated' },
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

class AddLeave extends Component {
  
    handleChange = prop => event => {
        const { dispatch } = this.props;
        dispatch(leaveAction.onChangeProps(prop, event));
    };

    componentDidMount() {
        const { match : {params } } = this.props;

        if(params.id){
            const { dispatch } = this.props;
            dispatch(leaveAction.getLeaveById(params.id));
        }
    }


    handleClick(event){
        const { match : {params } } = this.props;
        const { dispatch, authentication } = this.props;

        var dateDiff1 =   new Date(this.props.leave.leaveStart).getTime()-new Date().getTime();    //Future date - current date
        var dateDiff2 = new Date(this.props.leave.leaveEnd).getTime()-new Date().getTime();    //Future date - current date

      if (dateDiff1>0 || dateDiff2>0){
            
        let payload={
                employeeId: this.props.leave.employeeId || authentication.userId,
                leaveStart: this.props.leave.leaveStart,
                leaveEnd: this.props.leave.leaveEnd,
                reason: this.props.leave.reason,
                status: this.props.leave.status || 'NonApproved',
                approvedBy: this.props.leave.approvedBy,
                type: this.props.leave.type,
        }

        if(params.id){
            dispatch(leaveAction.editLeaveInfo(params.id, payload));
        }else{
            dispatch(leaveAction.createLeave(payload));
        }
    
    }
    else alert("Please Add Valied Date!");
    }


   render() {
     const { classes } = this.props;
     const { match : {params } } = this.props;
     console.log(this.props.leave);
     

     function InsertText(props) {
        return <Typography>{'Apply Leave'}</Typography>;
      }
      
      function EditText(props) {
          return <Typography>{`Update Leave`}</Typography>;
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
                                    <Grid item xs={10}>
                                            <TextField
                                                id="leaveStart"
                                                label="Leave Start"
                                                type="date"
                                                className={classes.textField}
                                                defaultValue={`${moment().year()}-${moment().month()}-${moment().day()}`}
                                                value={moment(this.props.leave.leaveStart).format('YYYY-MM-DD')}
                                                onChange={this.handleChange('leaveStart')}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                            />
                                        </Grid>
                                        </Grid>
                                        <Grid container spacing={24}>
                                        <Grid item xs={10}>
                                        <TextField
                                                id="leaveEnd"
                                                label="Leave End"
                                                type="date"
                                                className={classes.textField}
                                                defaultValue={`${moment().year()}-${moment().month()}-${moment().day()}`}
                                                value={moment(this.props.leave.leaveEnd).format('YYYY-MM-DD')}
                                                onChange={this.handleChange('leaveEnd')}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                        />
                                        </Grid>
                                        </Grid> 
                                        <Grid container spacing={24}>
                                        <Grid item xs={10}>

                                        <TextField
                                            id="type"
                                            select
                                            label="Type"
                                            className={classes.textField}
                                            value={this.props.vendor.type || ''}
                                            onChange={this.handleChange('type')}
                                            SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                            }}
                                            helperText="Please select Employee's status"
                                            margin="normal"
                                        >
                                            {leaveTypeOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                                ))}
                                        </TextField>
                                        </Grid>
                                        </Grid>
                                        <Grid container spacing={24}>
                                        <Grid item xs={10}>
                                            <TextField
                                                id="reason"
                                                label="Reason for Leave"
                                                multiline
                                                rowsMax="4"
                                                className={classes.textField}
                                                value={this.props.leave.reason || ''}
                                                onChange={this.handleChange('reason')}
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
                                                    <Button variant="contained" color="secondary" className={classes.button} component='a' href="/leave">
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

AddLeave.propTypes = {
    classes: PropTypes.object.isRequired,
};


//export default BoxCon
const mapStateToProps = (state) =>{
    return state;
}


const connectedAddLeavePage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(AddLeave)));

export { connectedAddLeavePage as AddLeave };