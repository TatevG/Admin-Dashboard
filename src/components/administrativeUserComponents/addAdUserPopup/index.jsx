import React, { Component } from 'react';
import propTypes from 'prop-types';
import AdministrativeUsersTypes from '../../../utilities/administrativeUsers';

const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
const PHONE_REGEX = /^([+]\d{3}[.-\s]?)((91|99|96|43|55|95|41|44|93|94|77|98|49|97)[.-\s]?)(\d{2}[.-\s]?){3}$/;

class AddAdUserPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            administrativeUserType: '',
            name: '',
            surname: '',
            email: '',
            phone: '',
            password: '',
            error: {
                nameError: false,
                surnameError: false,
                emailError: false,
                passwordError: false,
                phoneError: false,
                adUserTypeError: false,
            }
        }
        this.closePopup = this.closePopup.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.AddAdministrativeUser = this.AddAdministrativeUser.bind(this);
    }
    closePopup(e) {
        if (e.target.id === "addAdUserPopup") {
            this.props.closePopup();
        }
    }
    handlerChange(e) {
        const { name, value } = e.target;
        const error = this.validateField(name, value);
        this.setState({ [name]: value, error: Object.assign({}, this.state.error, error) });
    }
    validateField(fieldName, value) {
        let error = {};
        switch (fieldName) {
            case 'name':
                if (value && !(value.length >= 3)) {
                    error.nameError = true;
                } else {
                    error.nameError = false;
                }
                break;
            case 'surname':
                if (value && !(value.length >= 3)) {
                    error.surnameError = true;
                } else {
                    error.surnameError = false;
                }
                break;
            case 'email':
                if (value && !EMAIL_REGEX.test(value)) {
                    error.emailError = true;
                } else {
                    error.emailError = false;
                }
                break;
            case 'password':
                if (value && !PASSWORD_REGEX.test(value)) {
                    error.passwordError = true;
                } else {
                    error.passwordError = false;
                }
                break;
            case 'phone':
                if (value && !PHONE_REGEX.test(value)) {
                    error.phoneError = true;
                } else {
                    error.phoneError = false;
                }
                break;
            case 'administrativeUserType':
                if (!value) {
                    error.adUserTypeError = true;
                } else {
                    error.adUserTypeError = false;
                }
                break;
            default:
                throw new Error(`${fieldName} is not defined`);
                break;
        }
        return error;
    }
    AddAdministrativeUser() {
        const { error, ...rest } = this.state;
        if (Object.keys(error).every(item => !error[item])) {
            this.props.AddAdministrativeUser(rest);
            this.props.closePopup();
        } else {
            alert("Incorrect Fields");
        }
    }
    render() {
        const { name, surname, email, phone, password, administrativeUserType, error } = this.state;
        return (
            <div className='addAdUserPopup' id="addAdUserPopup" onClick={this.closePopup}>
                <div className='popup_inner'>
                    <h2>Add New Product</h2>
                    <label>
                        <h3>Name</h3>
                        <input className={`valid ${error.nameError ? 'error' : ''}`}
                            type="text" name="name" value={name} onChange={this.handlerChange} />
                    </label>
                    <label>
                        <h3>Surname</h3>
                        <input className={`valid ${error.surnameError ? 'error' : ''}`}
                            type="text" name="surname" value={surname} onChange={this.handlerChange} />
                    </label>
                    <label>
                        <h3>Email</h3>
                        <input className={`valid ${error.emailError ? 'error' : ''}`}
                            type="text" name="email" value={email} onChange={this.handlerChange} />
                    </label>
                    <label>
                        <h3>Phone</h3>
                        <input className={`valid ${error.phoneError ? 'error' : ''}`}
                            type="text" name="phone" value={phone} onChange={this.handlerChange} />
                    </label>
                    <label>
                        <h3>Administrative User Type</h3>
                        <select className={`selectOption ${error.adUserTypeError ? 'error' : ''}`}
                            name='administrativeUserType'
                            value={administrativeUserType}
                            onChange={this.handlerChange}
                        >
                            <option value='' disabled >Select</option>
                            {
                                Object.keys(AdministrativeUsersTypes).map(item => (
                                    <option value={AdministrativeUsersTypes[item]} key={item}>{item}</option>
                                ))
                            }
                        </select>
                    </label>
                    <label>
                        <h3>Password</h3>
                        <input className={`valid ${error.passwordError ? 'error' : ''}`}
                            type="password" name="password" value={password} onChange={this.handlerChange} />
                    </label>
                    <div className="buttons">
                        <button className="btn" onClick={this.props.closePopup}>Cancel</button>
                        <button className="btn" onClick={this.AddAdministrativeUser}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}
AddAdUserPopup.propTypes = {
    AddAdministrativeUser: propTypes.func.isRequired,
    closePopup: propTypes.func.isRequired,
}
export default AddAdUserPopup;