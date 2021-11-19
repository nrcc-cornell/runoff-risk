import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    //padding: theme.spacing.unit * 2,
    padding: theme.spacing(2),
  },
  DisclaimerText: {
    color: 'red',
    fontSize: '16px',
    fontWeight: 'normal',
  },
});

class Disclaimer extends Component {

  constructor(props) {
      super(props);
      this.state = {
      };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
            <Grid container className={classes.root} spacing={4}>
              <Grid item sm={12} md={12}>
                    <Typography align="center" paragraph variant="h2" className={classes.DisclaimerText}>
                      PLEASE NOTE : This site is under development, and we are looking for <a href="mailto:nrcc@cornell.edu?subject=NY runoff risk feedback">feedback</a>.
                    </Typography>
              </Grid>
            </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Disclaimer);
