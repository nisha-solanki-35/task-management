import React from 'react'
import Navbar from '../../components/Navbar'
import TaskList from './TaskList'
import HeaderComponent from '../../components/Header'

function TaskListIndex() {
  return (
    <div>
      <Navbar />
      <HeaderComponent
        heading='Task List'
      />
      <TaskList />
    </div>
  )
}

TaskListIndex.propTypes = {

}

export default TaskListIndex

