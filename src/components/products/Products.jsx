import React, { Component } from 'react';
import axios from 'axios';

export class Products extends Component {
    state = {
        categories: [],
        selectedCategory: 'all',
        allProducts: [],
        filteredProducts: [],
        searchProduct: '',
        loading: false,
    };

    componentDidMount() {
        this.setState({ loading: true });
        axios
            .get('https://fakestoreapi.com/products/categories')
            .then((response) => {
                this.setState({ categories: response.data });
            })
            .catch((error) => {
                console.error('Kategoriyalarni olishda xato yuz berdi!', error);
            });

        this.getAllProducts();
    }

    getAllProducts() {
        this.setState({ loading: true });
        axios
            .get('https://fakestoreapi.com/products')
            .then((response) => {
                this.setState({ allProducts: response.data, filteredProducts: response.data, loading: false }); // Ma'lumotlar yuklangandan keyin loadingni false qilamiz
            })
            .catch((error) => {
                console.error('Mahsulotlarni olishda xato yuz berdi!', error);
                this.setState({ loading: false });
            });
    }

    handleCategoryClick = (category) => {
        this.setState({ selectedCategory: category, serachProduct: '' }, () => {
            this.filterProducts(category);
        });
    };

    handleProducts = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        this.setState({ searchTerm }, () => {
            this.filterProducts(this.state.selectedCategory);
        });
    };

    filterProducts(category) {
        let filtered = this.state.allProducts;

        if (category !== 'all') {
            filtered = filtered.filter((product) => product.category === category);
        }

        if (this.state.searchTerm) {
            filtered = filtered.filter((product) =>
                product.title.toLowerCase().includes(this.state.searchTerm) ||
                product.description.toLowerCase().includes(this.state.searchTerm)
            );
        }

        this.setState({ filteredProducts: filtered });
    }

    render() {
        return (
            <div className="container p-2">
                <div className="row">
                    <div className='input-group mb-3'>
                        <input
                            onChange={this.handleProducts}
                            type="text"
                            className="form-control"
                            value={this.state.searchTerm}
                            placeholder="Search clothes..."
                        />
                        <button className="btn btn-outline-primary" type="button" id="button-addon2">Search</button>
                    </div>

                    <div className="col-2">
                        <div className="list-group">
                            <button
                                className={`list-group-item list-group-item-action text-capitalize ${this.state.selectedCategory === 'all' ? 'active' : ''}`}
                                onClick={() => this.handleCategoryClick('all')}
                            >
                                All
                            </button>

                            {this.state.categories.map((category, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`list-group-item list-group-item-action text-capitalize ${this.state.selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => this.handleCategoryClick(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="col-10">
                        {this.state.loading ? (
                            <div className="text-center">
                                <p>Loading...</p>
                            </div>
                        ) : (
                            <div className="row">
                                {this.state.filteredProducts.map((product) => (
                                    <div className="col-12 col-md-6 col-lg-4 col-xl-3 p-2" key={product.id}>
                                        <div className="border rounded-top border-primary p-2 h-100">
                                            <img
                                                className="w-100"
                                                src={product.image}
                                                alt={product.title}
                                                style={{ objectFit: 'contain', height: '200px' }}
                                            />
                                            <div className="p-2">
                                                <p className="fw-bold mt-2 fs-5">{product.title}</p>
                                                <p className="text-secondary">{product.description}</p>
                                                <div className="d-flex justify-content-between">
                                                    <p className="fw-bold">{product.category}</p>
                                                    <span>{product.price}$</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <p className="fw-bold">Rate</p>
                                                    <span>{product.rating.rate}/5</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <p className="fw-bold">Left</p>
                                                    <span>{product.rating.count}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Products;
