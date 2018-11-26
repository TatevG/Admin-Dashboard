import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { GetShopsActivity } from '../../action/utilities';
import Pagination from "react-js-pagination";
import 'react-select/dist/react-select.css';

class ShopsActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: props.match.params.page || 1,
            toggle: true,
            itemsCount: 10,
            filter: {
                offset: ((props.match.params.page || 1) - 1) * 10,
                limit: 10,
                orderBy: 'lastActivity',
                dec: false,
            },
        };
        this.onChange = this.onChange.bind(this);
        this.paginationOnChange = this.paginationOnChange.bind(this);
        this.columeOnChange = this.columeOnChange.bind(this);
    }
    onChange(e) {
        const { value } = e.target;
        const { filter } = this.state;
        this.setState({ filter: { ...filter, limit: parseInt(value) }, itemsCount: parseInt(value), activePage: 1 });
        this.props.GetShopsActivity({ ...filter, limit: parseInt(value), dec: (filter.dec) ? 1 : -1, offset: 0 });
    }
    paginationOnChange(page) {
        const { filter, itemsCount } = this.state;
        this.setState({ activePage: page, filter: { ...filter, offset: (page - 1) * itemsCount } });
        this.props.GetShopsActivity({ ...filter, offset: (page - 1) * itemsCount, dec: (filter.dec) ? 1 : -1 });
    }
    columeOnChange(orderBy) {
        const { filter } = this.state;
        if (orderBy !== filter.orderBy) {
            this.setState({ filter: { ...filter, orderBy } });
            this.props.GetShopsActivity({ ...filter, orderBy, dec: (filter.dec) ? 1 : -1 });
        } else {
            this.setState({ filter: { ...filter, dec: !filter.dec } });
            this.props.GetShopsActivity({ ...filter, dec: (!filter.dec) ? 1 : -1 });
        }

    }
    componentDidMount() {
        const { filter } = this.state;
        this.props.GetShopsActivity({ ...filter, dec: (filter.dec) ? 1 : -1 });
    }
    render() {
        const { filter } = this.state;
        const { shopsActivityLoading, shopsActivity } = this.props;
        if (shopsActivityLoading) {
            return (
                <div className="loading">
                    <img src="/public/images/loading.gif" />
                </div>
            )
        }
        const ifPagination = this.props.shopsActivityCount > this.state.itemsCount;
        const now = Date.now();
        return (
            <div className="shopsActivity">
                <div className="searchField">
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
                <table className="shopsActivityTable">
                    <thead>
                        <tr>
                            <th onClick={() => this.columeOnChange('name')} >
                                Shop Name
                                {filter.orderBy === 'name' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th onClick={() => this.columeOnChange('addres')} >
                                Shop Address
                                {filter.orderBy === 'addres' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th onClick={() => this.columeOnChange('shopUserCount')} >
                                Users Count
                                {filter.orderBy === 'shopUserCount' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th onClick={() => this.columeOnChange('lastActivity')} >
                                Last Activity
                                {filter.orderBy === 'lastActivity' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (() => {
                                const renderShopsActivity = [];
                                for (let i = 0; i < Math.min(parseInt(filter.limit), shopsActivity.length); i++) {
                                    renderShopsActivity.push((
                                        <tr key={shopsActivity[i]._id}>
                                            <td>{shopsActivity[i].name}</td>
                                            <td>{shopsActivity[i].addres}</td>
                                            <td>{shopsActivity[i].shopUserCount}</td>
                                            <td>
                                                <div className="isActive">
                                                    <div className={`${(now - (new Date(shopsActivity[i].lastActivity)).valueOf() < 3600000) ? "green" : "red"}`} />{new Date(shopsActivity[i].lastActivity).toLocaleString() }
                                                </div>                                            
                                            </td>
                                        </tr>
                                    ))
                                }
                                return renderShopsActivity;
                            })()
                        }
                    </tbody>
                </table>
                {
                    ifPagination && (
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCount}
                            totalItemsCount={this.props.shopsActivityCount}
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
        shopsActivityLoading: store.utilities.loading,
        shopsActivity: store.utilities.data,
        shopsActivityCount: store.utilities.count,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        GetShopsActivity: (filter) => dispatch(GetShopsActivity(filter)),
    };
};

ShopsActivity.propTypes = {
    GetShopsActivity: propTypes.func.isRequired,
    shopsActivity: propTypes.arrayOf(propTypes.any).isRequired,
    shopsActivityLoading: propTypes.bool.isRequired,
    shopsActivityCount: propTypes.number.isRequired,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopsActivity));