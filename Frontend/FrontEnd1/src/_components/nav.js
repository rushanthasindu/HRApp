import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { userActions } from "../_actions";
import { connect } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";
import LogoutIcon from "@material-ui/icons/HighlightOff";
import VendorIcon from "@material-ui/icons/CardTravel";
import LeaveIcon from "@material-ui/icons/ExitToApp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import sidebarStyle from "../styles/sidebarStyle.jsx";
import { whiteColor } from "../styles/material-dashboard-react";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#00c5fb",
  
  },
  appFrame: {
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: "#039dfc",
  },
  "appBar-left": {
    marginLeft: drawerWidth
  },
  "appBar-right": {
    marginRight: drawerWidth
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
    // backgroundColor: "#144696",
    
  },
   toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "#00c5fb",
    padding: theme.spacing.unit * 3
  }
});

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: "left"
    };
  }

  logout = event => {
    const { dispatch } = this.props;
    console.log(this.props);
    console.log(localStorage.getItem("auth"));
    dispatch(userActions.logout());
  };

  render() {
    const { classes, authentication } = this.props;
    const { anchor } = this.state;
    const userRole = localStorage.getItem("userRole") || "ADMIN";
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor={anchor}
      >
        {userRole === "EMPLOYEE" ? (
          <List component="nav" >
            <ListItem button component="a" href="/home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText style={{color: "red"}} primary="Home" />
            </ListItem>

            <ListItem button component="a" href="/leave">
              <ListItemIcon>
                <LeaveIcon />
              </ListItemIcon>
              <ListItemText primary="Leaves" />
            </ListItem>

            <ListItem button component="a" href="http://192.168.8.100:3006">
              <ListItemIcon>
                <LeaveIcon />
              </ListItemIcon>
              <ListItemText primary="Inventry" />
            </ListItem>

            <ListItem button component="a" href="http://192.168.8.100:5000">
              <ListItemIcon>
                <LeaveIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>


            <ListItem
              button
              onClick={event => {
                this.logout();
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        ) : (
          <List component="nav">
            <ListItem button component="a" href="/home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem button component="a" href="/vendor">
              <ListItemIcon>
                <VendorIcon />
              </ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItem>

            <ListItem button component="a" href="/leave">
              <ListItemIcon>
                <LeaveIcon />
              </ListItemIcon>
              <ListItemText primary="Leaves" />
            </ListItem>

            <ListItem button component="a" href="/project">
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItem>

            <ListItem
              button
              onClick={event => {
                this.logout();
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        )}
        <Divider />
      </Drawer>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { loggingIn, userRole } = state.authentication;
  return {
    loggingIn
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Navigation));
