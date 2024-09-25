import React, { Component } from 'react'
import Header from './header/Header'
import Products from './products/Products'

export class HomePage extends Component {
    render() {
        return (
            <div>
                <Header />
                <Products />
            </div>
        )
    }
}

export default HomePage
