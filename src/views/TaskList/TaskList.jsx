import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonContainer, DataNotFound, DeleteButton, EditButton, Table, TaskButton, Td, Th } from '../../components/Table'
import { useNavigate, useLocation } from 'react-router-dom'
import { deleteTaskList, getTaskList } from '../../redux/actions/taskList'
import AlertComponent from '../../components/Alert'
// import PropTypes from 'prop-types'

function TaskList() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const taskList = useSelector(state => state.taskList.taskList)
  const successMessage = useSelector(state => state.taskList.successMessage)
  const errorMessage = useSelector(state => state.taskList.errorMessage)

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    dispatch(getTaskList())
    if (state?.message) {
      setMessage(state?.message)
      setAlert(true)
      setSuccess(true)
    }
  }, [])
  
  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false)
      }, 3000)
    }
  }, [alert])

  useEffect(() => {
    if (successMessage) {
      setMessage(successMessage)
      setAlert(true)
      setSuccess(true)
      dispatch(getTaskList())
    }
  }, [successMessage])

  useEffect(() => {
    if (errorMessage) {
      setMessage(errorMessage)
      setAlert(true)
      setSuccess(false)
      dispatch(getTaskList())
    }
  }, [errorMessage])

  const onDelete = (id) => {
    dispatch(deleteTaskList(id))
  }

  return (
    <>
      {alert && <AlertComponent message={message} setAlert={setAlert} success={success} />}
      <ButtonContainer>
        <Button onClick={() => navigate('/tasklist/add-tasklist')}>Add Task List</Button>
      </ButtonContainer>
      <Table>
        <thead>
          <tr>
            <Th>Task</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {taskList?.data?.map(taskList => (
            <tr key={taskList?.id}>
              <Td>{taskList?.name}</Td>
              <Td>
                <TaskButton onClick={() => navigate(`/tasklist/${taskList.id}/tasks`)}>Tasks</TaskButton>
                <EditButton onClick={() => navigate(`/tasklist/update-tasklist/${taskList.id}`)}>Edit</EditButton>
                <DeleteButton onClick={() => onDelete(taskList.id)}>Delete</DeleteButton>
              </Td>
            </tr>
        ))}
          {taskList?.data?.length === 0 && (
          <DataNotFound>
            Data not available
          </DataNotFound>
          )}
        </tbody>
      </Table>
    </>
  )
}

TaskList.propTypes = {

}

export default TaskList

