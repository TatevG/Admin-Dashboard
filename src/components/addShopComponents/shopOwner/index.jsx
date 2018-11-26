import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';
const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
const PHONE_REGEX = /^([+]\d{3}[.-\s]?)((91|99|96|43|55|95|41|44|93|94|77|98|49|97)[.-\s]?)(\d{2}[.-\s]?){3}$/;


class ShopOwner extends PureComponent {
    constructor() {
        super();
        this.state = {
            toggle: true,
            owner: '',
            name: '',
            surname: '',
            email: '',
            password: '',
            phone: '',
            error: {
                nameError: false,
                surnameError: false,
                emailError: false,
                passwordError: false,
                phoneError: false,
            }

        }
        this.handlerToggled = this.handlerToggled.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
    }
    handlerToggled(e) {
        this.setState({ toggle: !this.state.toggle });
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
            case 'owner':
                if (!value) {
                    error.phoneError = true;
                } else {
                    error.phoneError = false;
                }
                break;
            default:
                throw new Error(`${fieldName} is not defined`);
                break;
        }
        return error;
    }
    isValidComponent() {
        const { name, surname, email, password, phone, toggle, error, owner } = this.state;
        if (toggle === true) {
            if (name && surname && email && password && phone && Object.keys(error).every((item) => !error[item])) {
                return true;
            }
        } else {
            if (owner && !_.isEmpty(owner)) {
                return true;
            }
        }
        return false;
    }
    render() {
        const { toggle, owner, name, surname, email, password, phone, error } = this.state;
        return (
            <div className={`shopOwner ${toggle ? "hide" : ""}`}>
                <div className="headPart">
                    <h4>Owner</h4>
                    <div className="can-toggle can-toggle--size-large">
                        <input id="switcher" type="checkbox" />
                        <label htmlFor="switcher" onClick={this.handlerToggled}>
                            <div className="can-toggle__switch" data-checked="Select" data-unchecked="New"></div>
                        </label>
                    </div>
                </div>
                <select className="selectOption" name='owner' value={owner} onChange={this.handlerChange}>
                    <option value='' disabled >Select</option>
                    {this.props.owners.map((item) => {
                        return (<option key={item._id} value={item._id}>{`${item.name} ${item.surname}`}</option>)
                    })}
                </select>
                <div className="inputFields">
                    <input className={`valid ${error.nameError ? 'error' : ''}`}
                        type="text" name="name" value={name} onChange={this.handlerChange} placeholder="Name" />
                    <input className={`valid ${error.surnameError ? 'error' : ''}`}
                        type="text" name="surname" value={surname} onChange={this.handlerChange} placeholder="Surname" />
                    <input className={`valid ${error.emailError ? 'error' : ''}`}
                        type="email" name="email" value={email} onChange={this.handlerChange} placeholder="Email" />
                    <input className={`valid ${error.passwordError ? 'error' : ''}`}
                        type="password" name="password" value={password} onChange={this.handlerChange} placeholder="Password" />
                    <input className={`valid ${error.phoneError ? 'error' : ''}`}
                        type="text" name="phone" value={phone} onChange={this.handlerChange} placeholder="Phone" />
                </div>
            </div>
        );
    }
}

ShopOwner.propTypes = {
    owners: propTypes.arrayOf(propTypes.any).isRequired,
}

export default ShopOwner;