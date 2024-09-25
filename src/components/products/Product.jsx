import React, { Component } from 'react';
import axios from 'axios';

export default class Product extends Component {
    constructor(props) {
        super(props);
        // State ni to'g'ri uslubda aniqlash
        this.state = {
            product: {}
        };
    }

    componentDidMount() {
        // ID ni olish uchun window.location'dan foydalanamiz
        const path = window.location.pathname;
        const id = path.substring(path.lastIndexOf('/') + 1);

        // API chaqiriq qilish
        axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                this.setState({ product: response.data });
            })
            .catch((error) => {
                console.error('Mahsulotni olishda xato yuz berdi!', error);
            });
    }

    render() {
        const { product } = this.state;

        return (
            <div className='container'>
                <div className="row mt-5 ">
                    <div className="col-5 ">
                        <img className='h-100 w-100' src={product.image} alt={product.title} />
                    </div>
                    <div className="col-6">
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Price: {product.price}$</p>
                        <p>Category: {product.category}</p>
                        <p>Rating: {product?.rating?.rate}/5</p>
                        <p>Stock: {product?.rating?.count}</p>
                    </div>
                </div>
            </div>
        );
    }
}
