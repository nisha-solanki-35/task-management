import React from 'react'
import Navbar from '../../components/Navbar'
import Tasks from './Tasks'
import HeaderComponent from '../../components/Header'

function TasksIndex() {
  return (
    <div>
      <Navbar />
      <HeaderComponent
        heading='Tasks'
      />
      <Tasks />
    </div>
  )
}

TasksIndex.propTypes = {

}

export default TasksIndex

