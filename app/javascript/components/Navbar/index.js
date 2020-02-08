import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Button, Grid, Drawer } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import UnloopLogo from 'images/unloop_logo.png';
import axios from 'axios';
import styles from './styles';

class Navbar extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.navigateToHomepage = this.navigateToHomepage.bind(this);
  }

  logout() {
    //   TODO: Sign out is not working
    const path = '/users/sign_out';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X_CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      },
      withCredentials: true,
    };
    axios
      .get(path, { ...config })
      .then(() => {
        this.navigateToHomepage();
      })
      .catch(error => console.error(error));
  }

  navigateToHomepage() {
    const homepagePath = '/';
    window.location.href = homepagePath;
  }

  render() {
    const { classes } = this.props;

    return (
      <Drawer className={classes.drawer} variant="permanent">
        <Grid
          container
          item
          xs={1}
          className={classes.navBar}
          direction="column"
          alignItems="center"
          justify="space-between"
        >
          <Grid container item alignItems="center" direction="column">
            <Grid item>
              <Button
                component="a"
                disableFocusRipple
                disableTouchRipple
                className={classes.navBarSignOut}
                onClick={this.logout}
              >
                Sign Out
              </Button>
            </Grid>
            <Grid item>
              <IconButton
                disableFocusRipple
                disableTouchRipple
                className={classes.navBarItem}
                onClick={this.navigateToHomepage}
              >
                <HomeIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item className={classes.unloopLogo}>
            <img src={UnloopLogo} alt="Unloop Logo" />
          </Grid>
        </Grid>
      </Drawer>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
