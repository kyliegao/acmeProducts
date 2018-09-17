import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Nav extends Component{
    constructor(props){
        super(props)
    }

    render() {
        const { products, topRated } = this.props
        
        return(
            <div>
                <ul>
                    <li><Link to = '/products'>Products ({products.length})</Link></li>
                    <li><Link to = {`/products/${topRated.id}`}>Top Rated ({topRated.name})</Link> </li>
                </ul>
                <hr />
            </div>
        )
    }
    
}

const mapStateToProps = state => ({
    products: state.products,
    topRated: state.topRated,
})


export default withRouter(connect(mapStateToProps)(Nav))