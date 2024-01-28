import React, { lazy, Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
const PublicRoute = lazy(() => import('./PublicRoute'))
const PrivateRoute = lazy(() => import('./PrivateRoute'))
const Login = lazy(() => import('../views/Login/index'))
const Register = lazy(() => import('../views/Register/index'))
const NotFound = lazy(() => import('../components/NotFound'))
const Loader = lazy(() => import('../components/Loader'))
const ProfileIndex = lazy(() => import('../views/Profile'))
const BlogsIndex = lazy(() => import('../views/Blog'))
const BlogOpsIndex = lazy(() => import('../views/Blog/BlogOperation'))
const CategoriesIndex = lazy(() => import('../views/Category'))
const CategoryOpsIndex = lazy(() => import('../views/Category/CategoryOperation'))
const TaskListIndex = lazy(() => import('../views/TaskList'))
const TaskListOpsIndex = lazy(() => import('../views/TaskList/TaskListOperation'))
const TasksIndex = lazy(() => import('../views/Task'))
const TaskOpsIndex = lazy(() => import('../views/Task/TaskOperation'))

export default function Router () {
  return useRoutes([
    {
      path: '/',
      children: [
        { path: '/', element: <Navigate to="/dashboard/profile" /> },
        { path: '/404', element: <Suspense fallback={<Loader />}><NotFound /></Suspense> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '/sign-in', element: <PublicRoute element={Login} /> },
    { path: '/sign-up', element: <PublicRoute element={Register} /> },
    { path: '/dashboard/profile', element: <PrivateRoute element={ProfileIndex} /> },
    {
      path: '/blogs',
      children: [
        { path: '', element: <PrivateRoute element={BlogsIndex} /> },
        { path: 'add-blog', element: <PrivateRoute element={BlogOpsIndex} /> },
        { path: 'update-blog/:blogId', element: <PrivateRoute element={BlogOpsIndex} /> }
      ]
    },
    {
      path: '/categories',
      children: [
        { path: '', element: <PrivateRoute element={CategoriesIndex} /> },
        { path: 'add-category', element: <PrivateRoute element={CategoryOpsIndex} /> },
        { path: 'update-category/:categoryId', element: <PrivateRoute element={CategoryOpsIndex} /> }
      ]
    },
    {
      path: '/tasklist',
      children: [
        { path: '', element: <PrivateRoute element={TaskListIndex} /> },
        { path: ':taskListId/tasks',
          children: [
            { path: '', element: <PrivateRoute element={TasksIndex} /> },
            { path: 'add-task', element: <PrivateRoute element={TaskOpsIndex} /> },
            { path: 'update-task/:taskId', element: <PrivateRoute element={TaskOpsIndex} /> }
          ]
        },
        { path: 'add-tasklist', element: <PrivateRoute element={TaskListOpsIndex} /> },
        { path: 'update-tasklist/:taskListId', element: <PrivateRoute element={TaskListOpsIndex} /> }
      ]
    },
    // {
    //   path: '/tasks',
    //   children: [
    //     { path: '', element: <PrivateRoute element={TasksIndex} /> },
    //     { path: 'add-task', element: <PrivateRoute element={TaskOpsIndex} /> },
    //     { path: 'update-task/:taskId', element: <PrivateRoute element={TaskOpsIndex} /> }
    //   ]
    // },
    {
      path: '*',
      element: <Navigate replace to="/404" />
    }
  ])
}
