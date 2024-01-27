import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonContainer, DataNotFound, DeleteButton, EditButton, Table, Td, Th } from '../../components/Table'
import { useNavigate } from 'react-router-dom'
import { getTasks } from '../../redux/actions/task'
// import PropTypes from 'prop-types'

function Tasks() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.task.tasks)

  useEffect(() => {
    dispatch(getTasks())
  }, [])

  const onDelete = (id) => {
    console.log('id :>> ', id);
  }

  return (
    <>
      <ButtonContainer>
        <Button onClick={() => navigate('/tasks/add-task')}>Add Task</Button>
      </ButtonContainer>
      <Table>
        <thead>
          <tr>
            <Th>Task</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map(task => (
            <tr key={task?.id}>
              <Td>{task?.name}</Td>
              <Td>
                <EditButton onClick={() => navigate(`/tasks/update-task/${task.id}`)}>Edit</EditButton>
                <DeleteButton onClick={() => onDelete(task.id)}>Delete</DeleteButton>
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

Tasks.propTypes = {

}

export default Tasks

