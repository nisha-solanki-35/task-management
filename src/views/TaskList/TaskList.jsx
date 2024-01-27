import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonContainer, DataNotFound, DeleteButton, EditButton, Table, Td, Th } from '../../components/Table'
import { useNavigate } from 'react-router-dom'
import { getTaskList } from '../../redux/actions/taskList'
// import PropTypes from 'prop-types'

function TaskList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.taskList.taskList)

  useEffect(() => {
    dispatch(getTaskList())
  }, [])

  const onDelete = (id) => {
    console.log('id :>> ', id);
  }

  return (
    <>
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
          {tasks?.map(taskList => (
            <tr key={taskList?.id}>
              <Td>{taskList?.name}</Td>
              <Td>
                <EditButton onClick={() => navigate(`/tasklist/update-tasklist/${taskList.id}`)}>Edit</EditButton>
                <DeleteButton onClick={() => onDelete(taskList.id)}>Delete</DeleteButton>
              </Td>
            </tr>
        ))}
          {tasks?.length === 0 && (
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

