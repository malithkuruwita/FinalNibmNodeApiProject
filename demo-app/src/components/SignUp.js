import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

import * as actions from '../actions'
import CustomInput from './CustomInput'



class SignUp extends Component{

    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.responseGoogle = this.responseGoogle.bind(this)
        this.responseFacebook = this.responseFacebook.bind(this)
    }

    async onSubmit(formData){
        console.log('onSubmit() got called')
        console.log('formData', formData)
        await this.props.signUp(formData)
        if(!this.props.errorMessage){
            this.props.history.push('/dashboard')
        }
    }

    async responseGoogle(res){
        await this.props.oauthGoogle(res.accessToken)
        if(!this.props.errorMessage){
            this.props.history.push('/dashboard')
        }
    }

    async responseFacebook(res){
        console.log('responsefacebook', res)
        if(res.status !== undefined ){
            await this.props.oauthFacebook(res.accessToken)
            if(!this.props.errorMessage){
                this.props.history.push('/dashboard')
            }
        }else{
            console.log('we are good to go')
        }
    }


    componentWillMount(){
        console.log('yaa thats what i want')
        this.props.clearMapStateToProps()
    }

    render(){
        const { handleSubmit } = this.props
        return(
            <div className="row d-flex justify-content-center">
                <div className="col-xl-4 col-lg-4 col-md-4 col-div">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                        <Field name="username" type="text" id="username" component={ CustomInput } label="Enter your username" placeholder="example" />
                        </fieldset>
                        <fieldset>
                            <Field name="email" type="text" id="email" component={ CustomInput } label="Enter your email" placeholder="example@gmail.com" />
                        </fieldset>
                        <fieldset>
                            <Field name="password" type="password" id="password" component={ CustomInput } label="Enter your password" placeholder="!example1234" />
                        </fieldset>

                            { this.props.errorMessage ? 
                                <div className="alert alert-danger">
                                    { this.props.errorMessage }
                                </div>: null }


                        <button className="btn btn-primary" type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-div">
                    <div className="text-center">
                        <div className="alert alert-primary">
                        Or sign up using third-party services
                        </div>
                        <div className="d-block mb-2">
                        <FacebookLogin 
                            appId="844353635903212"
                            textButton="Facebook"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="btn btn-outline-primary"
                        />
                        </div>
                        <div className="d-block mb-2">
                        <GoogleLogin 
                            clientId="357040066517-aaglkn83u08lk1pneq767j218j37a467.apps.googleusercontent.com"
                            buttonText="Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            className="btn btn-outline-danger"
                        />
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        errorMessage: state.auth.errorMessage 
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup'})
)(SignUp)