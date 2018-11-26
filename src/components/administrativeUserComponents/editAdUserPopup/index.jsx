import React, { Component } from 'react';
import propTypes from 'prop-types';

const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
const PHONE_REGEX = /^([+]\d{3}[.-\s]?)((91|99|96|43|55|95|41|44|93|94|77|98|49|97)[.-\s]?)(\d{2}[.-\s]?){3}$/;

class EditAdUserPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePassword: false,
            error: {
                nameError: false,
                surnameError: false,
                emailError: false,
                passwordError: false,
                phoneError: false,
            }
        }
        this.closePopup = this.closePopup.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onClickPassword = this.onClickPassword.bind(this);
        this.UpdateAdministrativeUser = this.UpdateAdministrativeUser.bind(this);
    }
    closePopup(e) {
        if (e.target.id === "editAdUserPopup") {
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
            case 'phone':
                if (value && !PHONE_REGEX.test(value)) {
                    error.phoneError = true;
                } else {
                    error.phoneError = false;
                }
                break;
            case 'password':
                if (!PASSWORD_REGEX.test(value)) {
                    error.passwordError = true;
                } else {
                    error.passwordError = false;
                }
                break;
            default:
                throw new Error(`${fieldName} is not defined`);
                break;
        }
        return error;
    }
    onChangePassword(event) {
        if (this.state.changePassword) {
            const error = this.validateField('password', event.target.value);
            this.setState({ 'password': event.target.value, error: Object.assign({}, this.state.error, error) });
        }
    }
    onClickPassword(event) {
        if (this.state.changePassword) {
            this.setState({
                changePassword: false,
                password: null,
                error: { ...this.state.error, passwordError: false },
            })
        } else {
            this.setState({
                changePassword: true,
                password: "",
                error: { ...this.state.error, passwordError: true },
            })
        }
    }
    UpdateAdministrativeUser() {
        const { changePassword, error, ...rest } = this.state;
        if (Object.keys(error).every(item => !error[item])) {
            if(!changePassword){
                delete rest.password;
            }
            this.props.UpdateAdministrativeUser(rest);
            this.props.closePopup();
        } else {
            alert("Incorrect Fields");
        }
    }
    render() {
        const { name, surname, email, phone, password } = this.state;
        const { changePassword, error, ...rest } = this.state;
        if(!changePassword){
            delete rest.password;
        }
        const { data } = this.props;
        return (
            <div className='editAdUserPopup' id="editAdUserPopup" onClick={this.closePopup}>
                <div className='popup_inner'>
                    <h2>Change Info</h2>
                    <label>
                        <h3>Name</h3>
                        <input className={`valid ${error.nameError ? 'error' : ''}`}
                            type="text" name="name" value={name === undefined ? data.name : name} onChange={this.handlerChange} />
                    </label>
                    <label>
                        <h3>Surname</h3>
                        <input className={`valid ${error.surnameError ? 'error' : ''}`}
                            type="text" name="surname" value={surname === undefined ? data.surname : surname} onChange={this.handlerChange} />
                    </label>
                    <label>
                        <h3>Email</h3>
                        <input className={`valid ${error.emailError ? 'error' : ''}`}
                            type="text" name="email" value={email === undefined ? data.email.address : email } onChange={this.handlerChange} />
                    </label>
                    <label>
                        <h3>Phone</h3>
                        <input className={`valid ${error.phoneError ? 'error' : ''}`}
                            type="text" name="phone" value={phone === undefined ? data.phone.number : phone } onChange={this.handlerChange} />
                    </label>
                    <div className={`changePassword ${changePassword ? 'open' : 'close'}`}>
                        {changePassword?
                            (<input className={`valid ${error.passwordError ? 'error' : ''}`}
                            type="password" name="password" value={password} onChange={this.onChangePassword} />) : ''
                        }
                        <span onClick={this.onClickPassword} >{changePassword ? '<<' : 'Change Password >>'}</span>
                    </div>
                    <div className="buttons">
                        <button className="btn" onClick={this.props.closePopup}>Cancel</button>
                        <button className="btn" disabled={!(Object.keys(rest).length > 0)} onClick={this.UpdateAdministrativeUser}>Update</button>
                    </div>
                </div>
            </div>
        );
    }
}
EditAdUserPopup.propTypes = {
    UpdateAdministrativeUser: propTypes.func.isRequired,
    closePopup: propTypes.func.isRequired,
}

export default EditAdUserPopup;