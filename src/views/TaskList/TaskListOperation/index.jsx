import React from 'react'
import TaskListOperation from './TaskListOperation'
import Navbar from '../../../components/Navbar'
import HeaderComponent from '../../../components/Header'
import { useParams } from 'react-router-dom'

function TaskListOpsIndex() {
  const { taskListId } = useParams()

  return (
    <div>
      <Navbar />
      <HeaderComponent
        heading={taskListId ? 'Edit TaskList' : 'Add TaskList'}
      />
      <TaskListOperation
        taskListId={taskListId}
      />
    </div>
  )
}

TaskListOpsIndex.propTypes = {

}

export default TaskListOpsIndex

