import React, { Component } from 'react'
import { reset, reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { css } from '@emotion/core';
import { ScaleLoader } from 'react-spinners';
import * as actions from '../actions'
import CustomInput from './CustomInput'


    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

class ResetPassReq extends Component{

    
    

    constructor(props){
        super(props)
        this.state = {
            loading: false
          }
        this.onSubmit = this.onSubmit.bind(this)
        this.inputFieldChange = this.inputFieldChange.bind(this)
    }


    
    onSubmit = async (formData, dispatch) => {
        dispatch(reset("resetpassreq"));
        this.state.loading = true
        await this.props.resetRequest(formData)
       };


    inputFieldChange(){
        console.log('input field click')
        this.props.clearMapStateToProps()
    }


    componentWillMount(){
        console.log('yaa thats what i want')
        this.props.clearMapStateToProps()
    }

    

    

    componentDidUpdate(){
        this.state.loading = false
        console.log('componentDidUpdate')
    }

    

    
    render(){
        const { handleSubmit } = this.props
        /*if(this.props.errorMessage || this.props.resData){
            this.state.loading = false
        }*/
        return(
            <div className="row d-flex justify-content-center">
                <div className="col-xl-5 col-lg-5 col-md-5 col-div">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        
                        <fieldset>
                            <Field  onChange={this.inputFieldChange} name="email" type="text" id="email" component={ CustomInput } label="Enter your email" placeholder="example@gmail.com" />
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
                        <div className='sweet-loading spiner-container'>
                            <ScaleLoader
                            css={override}
                            sizeUnit={"px"}
                            size={150}
                            color={'#008000'}
                            loading={this.state.loading}
                            />
                        </div> 
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