import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { GetDemoRequests } from '../../action/utilities';
import Pagination from "react-js-pagination";
import 'react-select/dist/react-select.css';

class DemoRequest extends Component {
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
        };
        this.onChange = this.onChange.bind(this);
        this.paginationOnChange = this.paginationOnChange.bind(this);
        this.columeOnChange = this.columeOnChange.bind(this);
    }
    onChange(e) {
        const { value } = e.target;
        const { filter } = this.state;
        this.setState({ filter: { ...filter, limit: parseInt(value) }, itemsCount: parseInt(value), activePage: 1 });
        this.props.GetDemoRequests({ ...filter, limit: parseInt(value), dec: (filter.dec) ? 1 : -1, offset: 0 });
    }
    paginationOnChange(page) {
        const { filter, itemsCount } = this.state;
        this.setState({ activePage: page, filter: { ...filter, offset: (page - 1) * itemsCount } });
        this.props.GetDemoRequests({ ...filter, offset: (page - 1) * itemsCount, dec: (filter.dec) ? 1 : -1 });
    }
    columeOnChange(orderBy) {
        const { filter } = this.state;
        if (orderBy !== filter.orderBy) {
            this.setState({ filter: { ...filter, orderBy } });
            this.props.GetDemoRequests({ ...filter, orderBy, dec: (filter.dec) ? 1 : -1 });
        } else {
            this.setState({ filter: { ...filter, dec: !filter.dec } });
            this.props.GetDemoRequests({ ...filter, dec: (!filter.dec) ? 1 : -1 });
        }

    }
    componentDidMount() {
        const { filter } = this.state;
        this.props.GetDemoRequests({ ...filter, dec: (filter.dec) ? 1 : -1 });
    }
    render() {
        const { filter } = this.state;
        const { loading, demoRequests, demoRequestsCount } = this.props;
        if (loading) {
            return (
                <div className="loading">
                    <img src="/public/images/loading.gif" />
                </div>
            )
        }
        const ifPagination = demoRequestsCount > this.state.itemsCount;
        return (
            <div className="demoRequests">
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
                <table className="demoRequestsTable">
                    <thead>
                        <tr>
                            <th onClick={() => this.columeOnChange('name')} >
                                Name
                                {filter.orderBy === 'name' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th onClick={() => this.columeOnChange('surname')} >
                                Surname
                                {filter.orderBy === 'surname' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th onClick={() => this.columeOnChange('email')} >
                                Email
                                {filter.orderBy === 'email' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th onClick={() => this.columeOnChange('phone')} >
                                Phone Number
                                {filter.orderBy === 'phone' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th onClick={() => this.columeOnChange('businessName')} >
                                BusinessName
                                {filter.orderBy === 'businessName' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th onClick={() => this.columeOnChange('note')} >
                                Note
                                {filter.orderBy === 'note' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (() => {
                                const renderdemoRequests = [];
                                for (let i = 0; i < Math.min(parseInt(filter.limit), demoRequests.length); i++) {
                                    renderdemoRequests.push((
                                        <tr key={demoRequests[i]._id}>
                                            <td>{demoRequests[i].name}</td>
                                            <td>{demoRequests[i].surname}</td>
                                            <td>{demoRequests[i].email}</td>
                                            <td>{demoRequests[i].phone}</td>
                                            <td>{demoRequests[i].businessName}</td>
                                            <td>{demoRequests[i].note}</td>
                                        </tr>
                                    ))
                                }
                                return renderdemoRequests;
                            })()
                        }
                    </tbody>
                </table>
                {
                    ifPagination && (
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCount}
                            totalItemsCount={this.props.demoRequestsCount}
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
        loading: store.utilities.loading,
        demoRequests: store.utilities.demoRequestData,
        demoRequestsCount: store.utilities.demoRequestCount,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        GetDemoRequests: (filter) => dispatch(GetDemoRequests(filter)),
    };
};

DemoRequest.propTypes = {
    GetDemoRequests: propTypes.func.isRequired,
    demoRequests: propTypes.arrayOf(propTypes.any).isRequired,
    loading: propTypes.bool.isRequired,
    demoRequestsCount: propTypes.number.isRequired,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DemoRequest));