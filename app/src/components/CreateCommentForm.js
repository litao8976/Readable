import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { styles } from './../utils/styles'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Select from 'material-ui/Select'
import MenuItem from 'material-ui/Menu/MenuItem'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Button from 'material-ui/Button'
import asyncValidate from './../utils/asyncValidate'

class CreateCommentForm extends Component {
  renderTextField({ input, label, meta: { touched, error }, ...custom }) {
    return (
      <TextField
        label={label}
        helperText={touched && (error && <span style={{color:`red`,}}>{error}</span>)}
        {...input}
        {...custom}
      />
    )
  }

  onSubmit(values) {
    console.log(values)
    this.props.addComment(values)
  }

  render() {
    const classes = this.props.classes
    const { handleSubmit } = this.props

    return (
      <div className={classes.mainContentWrapper}>
      <Grid item xs={12}>
        <h1 className={classes.sectionHeader}>Add New Comment</h1>
      </Grid>
      <Grid item xs={12}>
      <form className={classes.formWrapper} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name='author'
          label='Author'
          component={this.renderTextField}
          type='text'
          className={classes.textField}
        />

        <Field
          name='body'
          label='Post'
          component={this.renderTextField}
          type='text'
          className={classes.textField}
          multiline
          rows='4'
        />

        <div className={classes.buttonGroup}>
          <Link to='/' className={classes.cancelButtonWrapper}>
            <Button raised color="accent" className={classes.cancelButton}>
              Cancel
            </Button>
          </Link>
          <Button type="submit" raised color="primary" className={classes.submitButton}>
            Submit
          </Button>
        </div>
      </form>
      </Grid>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = [ 'author', 'body' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors
}

CreateCommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(reduxForm({
  form: 'AddCommentForm',
  asyncValidate,
  validate,
})(CreateCommentForm))
