import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonContainer, DataNotFound, DeleteButton, EditButton, Table, Td, Th } from '../../components/Table'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import moment from 'moment'
import { deleteTask, getTasks } from '../../redux/actions/task'
import AlertComponent from '../../components/Alert'
// import PropTypes from 'prop-types'

function Tasks() {
  const { state } = useLocation()
  const { taskListId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.task.tasks)
  const successMessage = useSelector(state => state.task.successMessage)
  const errorMessage = useSelector(state => state.task.errorMessage)

  const [Tasks, setTasks] = useState([])
  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')


  useEffect(() => {
    dispatch(getTasks())
    if (state?.message) {
      setMessage(state?.message)
      setAlert(true)
      setSuccess(true)
    }
    window.history.replaceState({}, {})
  }, [])

  useEffect(() => {
    if (successMessage) {
      setMessage(successMessage)
      setAlert(true)
      setSuccess(true)
      dispatch(getTasks())
    }
  }, [successMessage])

  useEffect(() => {
    if (errorMessage) {
      setMessage(errorMessage)
      setAlert(true)
      setSuccess(false)
      dispatch(getTasks())
    }
  }, [errorMessage])

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false)
      }, 3000)
    }
  }, [alert])

  useEffect(() => {
    if (tasks) {
      setTasks(tasks?.data?.filter(data => data?.task_list_id === parseInt(taskListId)))
    }
  }, [tasks])

  const onDelete = (id) => {
    dispatch(deleteTask(id))
  }

  return (
    <>
      {alert && <AlertComponent message={message} setAlert={setAlert} success={success} />}
      <ButtonContainer>
        <Button onClick={() => navigate(`/taskList/${taskListId}/tasks/add-task`)}>Add Task</Button>
      </ButtonContainer>
      <Table>
        <thead>
          <tr>
            <Th>Task Name</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {Tasks?.map(task => (
            <tr key={task?.id}>
              <Td>{task?.task_name}</Td>
              <Td>{moment(task?.task_date).format('DD-MM-YYYY')}</Td>
              <Td>{task?.task_completed === '1' ? 'Completed' : 'Pending'}</Td>
              <Td>
                <EditButton onClick={() => navigate(`/taskList/${taskListId}/tasks/update-task/${task.id}`)}>Edit</EditButton>
                <DeleteButton onClick={() => onDelete(task.id)}>Delete</DeleteButton>
              </Td>
            </tr>
        ))}
          {Tasks?.length === 0 && (
          <DataNotFound>
            Data not available
          </DataNotFound>
          )}
        </tbody>
      </Table>
    </>
  )
}

Tasks.propTypes = {

}

export default Tasks

