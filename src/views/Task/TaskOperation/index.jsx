import React from 'react'
import Navbar from '../../../components/Navbar'
import TaskOperation from './TaskOperation'
import HeaderComponent from '../../../components/Header'
import { useParams } from 'react-router-dom'

function TaskOpsIndex() {
  const { taskListId, taskId } = useParams()

  return (
    <div>
      <Navbar />
      <HeaderComponent
        heading={taskId ? 'Edit Task' : 'Add Task'}
      />
      <TaskOperation
        taskId={taskId}
        taskListId={taskListId}
      />
    </div>
  )
}

TaskOpsIndex.propTypes = {

}

export default TaskOpsIndex

