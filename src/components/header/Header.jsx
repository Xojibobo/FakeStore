import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <header className='d-flex justify-content-center mt-3 text-primary'>
                        <h1 className='fw-bold'>Fake Store</h1>

                    </header>
                </div>
            </div>
        )
    }
}

export default Header
