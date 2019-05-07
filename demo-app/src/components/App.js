import React from  'react'
import Header from './Header'
import '../styles/style.scss'
export default (props) => {
    return(
      <div>
          <Header />
          <div className="d-flex align-items-center main-section">
            <div className="container">
            { props.children }
            </div>
          </div>
      </div>
    );
};