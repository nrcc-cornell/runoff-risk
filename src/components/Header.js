///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { withRouter } from "react-router-dom";
//import { inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    marginLeft: 0,
  },
  tab: {
    minWidth: 120,
    width: 120,
  },
  headerText: {
    color: blue[800],
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  subHeaderText: {
    color: blue[800],
    fontSize: '16px'
  },
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  bottomToolbar: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  titleLong: {
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  titleShort: {
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
});

//var app;

//@inject('store') @observer
class Header extends React.Component {

  //constructor(props) {
  //    super(props);
  //    app = this.props.store.app;
  //}

  getActiveTabIndex = () => {
    //console.log(this.props.history)
    //console.log(this.props.history.location.pathname)
    if (this.props.history.location.pathname==='/') {
      return 0
    } else if (this.props.history.location.pathname==='/forecast') {
      return 0
    } else if (this.props.history.location.pathname==='/howto') {
      return 1
    } else if (this.props.history.location.pathname==='/about') {
      return 2
    } else {
    }
  }

  handleChange = (event, value) => {
    //this.setState({ value });
    if (value===0) {
        // go to home (forecast) page
        this.props.history.push('/');
    } else if (value===1) {
        // go to howto page
        this.props.history.push('/howto');
    } else if (value===2) {
        // go to about page
        this.props.history.push('/about');
    } else {
        // go to home (forecast) page
        this.props.history.push('/');
    }
    //this.props.store.app.setActivePage(value);
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    //const { classes, theme } = this.props;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <div className={classes.titleLong} onClick={() => {this.props.history.push('/')}}>
                <Typography variant="h1" className={classes.headerText}>
                        Nutrient Applicator Forecast For New York State
                </Typography>
                <Typography variant="h2" className={classes.subHeaderText}>
                        Decision support tool for managing nutrient runoff risk
                </Typography>
            </div>
            <div className={classes.titleShort} onClick={() => {this.props.history.push('/')}}>
                <Typography variant="h1" className={classes.headerText}>
                        NYS Applicator Forecast
                </Typography>
                <Typography variant="h2" className={classes.subHeaderText}>
                        Support for managing runoff risk
                </Typography>
            </div>
            <section className={classes.rightToolbar}>
              <Tabs
                value={this.getActiveTabIndex()}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="standard"
              >
                <Tab classes={{ root: classes.tab }} label="FORECAST" value={0} />
                <Tab classes={{ root: classes.tab }} label="HOW TO" value={1} />
                <Tab classes={{ root: classes.tab }} label="ABOUT" value={2} />
              </Tabs>
            </section>
          </Toolbar>
          <div className={classes.bottomToolbar}>
              <Tabs
                value={this.getActiveTabIndex()}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="standard"
              >
                <Tab label="FORECAST" value={0} />
                <Tab label="HOW TO" value={1} />
                <Tab label="ABOUT" value={2} />
              </Tabs>
          </div>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  //theme: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Header));
