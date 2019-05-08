import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

import * as actions from '../actions'
import CustomInput from './CustomInput'

import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';



class SignIn extends Component{

    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.responseGoogle = this.responseGoogle.bind(this)
        this.responseFacebook = this.responseFacebook.bind(this)
        this.responseGithub = this.responseGithub.bind(this)
        this.responseTwitter = this.responseTwitter.bind(this)
        this.inputFieldChange = this.inputFieldChange.bind(this)
    }

    async onSubmit(formData){
        await this.props.signIn(formData)
        if(!this.props.errorMessage){
            this.props.history.push('/dashboard')
        }
    }

    inputFieldChange(){
        console.log('input field click')
        this.props.clearMapStateToProps()
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

    async responseGithub(res){
            await this.props.oauthGithub(res)
            if(!this.props.errorMessage){
                this.props.history.push('/dashboard')
            }
    }

    async responseTwitter(res){
        const uData = {
            oauth_token: res.oauth_token,
            oauth_token_secret: res.oauth_token_secret
        }
        await this.props.oauthTwitter(uData)
        if(!this.props.errorMessage){
            this.props.history.push('/dashboard')
        }
    }

    

    componentWillMount(){
        console.log('yaa thats what i want')
        this.props.clearMapStateToProps()
    }

    //auth secret - -Jh2E7ewhwmCbQ6iQWEoCZiRyUQ
    //auth public key - bb-FDAVpwfcFhASaCQ_ZyyMO-_4 
  componentDidMount () {
    const oauthScript = document.createElement("script");
    oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";
    document.body.appendChild(oauthScript);
  }

  handleClick(e) {
    e.preventDefault();
    window.OAuth.initialize('bb-FDAVpwfcFhASaCQ_ZyyMO-_4');
    window.OAuth.popup('github').done(function(result) {
        this.responseGithub(result.access_token)
    }.bind(this))
  }

  handleTwitterClick(e) {
    e.preventDefault();
    window.OAuth.initialize('bb-FDAVpwfcFhASaCQ_ZyyMO-_4');
    window.OAuth.popup('twitter').done(function(result) {
        this.responseTwitter(result)
    }.bind(this))
  }

  



    render(){
        const { handleSubmit } = this.props
        return(
            <div className="row d-flex justify-content-center">
                <div className="col-xl-4 col-lg-4 col-md-4 col-div">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field onChange={this.inputFieldChange} name="email" type="text" id="email" component={ CustomInput } label="Enter your email" placeholder="example@gmail.com" />
                        </fieldset>
                        <fieldset>
                            <Field onChange={this.inputFieldChange} name="password" type="password" id="password" component={ CustomInput } label="Enter your password" placeholder="!example1234" />
                        </fieldset>

                            { this.props.errorMessage ? 
                                <div className="alert alert-danger">
                                    { this.props.errorMessage }
                                </div>: null }


                        <button className="btn btn-primary mb-3" type="submit">SignIn</button>

                    </form>
                    <Link  to="/resetpassreq">Forgot password ?</Link>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-div">
                    <div className="text-center">
                        <div className="alert alert-primary">
                        Or sign up using third-party services
                        </div>

                        <div className="d-block mb-2">
                        <FacebookLogin 
                            appId="844353635903212"
                            //textButton="Sign in Facebook"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="btn btn-social btn-facebook"
                        />
                        </div>
                        <div className="d-block mb-2">
                        <GoogleLogin 
                            clientId="357040066517-aaglkn83u08lk1pneq767j218j37a467.apps.googleusercontent.com"
                            //buttonText="Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            className="btn btn-outline-danger"
                        />
                        </div>
                        <div className="d-block mb-2">
                        <a href="" onClick={this.handleClick.bind(this)} className="btn btn-social btn-github">
                             <span className="fa fa-github"></span> Sign in with Github
                        </a>
                        </div>
                        <div className="d-block mb-2">
                        <a href="" onClick={this.handleTwitterClick.bind(this)} className="btn btn-social btn-twitter">
                             <span className="fa fa-twitter"></span> Sign in with twitter
                        </a>
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
    reduxForm({ form: 'signin'})
)(SignIn)