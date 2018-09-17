import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'

//initial store set up
const initialState = {
    products: [],
    topRated: {},
}

//actions

const GOT_PRODUCTS_FROM_SERVER = 'GOT_PRODUCTS_FROM_SERVER'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

//action creators

export const gotProductsFromServer = products => ({
    type: GOT_PRODUCTS_FROM_SERVER,
    products
})

export const removeProduct = productId => ({
    type: REMOVE_PRODUCT,
    productId
})

export const updateProduct = product => ({
    type: UPDATE_PRODUCT,
    product
})

//thunks

export const fetchProducts = () => {
    return (dispatch) => {
        axios.get('/api/products')
        .then (res => {
            dispatch(gotProductsFromServer(res.data))
        })
        .catch(ex => console.log(ex))
    }
}

export const deleteProducts = (productId) => {
    return (dispatch) => {
        axios.delete(`/api/products/${productId}`)
        .then(() => {
            dispatch(removeProduct(productId))
        })
        .catch(ex => console.log(ex))
    }
}

export const createProduct = () => {
    return (dispatch) => {
        axios.post('/api/products', {name: 'DonutWorry', rating: 6})
        .then (res => {
            dispatch(updateProduct(res.data))
            console.log(res)
        })
    }
}

//reducer

const reducer = (state = initialState, action) => {
    switch (action.type){
        case GOT_PRODUCTS_FROM_SERVER:
            const  topRated = action.products.sort((a,b) => {
                if (a.rating < b.rating){
                    return -1
                }
                if (a.rating > b.rating){
                    return 1
                }
                return 0
            }).slice(-1)[0]

            return {...state, products: action.products, topRated: topRated}
        
        case REMOVE_PRODUCT:
            const  newProducts = state.products.filter(product => product.id !== action.productId)

            const newTopRated = newProducts.sort((a,b) => {
                if (a.rating < b.rating){
                    return -1
                }
                if (a.rating > b.rating){
                    return 1
                }
                return 0
            }).slice(-1)[0]
        
            return {...state, products: newProducts, topRated: newTopRated}
        
        case UPDATE_PRODUCT: 

            const  _newProducts = [...state.products, action.product]
            console.log(_newProducts)

            const _newTopRated = _newProducts.sort((a,b) => {
                if (a.rating < b.rating){
                    return -1
                }
                if (a.rating > b.rating){
                    return 1
                }
                return 0
            }).slice(-1)[0]
        
            return {...state, products: _newProducts, topRated: _newTopRated}

            
        default:
                return state
    }
}

//initialize the store

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))