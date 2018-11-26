import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const MAX_USERS = 6;
const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
const PHONE_REGEX = /^([+]\d{3}[.-\s]?)((91|99|96|43|55|95|41|44|93|94|77|98|49|97)[.-\s]?)(\d{2}[.-\s]?){3}$/;


class ShopUser extends PureComponent {
    constructor() {
        super();
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
            phone: '',
            value: null,
            data: []

        }
        this.handlerChange = this.handlerChange.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const avaliableTypsIds = nextProps.shopDetalsTypes.map((typeItem) => typeItem._id);
        const tempData = this.state.data.map((item) => {
            return { ...item, value: item.value.filter((valueItem) => avaliableTypsIds.includes(valueItem._id)) }
        });
        const newData = tempData.filter(tempDataItem => !_.isEmpty(tempDataItem.value));
        this.setState({
            data: newData,
            value: this.state.value && this.state.value
                .filter((item) => nextProps.shopDetalsTypes
                    .map((typeItem) => typeItem._id)
                    .includes(item._id)),
        });
    }
    handlerChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    addUser() {
        const { name, surname, password, email, phone, value, data } = this.state;
        if (name.length >= 2 &&
            surname.length >= 2 &&
            password.length > 6 &&
            email && EMAIL_REGEX.test(email) &&
            phone && PHONE_REGEX.test(phone) &&
            value && !_.isEmpty(value) &&
            data.findIndex(item => item.email.trim() === email.trim()) === -1 &&
            data.findIndex(item => item.phone.trim() === phone.trim()) === -1
        ) {
            this.state.data.push({ name, surname, password, email, phone, value });
            this.setState({
                data: [...this.state.data],
                name: '',
                surname: '',
                email: '',
                password: '',
                phone: '',
                value: null,
            });
        } else {
            alert("Incorrect Fields");
        }
    }
    async deleteUser(index) {
        if (await window.modal.confirm('Are you sure?', 'Do you want to delete this user?')) {
            this.state.data.splice(index, 1);
            this.setState({ data: [...this.state.data] });
        }
    }
    onChange = (value) => {
        this.setState({
            value: value
        });
    }
    getShopUser = (input, callback) => {
        const { shopDetalsTypes } = this.props;
        input = input.toLowerCase();
        var options = shopDetalsTypes.filter(i => {
            return i.name.substr(0, input.length).toLowerCase() === input;
        });
        var data = {
            options: options.slice(0, MAX_USERS),
            complete: options.length <= MAX_USERS,
        };
        callback(null, data);
    }
    isValidComponent() {
        const { data } = this.state;
        if (!_.isEmpty(data)) {
            return true;
        }
        return false;
    }
    render() {
        const { name, surname, email, password, phone, data } = this.state;
        return (
            <div className="shopUser">
                <h2>Shop User</h2>
                <table className="userTable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Phone</th>
                            <th>Select</th>
                            <th>Add/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.surname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.password}</td>
                                    <td>{item.phone}</td>
                                    <td className="showSelected">{item.value.map(item => item.name).join('\n')}
                                        {/* <span>{item.value.map(item => item.name).join('\n')}</span> */}
                                    </td>
                                    <td><img src="/public/images/delete.png" onClick={() => { this.deleteUser(index) }} /></td>
                                </tr>
                            ))
                        }
                        <tr className="addRow">
                            <td>
                                <input name="name" value={name} onChange={this.handlerChange} />
                            </td>
                            <td>
                                <input name="surname" value={surname} onChange={this.handlerChange} />
                            </td>
                            <td>
                                <input name="email" value={email} onChange={this.handlerChange} />
                            </td>
                            <td>
                                <input name="password" value={password} onChange={this.handlerChange} />
                            </td>
                            <td>
                                <input name="phone" value={phone} onChange={this.handlerChange} />
                            </td>
                            <td className="userSelect">
                                <Select.Async
                                    key={Math.random()} // the component wasn't updated when props change
                                    multi={true}
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    valueKey="_id"
                                    labelKey="name"
                                    loadOptions={this.getShopUser}
                                />
                            </td>
                            <td style={{ width: "60px" }}>
                                <img src="/public/images/addRow.png" onClick={this.addUser} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

ShopUser.propTypes = {
    shopDetalsTypes: propTypes.arrayOf(propTypes.any).isRequired,
}

export default ShopUser;