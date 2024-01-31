import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Button, ErrorText, Form, FormContainer, Input } from '../../../components/FormComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import AlertComponent from '../../../components/Alert';
import PropTypes from 'prop-types'
import { addTaskList, getTaskListDetails, updateTaskList } from '../../../redux/actions/taskList';

const validate = values => {
  const requiredFields = ['name'];
  const errors = {};
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required field';
    }
  });
  return errors;
};

function TaskListOperation (props) {
  const { taskListId } = props
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const taskListDetails = useSelector(state => state.taskList.taskListDetails)
  const successMessage = useSelector(state => state.taskList.successMessage)
  const errorMessage = useSelector(state => state.taskList.errorMessage)

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (taskListId) {
      dispatch(getTaskListDetails(taskListId))
    }
  }, [])

  useEffect(() => {
    if (successMessage) {
      if (taskListId) {
        setMessage(successMessage)
        setAlert(true)
        setSuccess(true)
      } else {
        navigate('/tasklist', {
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
    initialValues: {
      name: '',
    },
    validate,
    onSubmit: values => {
      if (taskListId) {
        dispatch(updateTaskList(values, taskListId))
      } else {
        dispatch(addTaskList(values))
      }
    }
  })

  useEffect(() => {
    if (taskListDetails) {
      formik.setValues({
        name: taskListDetails?.name || '',
      })
    }
  }, [taskListDetails])

  return (
    <FormContainer>
      {alert && <AlertComponent message={message} setAlert={setAlert} success={success} />}
      <Form onSubmit={formik.handleSubmit}>
        <Input
          error={formik.touched.name && formik.errors.name}
          id="name"
          name="name"
          onChange={formik.handleChange}
          placeholder="TaskList Name"
          type="name"
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <ErrorText>{formik.errors.name}</ErrorText>
        ) : null}
        <Button type="submit">{taskListId ? 'Save changes' : 'Add TaskList'}</Button>
      </Form>
    </FormContainer>
  )
}

TaskListOperation.propTypes = {
  taskListId: PropTypes.string
}

export default TaskListOperation
