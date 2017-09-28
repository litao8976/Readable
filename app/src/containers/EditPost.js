import React from 'react'
import { connect } from 'react-redux'
import EditPostForm from './../components/EditPostForm'
import {
  fetchAllPosts,

} from './../actions'

const EditPost = () => {
  return (
    <EditPostForm />
  )
}

export default EditPost
