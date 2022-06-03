import React from 'react'
import { Formik, Field, Form } from 'formik'
import { TextField } from '@material-ui/core'
import { createTheme } from "@material-ui/core/styles"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { connect } from 'react-redux'
import { closeModal, openModal } from '../store/actions/userActions'
import {userService} from '../services/user.service'
export class _LoginSignup extends React.Component {

    state = {
        mouseX: '',
        mouseY: '',
        isLogin: true
    }

    signupInitialValues = {
        username: '',
        password: '',
        repassword: '',
        fullName: '',
        email: '',
    }
    loginInitialValues = {
        username: '',
        password: ''
    }

    theme = createTheme({
        overrides: {
            MuiOutlinedInput: {
                root: {
                    // Hover state
                    "&:hover $notchedOutline": {
                        borderColor: '222222'
                    },
                    // Focused state
                    "&$focused $notchedOutline": {
                        borderColor: '#FE385C'
                    }
                },
                // Default State
                notchedOutline: {
                    borderColor: 'B0B0B0'
                }
            }
        }
    });

    onSignup = async (user) => {
        const newUser = await userService.signup(user)
        if(newUser) this.onCloseModal()   
    }

    onLogin = async (credentials) => {
        const user = await userService.login(credentials)
        if(user.username) this.onCloseModal() //todo: show msg connected successfully
    }

    onMousMove = (e) => {
        this.setState({ ...this.state, mouseX: e.screenX, mouseY: e.screenY })
    }

    onCloseModal = () => {
        this.props.closeModal()
    }

    toggleModal = (isLogin) => {
        this.props.openModal(isLogin)
    }

    onValidate = ({ username, password, repassword, email }) => {
        const errors = {}
        if (!username) errors.username = 'Requierd'
        if (!password || !repassword) errors.password = 'Requierd'
        if (!email) errors.email = 'Requierd'
        if (password !== repassword) errors.password = 'Passwords are not the same'
        if (!password) errors.fullName = 'Required'
        const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
        if (!regex.test(email)) errors.email = 'Invalid Email'
        return errors
    }

    render() {
        const { isModalOpen } = this.props
        const { isLogin } = this.props
        if (!isModalOpen) return (<React.Fragment></React.Fragment>)
        return (
            <>
                <div className='modal-blur' onClick={this.onCloseModal}></div>
                <div className="form-container modal-center">
                    <button onClick={this.onCloseModal} className='close-button clickable'>
                        <span className="material-icons">
                            close
                        </span>
                    </button>
                    
                    {!isLogin &&
                        <Formik validateOnChange={false} validateOnBlur={false} validate={this.onValidate} initialValues={this.signupInitialValues} onSubmit={this.onSignup}>
                            {({ errors }) => (
                                <Form>
                                    <h3>Sign up</h3>
                                    <MuiThemeProvider theme={this.theme}>
                                        <Field name="username" type="text" as={TextField} variant="outlined" label="Username" fullWidth InputLabelProps={{ style: { color: '#222222' } }} />
                                        {<span className="error">{errors.username}</span>}
                                        <Field name="password" type="password" as={TextField} variant="outlined" label="Password" fullWidth InputLabelProps={{ style: { color: '#222222' } }} />
                                        {<span className="error">{errors.password}</span>}
                                        <Field name="repassword" type="password" as={TextField} variant="outlined" label="Repeat password" fullWidth InputLabelProps={{ style: { color: '#222222' } }} />
                                        {<span className="error">{errors.password}</span>}
                                        <Field name="fullName" type="text" as={TextField} variant="outlined" label="Full name" fullWidth InputLabelProps={{ style: { color: '#222222' } }} />
                                        {<span className="error">{errors.fullName}</span>}
                                        <Field name="email" type="email" as={TextField} variant="outlined" label="Email" fullWidth InputLabelProps={{ style: { color: '#222222' } }} />
                                        {<span className="error">{errors.email}</span>}
                                        <Field name="imgUrl" type="text" as={TextField} variant="outlined" label="your image URL" fullWidth InputLabelProps={{ style: { color: '#222222' } }} />
                                    </MuiThemeProvider>
                                    <button className='reserve-button' style={{ '--mouse-x': this.state.mouseX, '--mouse-y': this.state.mouseY, margin: 'auto', marginTop: '12px' }}
                                     onMouseMove={this.onMousMove} onClick={this.onV}>
                                        Continue
                                    </button>
                                    <h5 className='clickable' onClick={()=>this.toggleModal(true)}>i already have an account</h5>
                                </Form>
                            )}
                        </Formik>
                    }
                    {isLogin && <Formik validateOnChange initialValues={this.loginInitialValues} onSubmit={this.onLogin}>
                        <Form>
                            <h3>Log in</h3>
                            <MuiThemeProvider theme={this.theme}>
                                <Field name="username" type="text" as={TextField} variant="outlined" label="Username" fullWidth InputLabelProps={{ style: { color: '#222222' } }} />
                                <Field name="password" type="password" as={TextField} variant="outlined" label="Password" fullWidth style={{ marginTop: '12px' }} InputLabelProps={{ style: { color: '#222222' } }} />
                                <button className='reserve-button' style={{ '--mouse-x': this.state.mouseX, '--mouse-y': this.state.mouseY, margin: 'auto', marginTop: '12px' }} onMouseMove={this.onMousMove}>
                                Continue
                                </button>
                                <h5 className='clickable' onClick={()=>this.toggleModal(false)}>New user</h5>
                            </MuiThemeProvider>
                        </Form>
                    </Formik>}
                </div>
            </>
        )
    }
}

function mapStateToProps(storeState) {
    return {
        isModalOpen: storeState.userModule.isModalOpen,
        isLogin: storeState.userModule.isLogin
    }
}
const mapDispatchToProps = {
    closeModal,
    openModal
}

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)