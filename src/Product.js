import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Product = (props) => {
    const { topRated } = props

    return(
        <div>
            <ul>
                <li>{topRated.name} ({topRated.rating}) </li>
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    topRated: state.topRated
})


export default withRouter(connect(mapStateToProps)(Product))