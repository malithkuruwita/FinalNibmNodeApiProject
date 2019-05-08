import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'

import * as actions from '../actions'
import CustomInput from './CustomInput'

class ResetPassCon extends Component{

    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.inputFieldChange = this.inputFieldChange.bind(this)
    }

    
    onSubmit = async (formData, dispatch) => {
           const  uData = {
                formData: formData,
                token: this.props.match.params.id
            }
        await this.props.resetConfirm(uData)
        if(!this.props.errorMessage){
            this.props.history.push('/signin')
        }
    };


    inputFieldChange(){
        console.log('input field click')
        this.props.clearMapStateToProps()
    }

    componentWillMount(){
        console.log('yaa thats what i want')
        this.props.clearMapStateToProps()
    }


    render(){
        const { handleSubmit } = this.props
        return(
            <div className="row d-flex justify-content-center">
                <div className="col col-xl-5 col-lg-5 col-md-5 col-div">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        
                        <fieldset>
                            <Field onChange={this.inputFieldChange} name="password" type="password"  component={ CustomInput } label="password" placeholder="!example1234" />
                        </fieldset>
                        <fieldset>
                            <Field onChange={this.inputFieldChange} name="confirmPassword" type="password"  component={ CustomInput } label="Confirm password" placeholder="!example1234" />
                        </fieldset>

                            { this.props.errorMessage ? 
                                <div className="alert alert-danger">
                                    { this.props.errorMessage }
                                </div>: null }

                        <button className="btn btn-primary" type="submit">Reset Password</button>
                    </form>
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
    reduxForm({ form: 'resetpasscon'})
)(ResetPassCon)