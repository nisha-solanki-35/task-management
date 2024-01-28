import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Button, ErrorText, Form, FormContainer, Input, StyledSelect } from '../../../components/FormComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AlertComponent from '../../../components/Alert'
import PropTypes from 'prop-types'
import { addTask, getTaskDetails, updateTask } from '../../../redux/actions/task'
import moment from 'moment'

const validate = values => {
  const requiredFields = ['task_name', 'task_completed', 'task_date']
  const errors = {}
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required field'
    }
  })
  return errors
}

function TaskOperation (props) {
  const { taskListId, taskId } = props
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const taskDetails = useSelector(state => state.task.taskDetails)
  const successMessage = useSelector(state => state.task.successMessage)
  const errorMessage = useSelector(state => state.task.errorMessage)

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (taskId) {
      dispatch(getTaskDetails(taskId))
    }
  }, [])
  console.log('taskDetails :>> ', taskDetails)

  useEffect(() => {
    if (successMessage) {
      if (taskId) {
        setMessage(successMessage)
        setAlert(true)
        setSuccess(true)
      } else {
        navigate(`/taskList/${taskListId}/tasks`, {
          state: { message: successMessage }
        })
      }
    }
  }, [successMessage])

  useEffect(() => {
    if (typeof errorMessage === 'string') {
      setMessage(errorMessage)
      setAlert(true)
      setSuccess(false)
    } else {
      formik.setErrors(errorMessage)
    }
  }, [errorMessage])

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false)
      }, 3000)
    }
  }, [alert])

  const formik = useFormik({
    initialValues: {
      task_name: '',
      task_completed: '',
      task_date: moment(Date.now()).format('YYYY-MM-DD'),
      task_list_id: taskListId || ''
    },
    validate,
    onSubmit: values => {
      if (taskId) {
        dispatch(updateTask(values, taskId))
      } else {
        dispatch(addTask(values))
      }
    }
  })

  useEffect(() => {
    if (taskDetails) {
      formik.setValues({
        task_name: taskDetails?. task_name|| '',
        task_completed: taskDetails?. task_completed|| '',
        task_date: taskDetails?.task_date|| '',
        task_list_id: taskListId || ''
      })
    }
  }, [taskDetails])

  return (
    <FormContainer>
      {alert && <AlertComponent message={message} setAlert={setAlert} success={success} />}
      <Form onSubmit={formik.handleSubmit}>
        <Input
          error={formik.touched.task_name && formik.errors.task_name}
          id="task_name"
          name="task_name"
          onChange={formik.handleChange}
          placeholder="Task Name"
          type="text"
          value={formik.values.task_name}
        />
        {formik.touched.task_name && formik.errors.task_name ? (
          <ErrorText>{formik.errors.task_name}</ErrorText>
        ) : null}
        <StyledSelect
          error={formik.touched.task_completed && formik.errors.task_completed}
          id="task_completed"
          name="task_completed"
          onChange={formik.handleChange}
          value={formik.values.task_completed}
        >
          <option value="">Status</option>
          <option value="0">Pending</option>
          <option value="1">Completed</option>
        </StyledSelect>
        {formik.touched.task_completed && formik.errors.task_completed ? (
          <ErrorText>{formik.errors.task_completed}</ErrorText>
          ) : null}
        <Input
          error={formik.touched.task_date && formik.errors.task_date}
          id="task_date"
          name="task_date"
          onChange={formik.handleChange}
          placeholder="Date"
          type="date"
          value={formik.values.task_date}
        />
        {formik.touched.task_date && formik.errors.task_date ? (
          <ErrorText>{formik.errors.task_date}</ErrorText>
        ) : null}
        <Button type="submit">{taskId ? 'Save changes' : 'Add Task'}</Button>
      </Form>
    </FormContainer>
  )
}

TaskOperation.propTypes = {
  taskId: PropTypes.string,
  taskListId: PropTypes.string
}

export default TaskOperation
