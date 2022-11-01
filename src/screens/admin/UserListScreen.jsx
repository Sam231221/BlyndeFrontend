import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { Message } from '../../components/Message'
import { listUsers, deleteUser } from '../../actions/userActions'
import PageContainer from '../../components/PageContainer'

function UserListScreen({ history }) {

    const dispatch = useDispatch()
    const redirect = useNavigate()

    const userList = useSelector(state => state.userList)
    console.log(userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    console.log(userInfo)

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete


    /*
       useEffect() handles those events like when a user is deleted
       it has got successDelete attribute(success)which is initally 
       false, every time we delete user the attribute get's updated.
       Hence useFffect calls callback function() everytime on the attribute 
       change dispatching listUsers(). This is how in Web browser. Items
       are seen deleted in real time with no page reload.
    */

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            redirect('/login')
        }

    }, [dispatch, redirect, successDelete, userInfo])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <PageContainer className="m-3">
            <div className='container'>
                <h1>Users</h1>
                {loading
                    ? (<Loader />)
                    : error
                        ? (<Message variant='danger'>{error}</Message>)
                        : (
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>ADMIN</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.isAdmin ? (
                                                <i className='fas fa-check' style={{ color: 'green' }}></i>
                                            ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}</td>

                                            <td>
                                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
            </div>
        </PageContainer>
    )
}

export default UserListScreen
