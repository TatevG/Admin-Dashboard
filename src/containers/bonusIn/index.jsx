import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Pagination from "react-js-pagination";
import { GetBonusIn, ChangeCount } from '../../action/transactions';
import { GetTypes, GetShops } from '../../action/shop';
import { GetBonusInFile } from '../../action/utilities';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const MAX_SIZE = 6;

class BonusIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            multi: false,
            activePage: props.match.params.page || 1,
            itemsCount: 10,
            doubleClicked: null,
            count: props.transactions.map(item => ({ ...item, _id: item._id, count: item.count })),
            filter: {
                offset: ((props.match.params.page || 1) - 1) * 10,
                limit: 10,
                orderBy: 'createAt',
                dec: false,
                shops: null,
                types: null,
                startDate: '',
                endDate: '',
            },
        };
        this.onChange = this.onChange.bind(this);
        this.paginationOnChange = this.paginationOnChange.bind(this);
        this.columeOnChange = this.columeOnChange.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.getFile = this.getFile.bind(this);
        this.handlerDoubleClick = this.handlerDoubleClick.bind(this);
        this.handlerChangeCount - this.handlerChangeCount.bind(this);
        this.handlerPressEnter = this.handlerPressEnter.bind(this);
        this.onBlurContent = this.onBlurContent.bind(this);
    }
    componentWillMount() {
        if (this.props.types.length === 0) {
            this.props.GetTypes();
        }
        if (this.props.shops.length === 0) {
            this.props.GetShops();
        }
    }
    handlerChange(e) {
        const { name, value } = e.target;
        const { filter } = this.state;
        this.setState({ filter: { ...filter, [name]: value } });
        this.props.GetBonusIn({ ...filter, [name]: value, dec: (filter.dec) ? 1 : -1 });
    }
    handlerChangeSelect(value, name) {
        const { filter } = this.state;
        if (_.isEmpty(value)) {
            this.setState({ filter: { ...filter, [name]: null } });
            this.props.GetBonusIn({ ...filter, [name]: null, dec: (filter.dec) ? 1 : -1 });
        } else {
            this.setState({ filter: { ...filter, [name]: value._id } });
            this.props.GetBonusIn({ ...filter, [name]: value._id, dec: (filter.dec) ? 1 : -1 });
        }
    }
    onChange(e) {
        const { value } = e.target;
        const { filter } = this.state;
        this.setState({ filter: { ...filter, limit: parseInt(value) }, itemsCount: parseInt(value), activePage: 1 });
        this.props.GetBonusIn({ ...filter, limit: parseInt(value), dec: (filter.dec) ? 1 : -1, offset: 0 });
    }
    paginationOnChange(page) {
        const { filter, itemsCount } = this.state;
        this.setState({ activePage: page, filter: { ...filter, offset: (page - 1) * itemsCount } });
        this.props.GetBonusIn({ ...filter, offset: (page - 1) * itemsCount, dec: (filter.dec) ? 1 : -1 });
    }
    columeOnChange(orderBy) {
        const { filter } = this.state;
        if (orderBy !== filter.orderBy) {
            this.setState({ filter: { ...filter, orderBy } });
            this.props.GetBonusIn({ ...filter, orderBy, dec: (filter.dec) ? 1 : -1 });
        } else {
            this.setState({ filter: { ...filter, dec: !filter.dec } });
            this.props.GetBonusIn({ ...filter, dec: (!filter.dec) ? 1 : -1 });
        }

    }
    componentDidMount() {
        const { filter } = this.state;
        this.props.GetBonusIn({ ...filter, dec: (filter.dec) ? 1 : -1 });
    }
    getTypes = (input, callback) => {
        const { types } = this.props;
        input = input.toLowerCase();
        var options = types.map(
            item => ({ ...item, name: item.name.en })
        ).filter(i => {
            return i.name.substr(0, input.length).toLowerCase() === input;
        });
        var data = {
            options: options.slice(0, MAX_SIZE),
            complete: options.length <= MAX_SIZE,
        };
        callback(null, data);
    }
    getShops = (input, callback) => {
        const { shops } = this.props;
        input = input.toLowerCase();
        var options = shops.filter(i => {
            return i.name.substr(0, input.length).toLowerCase() === input;
        });
        var data = {
            options: options.slice(0, MAX_SIZE),
            complete: options.length <= MAX_SIZE,
        };
        callback(null, data);
    }
    getFile() {
        const { filter } = this.state;
        GetBonusInFile({ ...filter, dec: (!filter.dec) ? 1 : -1 });
    }
    handlerDoubleClick(id) {
        this.setState({ doubleClicked: id });
    }
    handlerChangeCount(e){
        const { count } = this.state;
        const finded = count.find(item => item._id === id);
        finded[e.target.name] = e.target.value;
        this.setState({ count: [...count] });
    }
    handlerPressEnter(id, e) {
        this.props.ChangeCount( id, e.target.value);
        console.log(id, e.target.value);
        this.setState({ doubleClicked: null });
    }
    onBlurContent() {
        this.setState({ doubleClicked: null});
    }
    render() {
        const { filter, doubleClicked, count } = this.state;
        const { transactionsLoading, transactions, userType } = this.props;
        const temp = Date.now();
        const tempDate = new Date(temp);
        const now = `${tempDate.getFullYear()}-${("0" + (tempDate.getMonth() + 1)).slice(-2)}-${("0" + tempDate.getDate()).slice(-2)}`;
        const ifPagination = this.props.transactionsCount > this.state.itemsCount;
        return (
            <div className="transactions">
                <div className="searchField">
                    <button className="btn" onClick={this.getFile}>EXCEL</button>
                    <div className="fields">
                        <div className="selects">
                            <div className="shopSelect">
                                <Select.Async
                                    key={Math.random()}
                                    multi={this.state.multi}
                                    value={this.state.filter.types}
                                    onChange={(value) => { this.handlerChangeSelect(value, 'types') }}
                                    valueKey="_id"
                                    labelKey="name"
                                    loadOptions={this.getTypes}
                                />
                            </div>
                            <div className="shopSelect">
                                <Select.Async
                                    key={Math.random()}
                                    multi={this.state.multi}
                                    value={this.state.filter.shops}
                                    onChange={(value) => { this.handlerChangeSelect(value, 'shops') }}
                                    valueKey="_id"
                                    labelKey="name"
                                    loadOptions={this.getShops}
                                />
                            </div>
                        </div>
                        <div className="inputs">
                            <input type="date" name="startDate" value={filter.startDate === '' ? now : filter.startDate} onChange={this.handlerChange} />
                            <input type="date" name="endDate" value={filter.endDate} onChange={this.handlerChange} />
                        </div>
                    </div>
                    <div className="selectSize">
                        <h3>Row Count</h3>
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
                </div>
                {
                    transactionsLoading ?
                        <div className="loading">
                            <img src="/public/images/loading.gif" />
                        </div>
                        :
                        <table className="transactionsTable">
                            <thead>
                                <tr>
                                    <th onClick={() => this.columeOnChange('name')} >
                                        User
                                {filter.orderBy === 'name' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                                    </th>
                                    <th onClick={() => this.columeOnChange('shop')} >
                                        Shop
                                {filter.orderBy === 'shop' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                                    </th>
                                    <th onClick={() => this.columeOnChange('cardNumber')} >
                                        Card Number
                                {filter.orderBy === 'cardNumber' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                                    </th>
                                {
                                    userType === 'SUPER_ADMIN' ?
                                    (<th onClick={() => this.columeOnChange('count')} >
                                    Count
                            {filter.orderBy === 'count' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                                </th>) : null
                                }
                                    <th onClick={() => this.columeOnChange('bonuse')} >
                                        Bonus
                                {filter.orderBy === 'bonuse' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                                    </th>
                                    <th onClick={() => this.columeOnChange('commission')} >
                                        Commission
                                {filter.orderBy === 'commission' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                                    </th>
                                    <th onClick={() => this.columeOnChange('createAt')} >
                                        Create At
                                {filter.orderBy === 'createAt' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (() => {
                                        const renderTransactions = [];
                                        for (let i = 0; i < Math.min(parseInt(filter.limit), transactions.length); i++) {
                                            renderTransactions.push((
                                                <tr key={transactions[i]._id} className={`${transactions[i].edited ? "red" : ''}`}>
                                                    <td><Link to={`/user/${transactions[i].user._id}`}>{`${transactions[i].user.name} ${transactions[i].user.surname}`}</Link></td>
                                                    <td><Link to={`/shop/${transactions[i].shop._id}`}>{transactions[i].shop.name.en}</Link></td>
                                                    <td>{transactions[i].cardNumber}</td>
                                                    {
                                                        userType === 'SUPER_ADMIN'?
                                                        (<td onDoubleClick={() => this.handlerDoubleClick(transactions[i]._id)}>
                                                        {
                                                            (doubleClicked === transactions[i]._id) ?
                                                                <input name="count" autoFocus defaultValue={transactions[i].count} className="changeVal"
                                                                    onKeyPress={(e) => { e.key === 'Enter' ? this.handlerPressEnter(transactions[i]._id, e) : null }}
                                                                    onBlur={this.onBlurContent}
                                                                />
                                                                : transactions[i].count
                                                        }
                                                    </td>) : null
                                                    }
                                                    <td>{transactions[i].bonuse}</td>
                                                    <td>{transactions[i].commission}</td>
                                                    <td>{new Date(transactions[i].createAt).toLocaleString()}</td>
                                                </tr>
                                            ))
                                        }
                                        return renderTransactions;
                                    })()
                                }
                            </tbody>
                        </table>
                }
                {
                    ifPagination && (
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCount}
                            totalItemsCount={this.props.transactionsCount}
                            pageRangeDisplayed={5}
                            onChange={this.paginationOnChange}
                            prevPageText='<'
                            nextPageText='>'
                        />
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        transactionsLoading: store.transactions.loading,
        transactions: store.transactions.dataIn,
        transactionsCount: store.transactions.count,
        types: store.shop.types,
        shops: store.shop.shops,
        userType: store.user.data.type,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        GetBonusIn: (filter) => dispatch(GetBonusIn(filter)),
        GetTypes: () => dispatch(GetTypes()),
        GetShops: () => dispatch(GetShops()),
        ChangeCount: (id, count) => dispatch(ChangeCount(id, count))
    };
};

BonusIn.propTypes = {
    GetBonusIn: propTypes.func.isRequired,
    GetTypes: propTypes.func.isRequired,
    transactions: propTypes.arrayOf(propTypes.any).isRequired,
    types: propTypes.arrayOf(propTypes.any).isRequired,
    shops: propTypes.arrayOf(propTypes.any).isRequired,
    transactionsLoading: propTypes.bool.isRequired,
    transactionsCount: propTypes.number.isRequired,
    userType: propTypes.string.isRequired,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BonusIn));