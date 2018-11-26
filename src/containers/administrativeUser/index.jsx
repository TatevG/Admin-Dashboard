import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { GetAdministrativeUsers, UpdateAdministrativeUser, AddAdministrativeUser, DeleteAdministrativeUser } from '../../action/administrativeUsers';
import AdministrativeUsersTypes from '../../utilities/administrativeUsers';
import EditAdUserPopup from '../../components/administrativeUserComponents/editAdUserPopup';
import AddAdUserPopup from '../../components/administrativeUserComponents/addAdUserPopup';
import Pagination from "react-js-pagination";

const BASE_URL = process.env.BASE_URL;

class AdministrativeUser extends Component {
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
                type: '',
            },
            popupContent: '',

        };
        this.onChange = this.onChange.bind(this);
        this.paginationOnChange = this.paginationOnChange.bind(this);
        this.openEditAdUserPopup = this.openEditAdUserPopup.bind(this);
        this.openAddAdUserPopup = this.openAddAdUserPopup.bind(this);
        this.closeAdUserPopup = this.closeAdUserPopup.bind(this);
        this.onChange = this.onChange.bind(this);
        this.columeOnChange = this.columeOnChange.bind(this);
        this.deleteAdUser = this.deleteAdUser.bind(this);
    }
    onChange(e) {
        const { value: type, name } = e.target;
        const { filter } = this.state;
        switch (name) {
            case "rowCount":
                this.setState({ filter: { ...filter, limit: parseInt(type) }, itemsCount: parseInt(type), activePage: 1 });
                this.props.GetAdministrativeUsers({ ...filter, limit: parseInt(type), dec: (filter.dec) ? 1 : -1, offset: 0 });
                break;
            case "administrativeUserSelect":
                this.setState({ filter: { ...filter, type }, activePage: 1 });
                this.props.GetAdministrativeUsers({ ...filter, type, dec: (filter.dec) ? 1 : -1, offset: 0 });
                break;
            default:
                break;
        }

    }
    paginationOnChange(page) {
        const { filter, itemsCount } = this.state;
        this.setState({ activePage: page, filter: { ...filter, offset: (page - 1) * itemsCount } });
        this.props.GetAdministrativeUsers({ ...filter, offset: (page - 1) * itemsCount, dec: (filter.dec) ? 1 : -1 });
    }
    columeOnChange(orderBy) {
        const { filter } = this.state;
        if (orderBy !== filter.orderBy) {
            this.setState({ filter: { ...filter, orderBy } });
            this.props.GetAdministrativeUsers({ ...filter, orderBy, dec: (filter.dec) ? 1 : -1 });
        } else {
            this.setState({ filter: { ...filter, dec: !filter.dec } });
            this.props.GetAdministrativeUsers({ ...filter, dec: (!filter.dec) ? 1 : -1 });
        }

    }
    componentDidMount() {
        const { filter } = this.state;
        this.props.GetAdministrativeUsers({ ...filter, dec: (filter.dec) ? 1 : -1 });
    }
    openEditAdUserPopup(rowId) {
        const data = this.props.administrativeUsers.find((itemType) => itemType._id === rowId);
        this.setState({
            popupContent: (
                <EditAdUserPopup
                    closePopup={this.closeAdUserPopup}
                    UpdateAdministrativeUser={(dataUpdate) => { this.props.UpdateAdministrativeUser(rowId, dataUpdate) }}
                    // data={this.props.administrativeUsers}
                    data={data}

                />
            )
        });
    }
    openAddAdUserPopup() {
        this.setState({
            popupContent: (
                <AddAdUserPopup
                    closePopup={this.closeAdUserPopup}
                    AddAdministrativeUser={this.props.AddAdministrativeUser}
                />
            )
        });
    }
    closeAdUserPopup() {
        this.setState({ popupContent: '' });
    }
    async deleteAdUser(adUserId) {
        if (await window.modal.confirm('Are you sure?', 'Do you want to delete this administrative user?')) {
            this.props.DeleteAdministrativeUser(adUserId);
        }
    }
    render() {
        const { filter, popupContent } = this.state;
        const { administrativeUserLoading, administrativeUsers } = this.props;
        if (administrativeUserLoading) {
            return (
                <div className="loading">
                    <img src="/public/images/loading.gif" />
                </div>
            )
        }
        const ifPagination = this.props.administrativeUsersCount > this.state.itemsCount;
        return (
            <div className="administrativeList">
                <div className="selectFields">
                    <div className="selectType">
                        <h4>Choose Type</h4>
                        <select className="selectOption"
                            name='administrativeUserSelect'
                            value={filter.type}
                            onChange={this.onChange}
                        >
                            <option value='' disabled >Select</option>
                            {
                                Object.keys(AdministrativeUsersTypes).map(item => (
                                    <option value={AdministrativeUsersTypes[item]} key={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
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
                </div>
                <table className="administrativeTable">
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
                            <th onClick={() => this.columeOnChange('email.address')} >
                                Email
                                {filter.orderBy === 'email.address' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th onClick={() => this.columeOnChange('phone.number')} >
                                Phone
                                {filter.orderBy === 'phone.number' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                            </th>
                            <th>Type</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {administrativeUsers.map(item => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.surname}</td>
                                    <td>{item.email.address}</td>
                                    <td>{item.phone.number}</td>
                                    <td>{item.type}</td>
                                    <td><img src="/public/images/edit.png" onClick={() => { this.openEditAdUserPopup(item._id) }} /></td>
                                    <td><img src="/public/images/delete.png" onClick={() => { this.deleteAdUser(item._id) }} /></td>
                                </tr>
                            );
                        })}
                        <tr className="addAdUserShop">
                            <td colSpan="7">
                                <img src="/public/images/addRow.png" onClick={() => { this.openAddAdUserPopup() }} />
                            </td>
                        </tr>
                    </tbody>

                </table>
                {
                    ifPagination && (
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCount}
                            totalItemsCount={this.props.administrativeUsersCount}
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
        administrativeUserLoading: store.administrativeUsers.loading,
        administrativeUsers: store.administrativeUsers.data,
        administrativeUsersCount: store.administrativeUsers.count,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        GetAdministrativeUsers: (type = null) => dispatch(GetAdministrativeUsers(type)),
        UpdateAdministrativeUser: (rowId, dataUpdate) => dispatch(UpdateAdministrativeUser(rowId, dataUpdate)),
        AddAdministrativeUser: (dataAdd) => dispatch(AddAdministrativeUser(dataAdd)),
        DeleteAdministrativeUser: (adUserId) => dispatch(DeleteAdministrativeUser(adUserId)),

    };
};

AdministrativeUser.propTypes = {
    GetAdministrativeUsers: propTypes.func.isRequired,
    UpdateAdministrativeUser: propTypes.func.isRequired,
    AddAdministrativeUser: propTypes.func.isRequired,
    DeleteAdministrativeUser: propTypes.func.isRequired,
    administrativeUserLoading: propTypes.bool.isRequired,
    administrativeUsers: propTypes.arrayOf(propTypes.any).isRequired,
    administrativeUsersCount: propTypes.number.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdministrativeUser));