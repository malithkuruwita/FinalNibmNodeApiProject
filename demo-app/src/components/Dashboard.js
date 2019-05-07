import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Dashboard extends Component{

    async componentDidMount(){
        this.props.getDeals()
    }

    render(){
        return(
            <div>This is Dashboard</div>
        );
    }
}

export default connect(null, actions)(Dashboard)