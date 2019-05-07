import React, { Component } from 'react'
import { reset, reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'

import * as actions from '../actions'
import CustomInput from './CustomInput'

class ResetPassReq extends Component{

    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    /*async onSubmit(formData, dispatch){
        console.log('onSubmit() got called')
        console.log('formData', formData)
        await this.props.resetRequest(formData)
        dispatch(reset("resetpassreq"))
    }*/

    
    onSubmit = async (formData, dispatch) => {
        dispatch(reset("resetpassreq"));
        await this.props.resetRequest(formData)
       };

    componentWillMount(){
        console.log('yaa thats what i want')
        this.props.clearMapStateToProps()
    }


    render(){
        const { handleSubmit } = this.props
        return(
            <div className="row d-flex justify-content-center">
                <div className="col-xl-5 col-lg-5 col-md-5 col-div">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        
                        <fieldset>
                            <Field name="email" type="text" id="email" component={ CustomInput } label="Enter your email" placeholder="example@gmail.com" />
                        </fieldset>

                            { this.props.errorMessage ? 
                                <div className="alert alert-danger">
                                    { this.props.errorMessage }
                                </div>: null }

                                { this.props.resData ? 
                                <div className="alert alert-success">
                                    { this.props.resData }
                                </div>: null }

                        <button className="btn btn-primary" type="submit">Request Reset</button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        errorMessage: state.auth.errorMessage,
        resData: state.auth.resData 
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'resetpassreq'})
)(ResetPassReq)