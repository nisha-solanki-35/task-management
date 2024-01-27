import React from 'react'
import Navbar from '../../../components/Navbar'
import TaskOperation from './TaskOperation'
import HeaderComponent from '../../../components/Header'
import { useParams } from 'react-router-dom'

function TaskOpsIndex() {
  const { taskId } = useParams()

  return (
    <div>
      <Navbar />
      <HeaderComponent
        blogId={taskId}
        heading={taskId ? 'Edit Task' : 'Add Task'}
      />
      <TaskOperation />
    </div>
  )
}

TaskOpsIndex.propTypes = {

}

export default TaskOpsIndex

