import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { GetProducts, AddProduct, DeleteProduct, UpdateProduct } from '../../action/products';
import { GetProductsFile } from '../../action/utilities';
import EditProductPopup from '../../components/productsComponents/editProductPopup';
import AddProductPopup from '../../components/productsComponents/addProductPopup';
import Pagination from "react-js-pagination";

const BASE_URL = process.env.BASE_URL;

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: props.match.params.page || 1,
            itemsCount: 10,
            filter: {
                offset: ((props.match.params.page || 1) - 1) * 10,
                limit: 10,
                orderBy: 'createAt',
                dec: false,

            },
            popupContent: '',

        };
        this.onChange = this.onChange.bind(this);
        this.paginationOnChange = this.paginationOnChange.bind(this);
        this.openEditProductPopup = this.openEditProductPopup.bind(this);
        this.openAddProductPopup = this.openAddProductPopup.bind(this);
        this.closeProductPopup = this.closeProductPopup.bind(this);
        this.columeOnChange = this.columeOnChange.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.getFile = this.getFile.bind(this);
    }
    onChange(e) {
        const { value } = e.target;
        const { filter } = this.state;
        this.setState({ filter: { ...filter, limit: parseInt(value) }, itemsCount: parseInt(value), activePage: 1 });
        this.props.GetProducts({ ...filter, limit: parseInt(value), dec: (filter.dec) ? 1 : -1, offset: 0 });
    }
    paginationOnChange(page) {
        const { filter, itemsCount } = this.state;
        this.setState({ activePage: page, filter: { ...filter, offset: (page - 1) * itemsCount } });
        this.props.GetProducts({ ...filter, offset: (page - 1) * itemsCount, dec: (filter.dec) ? 1 : -1 });
    }
    columeOnChange(orderBy) {
        const { filter } = this.state;
        if (orderBy !== filter.orderBy) {
            this.setState({ filter: { ...filter, orderBy } });
            this.props.GetProducts({ ...filter, orderBy, dec: (filter.dec) ? 1 : -1 });
        } else {
            this.setState({ filter: { ...filter, dec: !filter.dec } });
            this.props.GetProducts({ ...filter, dec: (!filter.dec) ? 1 : -1 });
        }

    }
    componentDidMount() {
        const { filter } = this.state;
        this.props.GetProducts({ ...filter, dec: (filter.dec) ? 1 : -1 });
    }
    openEditProductPopup(rowId) {
        const data = this.props.products.find((item) => item._id === rowId);
        this.setState({
            popupContent: (
                <EditProductPopup
                    closePopup={this.closeProductPopup}
                    UpdateProduct={(dataUpdate) => { this.props.UpdateProduct(rowId, dataUpdate) }}
                    data={data}

                />
            )
        });
    }
    openAddProductPopup() {
        this.setState({
            popupContent: (
                <AddProductPopup
                    closePopup={this.closeProductPopup}
                    AddProduct={this.props.AddProduct}
                />
            )
        });
    }
    closeProductPopup() {
        this.setState({ popupContent: '' });
    }
    async deleteProduct(productId) {
        if (await window.modal.confirm('Are you sure?', 'Do you want to delete this product?')) {
            this.props.DeleteProduct(productId);
        }
    }
    getFile() {
        const { filter } = this.state;
        GetProductsFile({ ...filter, dec: (!filter.dec) ? 1 : -1 });
    }
    render() {
        const { filter, popupContent } = this.state;
        const { productsLoading, products } = this.props;
        if (productsLoading) {
            return (
                <div className="loading">
                    <img src="/public/images/loading.gif" />
                </div>
            )
        }
        const ifPagination = this.props.productsCount > this.state.itemsCount;
        return (
            <div className="productsList">
                <button className="btn" onClick={this.getFile}>EXCEL</button>
                <div className="selectSize">
                    <h4>Row Count</h4>
                    <select className="selectOption"
                        name="rowCount"
                        value={this.state.itemsCount}
                        onChange={this.onChange}
                    >
                        <option value='10' >10</option>
                        <option value='15' >15</option>
                        <option value='20' >20</option>
                        <option value='30' >30</option>
                        <option value='50' >50</option>
                    </select>
                </div>
                <table className="productsTable">
                    <thead>
                        <tr>
                            <th onClick={() => this.columeOnChange('name')} >
                                Name
                                {filter.orderBy === 'name' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th onClick={() => this.columeOnChange('code')} >
                                Code
                                {filter.orderBy === 'code' ? filter.dec ? (<span>&#x2191;</span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th onClick={() => this.columeOnChange('newPrice')} >
                                New Price
                                {filter.orderBy === 'newPrice' ? filter.dec ? (<span>&#x2191;</span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th onClick={() => this.columeOnChange('endDate')} >
                                End Date
                                {filter.orderBy === 'endDate' ? filter.dec ? (<span>&#x2191;</span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (() => {
                                const renderProducts = [];
                                for (let i = 0; i < Math.min(parseInt(filter.limit), products.length); i++) {
                                    renderProducts.push((
                                        <tr key={products[i]._id}>
                                            <td>{products[i].name}</td>
                                            <td>{products[i].code}</td>
                                            <td>{products[i].newPrice}</td>
                                            <td>{new Date(products[i].endDate).toLocaleString()}</td>
                                            <td><img src="/public/images/edit.png" onClick={() => { this.openEditProductPopup(products[i]._id) }} /></td>
                                            <td><img src="/public/images/delete.png" onClick={() => { this.deleteProduct(products[i]._id) }} /></td>
                                        </tr>
                                    ))
                                }
                                return renderProducts;
                            })()
                        }
                        <tr className="addProductShop">
                            <td colSpan="6">
                                <img src="/public/images/addRow.png" onClick={() => { this.openAddProductPopup() }} />
                            </td>
                        </tr>
                    </tbody>

                </table>
                {
                    ifPagination && (
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCount}
                            totalItemsCount={this.props.productsCount}
                            pageRangeDisplayed={5}
                            onChange={this.paginationOnChange}
                            prevPageText='<'
                            nextPageText='>'
                        />
                    )
                }
                {popupContent}
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        productsLoading: store.products.loading,
        products: store.products.data,
        productsCount: store.products.count,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        GetProducts: (filter) => dispatch(GetProducts(filter)),
        UpdateProduct: (rowId, dataUpdate) => dispatch(UpdateProduct(rowId, dataUpdate)),
        AddProduct: (dataAdd) => dispatch(AddProduct(dataAdd)),
        DeleteProduct: (adUserId) => dispatch(DeleteProduct(adUserId)),

    };
};

Products.propTypes = {
    GetProducts: propTypes.func.isRequired,
    UpdateProduct: propTypes.func.isRequired,
    AddProduct: propTypes.func.isRequired,
    DeleteProduct: propTypes.func.isRequired,
    productsLoading: propTypes.bool.isRequired,
    products: propTypes.arrayOf(propTypes.any).isRequired,
    productsCount: propTypes.number.isRequired,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));