import React, { Component } from 'react';
import propTypes from 'prop-types';

const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
const PHONE_REGEX = /^([+]\d{3}[.-\s]?)((91|99|96|43|55|95|41|44|93|94|77|98|49|97)[.-\s]?)(\d{2}[.-\s]?){3}$/;

class AddProductPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            code: '',
            newPrice: '',
            endDate: '',
            error: {
                nameError: false,
                codeError: false,
                newPriceError: false,
                endDateError: false,
            }
        }
        this.closePopup = this.closePopup.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.AddProduct = this.AddProduct.bind(this);
    }
    closePopup(e) {
        if (e.target.id === "addProductPopup") {
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
            case 'code':
                if (value && !(value.length >= 3)) {
                    error.codeError = true;
                } else {
                    error.codeError = false;
                }
                break;
            case 'newPrice':
                if (value && !(value.length >= 3)) {
                    error.newPriceError = true;
                } else {
                    error.newPriceError = false;
                }
                break;
            case 'endDate':
                if (!value) {
                    error.endDateError = true;
                } else {
                    error.endDateError = false;
                }
                break;
            default:
                throw new Error(`${fieldName} is not defined`);
        }
        return error;
    }
    AddProduct() {
        const { error, ...rest } = this.state;
        if (Object.keys(error).every(item => !error[item])) {
            let time = new Date(rest.endDate);
            time.setHours(23);
            time.setMinutes(59);
            time.setSeconds(59);
            rest.endDate = time.valueOf();
            this.props.AddProduct(rest);
            this.props.closePopup();
        } else {
            alert("Incorrect Fields");
        }
    }
    render() {
        const { name, code, newPrice, endDate, error } = this.state;
        return (
            <div className='addProductPopup' id="addProductPopup" onClick={this.closePopup}>
                <div className='popup_inner'>
                    <h2>Change Info</h2>
                    <label>
                        <h3>Name</h3>
                        <input className={`valid ${error.nameError ? 'error' : ''}`}
                            type="text" name="name" value={name} onChange={this.handlerChange} />
                    </label>
                    <label>
                        <h3>Code</h3>
                        <input className={`valid ${error.codeError ? 'error' : ''}`}
                            type="text" name="code" value={code} onChange={this.handlerChange} />
                    </label>
                    <label>
                        <h3>New Price</h3>
                        <input className={`valid ${error.newPriceError ? 'error' : ''}`}
                            type="text" name="newPrice" value={newPrice} onChange={this.handlerChange} />
                    </label>
                    <label>
                        <h3>Date</h3>
                        <input className={`valid ${error.endDateError ? 'error' : ''}`}
                            type="date" name="endDate" value={endDate} onChange={this.handlerChange} 
                        />
                    </label>
                    <div className="buttons">
                        <button className="btn" onClick={this.props.closePopup}>Cancel</button>
                        <button className="btn" onClick={this.AddProduct}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}
AddProductPopup.propTypes = {
    AddProduct: propTypes.func.isRequired,
    closePopup: propTypes.func.isRequired,
}
export default AddProductPopup;