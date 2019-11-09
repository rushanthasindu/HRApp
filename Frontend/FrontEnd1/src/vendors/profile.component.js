import React, { Component } from 'react';
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
import { vendorAction } from '../_actions';
import { withRouter } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { red } from '@material-ui/core/colors';

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

const allocationOptions =[
    { value: 'ALLOCATED', label: 'Allocated' },
    { value: 'FREE', label: 'Non Allocated' },
];

const RoleOptions =[
    { value: 'GM', label: 'Project Manager' },
    { value: 'EMPLOYEE', label: 'Employee' },
    { value: 'ADMIN', label: 'Admin' },
];

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
      color :red,
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
    // backgroundColor: "lightblue",
    // // backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class Profile extends Component {
  
    handleChange = prop => event => {
        const { dispatch } = this.props;
        dispatch(vendorAction.onChangeProps(prop, event));
    };

    componentDidMount() {
        const { match : {params } } = this.props;
        const { dispatch, authentication } = this.props;
        console.log(this.props);

        const { userId } = authentication;

        dispatch(vendorAction.getManagerList());
        dispatch(vendorAction.getVendorById(userId));
       
    }


    handleClick(event){
        const { match : {params } } = this.props;
        const { dispatch, authentication } = this.props;
        const { userId } = authentication;
            
        let payload={
                firstName: this.props.vendor.firstName,
                lastName: this.props.vendor.lastName,
                address: this.props.vendor.address,
                city: this.props.vendor.city,
                country: this.props.vendor.country,
                postalCode: this.props.vendor.postalCode,
                status: this.props.vendor.status,
                skills: this.props.vendor.skills,
                email: this.props.vendor.email,
                role: this.props.vendor.role,
                manager: this.props.vendor.manager,
                password: this.props.vendor.password,
                numOfProject: this.props.vendor.numOfProject,
                reliability: this.props.vendor.numOfProject,
                createdAt: this.props.vendor.numOfProject,

        }

        dispatch(vendorAction.editVendorInfo(userId, payload));
        
    }


   render() {
     const { classes } = this.props;
     const { match : {params } } = this.props;
     console.log(this.props.vendor);
     

     function InsertText(props) {
        return <Typography>{'Add New Employee'}</Typography>;
      }
      
      function EditText(props) {
          return <Typography>{`Profile`}</Typography>;
      }


    function SegHeader() {
        return <EditText />;
    }
     
      return (

        <div>
        
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
                                    <Grid item xs={6}>
                                            <TextField
                                                id="firstName"
                                                label="First Name"
                                                multiline
                                                rowsMax="4"
                                                //className={classes.textField}
                                                value={this.props.vendor.firstName || ''}
                                                onChange={this.handleChange('firstName')}
                                                //margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="lastName"
                                                label="Last Name"
                                                multiline
                                                rowsMax="4"
                                                className={classes.textField}
                                                value={this.props.vendor.lastName || ''}
                                                onChange={this.handleChange('lastName')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        </Grid>
                                        <Grid container spacing={24}>
                                        <Grid item xs={6}>
                                        <TextField
                                            disabled
                                            id="status"
                                            select
                                            label="Status"
                                            className={classes.textField}
                                            value={this.props.vendor.status || ''}
                                            onChange={this.handleChange('status')}
                                            SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                            }}
                                            helperText="Please select Employee's status"
                                            margin="normal"
                                        >
                                            {allocationOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                                ))}
                                        </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                   
                                    <InputLabel htmlFor="select-multiple">Skills</InputLabel>
                                        <Select
                                            disabled
                                            multiple
                                            value={this.props.vendor.skills || []}
                                            onChange={this.handleChange('skills')}
                                            input={<Input id="select-multiple" />}
                                            MenuProps={MenuProps}
                                            >
                                            {skillsMap.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        </Grid>
                                       
                                    </Grid>
                                    <Grid container spacing={24}>
                                     <Grid item xs={6}>
                                            <TextField
                                                disabled
                                                id="reliability"
                                                label="Reliability"
                                                multiline
                                                rowsMax="4"
                                                className={classes.textField}
                                                value={this.props.vendor.reliability}
                                                onChange={this.handleChange('reliability')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                disabled
                                                id="numOfProject"
                                                label="Projects"
                                                multiline
                                                rowsMax="4"
                                                className={classes.textField}
                                                value={this.props.vendor.numOfProject || 0}
                                                onChange={this.handleChange('numOfProject')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        </Grid>
                                        <Grid container spacing={24}>
                                     <Grid item xs={6}>
                                            <TextField
                                                id="address"
                                                label="Address"
                                                multiline
                                                rowsMax="4"
                                                className={classes.textField}
                                                value={this.props.vendor.address || ''}
                                                onChange={this.handleChange('address')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="city"
                                                label="City"
                                                multiline
                                                rowsMax="4"
                                                className={classes.textField}
                                                value={this.props.vendor.city || ''}
                                                onChange={this.handleChange('city')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        </Grid>
                                        <Grid container spacing={24}>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="country"
                                                label="Country"
                                                multiline
                                                rowsMax="4"
                                                className={classes.textField}
                                                value={this.props.vendor.country || ''}
                                                onChange={this.handleChange('country')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="postalCode"
                                                label="Postal Code"
                                                multiline
                                                rowsMax="4"
                                                className={classes.textField}
                                                value={this.props.vendor.postalCode || ''}
                                                onChange={this.handleChange('postalCode')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        </Grid>
                                        <Grid container spacing={24}>
                                        <Grid item xs={6}>
                                        <TextField
                                            disabled
                                            id="role"
                                            select
                                            label="Role"
                                            className={classes.textField}
                                            value={this.props.vendor.role || ''}
                                            onChange={this.handleChange('role')}
                                            SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                            }}
                                            helperText="Please select Employee Role"
                                            margin="normal"
                                        >
                                            {RoleOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                                ))}
                                        </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                        <TextField
                                            id="manager"
                                            disabled
                                            select
                                            label="Manager"
                                            className={classes.textField}
                                            value={this.props.vendor.manager}
                                            onChange={this.handleChange('manager')}
                                            SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                            }}
                                            helperText="Please select Manager for Employee"
                                            margin="normal"
                                        >
                                            {this.props.vendor.managerList.map(manager => (
                                                <option key={manager._id} value={manager._id}>
                                                    {manager.firstName} {manager.lastName}
                                                </option>
                                                ))}
                                        </TextField>
                                        </Grid>
                                        </Grid>
                                        <Grid container spacing={24}>
                                        <Grid item xs={6}>
                                        <TextField
                                                id="email"
                                                label="User Name (Email)"
                                                multiline
                                                rowsMax="4"
                                                className={classes.textField}
                                                value={this.props.vendor.email || ''}
                                                onChange={this.handleChange('email')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                    type="password"
                                                    id="password"
                                                    label="Password"
                                                    autoComplete="current-password"
                                                    className={classes.textField}
                                                    value={this.props.vendor.password || ''}
                                                    onChange={this.handleChange('password')}
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
                                                    <Button variant="contained" color="secondary" className={classes.button} component='a' href="/vendor">
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
        
        </div>
      );
   }
}

//export default Home;

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};


//export default BoxCon
const mapStateToProps = (state) =>{
    return state;
}


const connectedProfileVendorPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(Profile)));

export { connectedProfileVendorPage as Profile };