///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
//import Link from 'next/link'
import React, { Component } from 'react'
//import InvertedButton from './InvertedButton'
//import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';

//import acislogo from '../../assets/acis-transparent.png'
//import aiheclogo from '../../assets/AIHEC-Logo.png'
//import nrcslogo from '../../assets/NRCS-Logo.png'

class Footer extends Component {
  render () {
    const { classes } = this.props
    const currentYear = new Date().getFullYear()
    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={2}
          className={classNames(classes.footerText, classes.footerSections)}
        >
          <Grid item xs={12} sm={3}>
                        <Typography className={classes.white} gutterBottom variant="body2">
                            This site is a collaboration between the following partners/supporters.
                        </Typography>
          </Grid>
        </Grid>
        <Grid className={classes.subFooter} item xs={12}>
          <Typography
            className={classes.white}
            variant="subtitle1"
            component={'span'}
          >
            © {currentYear} Cornell University
          </Typography>
        </Grid>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    //boxShadow: '0 50vh 0 50vh '+theme.palette.primary[800],
    boxShadow: '0 50vh 0 50vh '+blue[800],
    marginTop: 30,
    //backgroundColor: `${theme.palette.primary[800]}`,
    backgroundColor: blue[800],
    borderTop: 'solid 3px #999999',
    paddingTop: '16px',
    overflowX: 'hidden'
  },
  footerSections: {
    margin: '0 16px'
  },
  subFooter: {
    //backgroundColor: 'rgba(0, 0, 0, 0.15)',
    padding: '8px 16px 8px 16px',
    marginTop: '8px'
  },
  footerText: {
    color: '#fff',
    fontSize: '18px',
    lineHeight: 1.5
  },
  invertedBtnDark: {
    color: '#fff',
    backgroundColor: 'transparent',
    border: '2px #fff solid',
    boxShadow: 'none',
    margin: '8px'
  },
  white: {
    color: '#ffffff'
  },
  flexContainer: {
    display: 'flex'
  }
})

export default withStyles(styles)(Footer)
