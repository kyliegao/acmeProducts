import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchProducts, deleteProducts, createProduct } from './store'

class ProductList extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetch()
    }


    render(){
        const {  products } = this.props
        console.log(products)

        return(
            <div>
                <button onClick = {() => this.props.create()}>Bite Me -- only works once (use wisely!)</button>
                <ul>
                    {products.map(product => (
                        <li key = {product.id}>
                            {product.name.concat(' ',product.rating)}
                        <button onClick = {() => this.props.delete(product.id)}>x</button>
                        </li>
                    ))}
                </ul>    
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products
})

const mapDispatchToProps = dispatch => ({
    fetch: () => dispatch(fetchProducts()),
    delete: (productId) => dispatch(deleteProducts(productId)),
    create: () => dispatch(createProduct()),
})



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList))