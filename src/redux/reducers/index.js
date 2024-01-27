import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import blog from './blog'
import category from './category'
import task from './task'
import user from './user'
import taskList from './taskList'

export default combineReducers({
  auth,
  blog,
  category,
  task,
  taskList,
  user
})
