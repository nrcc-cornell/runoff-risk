///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
//import { inject, observer} from 'mobx-react';
import { MuiThemeProvider, createMuiTheme, withStyles, withTheme  } from "@material-ui/core/styles";
import blue from '@material-ui/core/colors/blue';

// import route Components here
import {
  BrowserRouter as Router,
  Route,
  //Link,
  Switch,
  Redirect
} from 'react-router-dom'

// Components
import Header from '../components/Header';
import AboutContents from '../components/AboutContents';
import ToolContents from '../components/ToolContents';
//import MapDisplay from '../components/MapDisplay';
import Footer from '../components/Footer';

// Styles
import '../styles/App.css';

const theme = createMuiTheme({
  //shadows: ["none"],
  shadows: Array(25).fill('none'),
  palette: {
    primary: {
        main: blue[800]
    },
    alternativeTextColor: blue[800],
  },
  overrides: {
    MUIDataTableBodyRow: {
      root: {
        '&:nth-child(odd)': {
          backgroundColor: '#D3D3D3'
        }
      }
    },
  },
});

const styles = theme => ({
  root: {}
});

//var app;

//@inject('store') @observer
class App extends Component {

    //constructor(props) {
    //    super(props);
    //    app = this.props.store.app;
    //}

    render() {

        return (
          <Router basename={process.env.PUBLIC_URL}>
            <MuiThemeProvider theme={theme}>
              <div className="App">
                <Header />

                <Switch>
                  <Route exact path="/" render={(props) => <ToolContents {...props} />} />
                  <Route exact path="/forecasts" render={(props) => <ToolContents {...props} />} />
                  <Route path="/about" component={AboutContents} />
                  <Route render={() => <Redirect to="/" />} />
                </Switch>

                <Footer />
              </div>
            </MuiThemeProvider>
          </Router>
        );

    }
}

export default withStyles(styles)(withTheme(App));
