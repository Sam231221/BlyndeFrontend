import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { Message } from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { getUserDetails, updateUser } from '../../actions/userActions'
import { USER_UPDATE_RESET } from '../../reducers/User/UserUpdateSlice'
import PageContainer from '../../components/PageContainer'



function UserEditScreen() {
    const { id } = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const redirect = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate
    console.log(user)
    useEffect(() => {


        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            redirect('/admin/userlist')
        } else {

            if (!user.name || user._id !== Number(id)) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }


    }, [user, dispatch, id, redirect, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
        alert('User Sucessfully updated!')
        redirect(-1)
    }

    return (
        <PageContainer>
            <div className="container">
                <Link className='btn btn-sm btn-primary' to='/admin/userlist'>
                    Go Back
                </Link>

                <FormContainer>
                    <div className="form-signin shadow w-100 m-auto">
                        <h1>Edit User</h1>
                        {/* {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}

                        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                            : (
                                <Form onSubmit={submitHandler}>

                                    <Form.Group className='mb-2' controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control

                                            type='name'
                                            placeholder='Enter name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className='mb-2' controlId='email'>
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type='email'
                                            placeholder='Enter Email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='isadmin'>
                                        <Form.Check
                                            type='checkbox'
                                            label='Is Admin'
                                            checked={isAdmin}
                                            onChange={(e) => setIsAdmin(e.target.checked)}
                                        >
                                        </Form.Check>
                                    </Form.Group>

                                    <Button type='submit' variant='primary'>
                                        Update
                                    </Button>

                                </Form>
                            )}
                    </div>


                </FormContainer >
            </div>
        </PageContainer>

    )
}

export default UserEditScreen