import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Button, ErrorText, Form, FormContainer, Input } from '../../../components/FormComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AlertComponent from '../../../components/Alert'
import PropTypes from 'prop-types'
import { addTask, getTaskDetails, updateTask } from '../../../redux/actions/task'

const validate = values => {
  const requiredFields = ['task_name', 'task_completed', 'task_date', 'task_list_id']
  const errors = {}
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required field'
    }
  })
  return errors
}

function TaskOperation (props) {
  const { taskId } = props
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
        navigate('/tasks', {
          state: { message: successMessage }
        })
      }
    }
  }, [successMessage])

  useEffect(() => {
    if (errorMessage) {
      setMessage(errorMessage)
      setAlert(true)
      setSuccess(false)
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
    initialValues: taskId ? {
      task_name: taskDetails?.task_name,
      task_completed: taskDetails?.task_completed,
      task_date: taskDetails?.task_date,
      task_list_id: taskDetails?.task_list_id
    } 
    : {
      task_name: '',
      task_completed: '',
      task_date: '',
      task_list_id: ''
    },
    validate,
    onSubmit: values => {
      console.log('Form values:', values)
      if (taskId) {
        dispatch(updateTask(values))
      } else {
        dispatch(addTask(values))
      }
    }
  })

  return (
    <FormContainer>
      {alert && <AlertComponent message={message} setAlert={setAlert} success={success} />}
      <Form onSubmit={formik.handleSubmit}>
        <Input
          error={formik.touched.task_name && formik.errors.task_name}
          id="task_name"
          name="task_name"
          onChange={formik.handleChange}
          placeholder="Title"
          type="text"
          value={formik.values.task_name}
        />
        {formik.touched.task_name && formik.errors.task_name ? (
          <ErrorText>{formik.errors.task_name}</ErrorText>
        ) : null}
        <Input
          error={formik.touched.task_completed && formik.errors.task_completed}
          id="task_completed"
          name="task_completed"
          onChange={formik.handleChange}
          placeholder="Category"
          type="task_completed"
          value={formik.values.task_completed}
        />
        {formik.touched.task_completed && formik.errors.task_completed ? (
          <ErrorText>{formik.errors.task_completed}</ErrorText>
        ) : null}
        <Input
          error={formik.touched.task_date && formik.errors.task_date}
          id="task_date"
          name="task_date"
          onChange={formik.handleChange}
          placeholder="Description"
          type="textarea"
          value={formik.values.task_date}
        />
        {formik.touched.task_date && formik.errors.task_date ? (
          <ErrorText>{formik.errors.task_date}</ErrorText>
        ) : null}
        <Input
          error={formik.touched.task_list_id && formik.errors.task_list_id}
          id="task_list_id"
          name="task_list_id"
          onChange={formik.handleChange}
          placeholder="Attachment"
          type="file"
          value={formik.values.task_list_id}
        />
        {formik.touched.task_list_id && formik.errors.task_list_id ? (
          <ErrorText>{formik.errors.task_list_id}</ErrorText>
        ) : null}
        <Button type="submit">{taskId ? 'Save changes' : 'Add Blog'}</Button>
      </Form>
    </FormContainer>
  )
}

TaskOperation.propTypes = {
  taskId: PropTypes.string
}

export default TaskOperation
