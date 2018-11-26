import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const MAX_USERS = 6;
const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const PHONE_REGEX = /^([+]\d{3}[.-\s]?)((91|99|96|43|55|95|41|44|93|94|77|98|49|97)[.-\s]?)(\d{2}[.-\s]?){3}$/;


class EditShopUser extends PureComponent {
    constructor() {
        super();
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
            phone: '',
            value: null,
            doubleClicked: null,
        }
        this.hendlerDoubleClick = this.hendlerDoubleClick.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }
    handlerChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    hendlerDoubleClick(id) {
        this.setState({ doubleClicked: id})
    }
    async addUser() {
        const { name, surname, password, email, phone, value } = this.state;
        if (name.length >= 2 &&
            surname.length >= 2 &&
            password.length > 6 &&
            email && EMAIL_REGEX.test(email) &&
            phone && PHONE_REGEX.test(phone) &&
            value && !_.isEmpty(value)
        ) {
            if (await window.modal.confirm('Are you sure?', 'You want to assign shop type to shop')) {
                const user = {
                    name,
                    surname,
                    password,
                    email,
                    phone,
                    shopTypePermission: value.map(item => item._id),
                };
                this.props.AddUserToShop(user);
                this.setState({
                    name: '',
                    surname: '',
                    email: '',
                    password: '',
                    phone: '',
                    value: null,
                });
            }
        } else {
            alert("Incorrect Fields");
        }
    }
    async deleteUser(id) {
        if (await window.modal.confirm('Are you sure?', 'Do you want to delete this user?')) {
            this.props.DeleteUserFromShop(id);
        }
    }
    onChange = (value) => {
        this.setState({
            value: value
        });
    }
    async onChangeItem(userId, value) {
        const temp = (this.props.types.filter(itemtype => this.props.value.find((item) => item._id === userId).shopTypePermission.includes(itemtype.type_id._id))).map(singlType => ({ ...singlType,  _id: singlType.type_id._id,  name: singlType.type_id.name.en }))
        let differenceToDelete = temp && temp.filter(x => !value.map(item => item._id).includes(x._id));
        let differenceToAdd = value.filter(x => !temp.map(item => item._id).includes(x._id));
        if (differenceToDelete && !_.isEmpty(differenceToDelete)) {
            if (await window.modal.confirm('Are you sure?', 'You want to remove shop type from shop')) {
                this.props.DelShopUserPermission(userId, differenceToDelete[0]._id);
            }
        } else if (differenceToAdd && !_.isEmpty(differenceToAdd)) {
            if (await window.modal.confirm('Are you sure?', 'You want to assign shop type to shop')) {
                this.props.AddShopUserPermission(userId, differenceToAdd[0]._id);
            }
        } else {
            await window.modal.alert('Error', 'Something wrong');
        }
    }
    getShopUser = (input, callback) => {
        const { types } = this.props;
        input = input.toLowerCase();
        var options = types.map(
            item => ({ ...item, _id: item.type_id._id,  name: item.type_id.name.en })
        ).filter(i => {
            return i.name.substr(0, input.length).toLowerCase() === input;
        });
        var data = {
            options: options.slice(0, MAX_USERS),
            complete: options.length <= MAX_USERS,
        };
        callback(null, data);
    }
    render() {
        const { name, surname, email, password, phone, doubleClicked } = this.state;
        const { value: valueProps, types } = this.props;
        return (
            <div className="editShopUser">
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
                            valueProps && valueProps.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.surname}</td>
                                    <td>{item.email.address}</td>
                                    <td> </td>
                                    <td>{item.phone.number}</td>
                                    <td onDoubleClick={() => this.hendlerDoubleClick(item._id)} className="showSelected">{
                                        doubleClicked === item._id ? (
                                            <Select.Async
                                                key={Math.random()} // the component wasn't updated when props change
                                                multi={true}
                                                value={(types.filter(itemtype => item.shopTypePermission.includes(itemtype.type_id._id))).map(singlType => ({ ...singlType,  _id: singlType.type_id._id, name: singlType.type_id.name.en }))}
                                                onChange={(value) => { this.onChangeItem(item._id,value) }}
                                                valueKey="_id"
                                                labelKey="name"
                                                loadOptions={this.getShopUser}
                                            />
                                        ) : ((types.filter(itemtype => item.shopTypePermission.includes(itemtype.type_id._id))).map(singlType => singlType.type_id.name.en)).join('\n')

                                    }
                                    </td>
                                    <td><img src="/public/images/delete.png" onClick={() => { this.deleteUser(item._id) }} /></td>
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

EditShopUser.defaultProps = {
    value: [],
    types: [],
};

EditShopUser.propTypes = {
    value: propTypes.arrayOf(propTypes.any),
    types: propTypes.arrayOf(propTypes.any),
    AddUserToShop: propTypes.func.isRequired,
    DeleteUserFromShop: propTypes.func.isRequired,
    DelShopUserPermission: propTypes.func.isRequired,
    AddShopUserPermission: propTypes.func.isRequired,
}

export default EditShopUser;