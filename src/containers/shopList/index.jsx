import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { GetShops } from '../../action/shop';
import { GetShopsFile } from '../../action/utilities';
import Pagination from "react-js-pagination";

const BASE_URL = process.env.BASE_URL;

class ShopList extends Component {
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
        }
        this.getFile = this.getFile.bind(this);
        this.columeOnChange = this.columeOnChange.bind(this);
        this.paginationOnChange = this.paginationOnChange.bind(this);
    }
    columeOnChange(orderBy) {
        const { filter } = this.state;
        if (orderBy !== filter.orderBy) {
            this.setState({ filter: { ...filter, orderBy } });
            this.props.GetShops({ ...filter, orderBy, dec: (filter.dec) ? 1 : -1 });
        } else {
            this.setState({ filter: { ...filter, dec: !filter.dec } });
            this.props.GetShops({ ...filter, dec: (!filter.dec) ? 1 : -1 });
        }

    }
    paginationOnChange(page) {
        const { filter, itemsCount } = this.state;
        this.setState({ activePage: page, filter: { ...filter, offset: (page - 1) * itemsCount } });
        this.props.GetShopsActivity({ ...filter, offset: (page - 1) * itemsCount, dec: (filter.dec) ? 1 : -1 });
    }
    componentDidMount() {
        const { filter } = this.state;
        this.props.GetShops({ ...filter, dec: (filter.dec) ? 1 : -1 });
    }
    getFile() {
        const { filter } = this.state;
        GetShopsFile({ ...filter, dec: (!filter.dec) ? 1 : -1 });
    }
    render() {
        const { shops, shopsLoading, shopsCount } = this.props;
        const { filter } = this.state;
        if (shopsLoading) {
            return (
                <div className="loading">
                    <img src="/public/images/loading.gif" />
                </div>
            )
        }
        const ifPagination = shopsCount > this.state.itemsCount;
        return (
            <div className="shopList">
                <button className="btn" onClick={this.getFile}>EXCEL</button>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => this.columeOnChange('name')} >
                                Name
                                {filter.orderBy === 'name' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th onClick={() => this.columeOnChange('addres')} >
                                Address
                                {filter.orderBy === 'addres' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th>Type List</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (() => {
                                const renderShops = [];
                                for (let i = 0; i < Math.min(parseInt(filter.limit), shops.length); i++) {
                                    renderShops.push((
                                        <tr key={shops[i]._id}>
                                            <td>{shops[i].name}</td>
                                            <td>{shops[i].address}</td>
                                            <td>
                                                {shops[i].category.map((categoryItem, index) => {
                                                    return (
                                                        <img className="icon" key={index} src={`${BASE_URL}/assets/${categoryItem.imageUrl}`} />
                                                    );
                                                })}
                                            </td>
                                            <td><Link to={`/shop/${shops[i]._id}`}><img src="/public/images/edit.png" /></Link></td>
                                        </tr>
                                    ))
                                }
                                return renderShops;
                            })()
                        }
                    </tbody>
                </table>
                {
                    ifPagination && (
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCount}
                            totalItemsCount={this.props.shopsCount}
                            pageRangeDisplayed={5}
                            onChange={this.paginationOnChange}
                            prevPageText='<'
                            nextPageText='>'
                        />
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        shops: store.shop.shops,
        shopsLoading: store.shop.shopsLoading,
        shopsCount: store.shop.count,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        GetShops: (filter) => dispatch(GetShops(filter)),
    };
};

ShopList.propTypes = {
    GetShops: propTypes.func.isRequired,
    shops: propTypes.arrayOf(propTypes.any).isRequired,
    shopsLoading: propTypes.bool.isRequired,
    shopsCount: propTypes.number.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopList));