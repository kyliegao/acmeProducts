import React, {Component, Fragment} from 'react'
import { Route, Switch, List, withRouter } from 'react-router-dom'
import Nav from './Nav'
import ProductList from './ProductList'
import Product from './Product'

export default class Main extends Component {
    
    render (){
        return(
            <Fragment>
                <h2>The Collection of Wilting Lilacs</h2>
                <h6>(ratings are  not based on a logical system)</h6>
                <hr/>
                <Nav/>
                {/* <Switch> */}
                    <ProductList/>
                    <Route path = '/products/:id' component = {Product} />
                {/* </Switch> */}
                {/* <Switch>
                    <Route path = '/products' component = {ProductList} />
                    <Route path = '/products/:id' component = {Product} />
                </Switch> */}
            </Fragment>
        )
    }
}