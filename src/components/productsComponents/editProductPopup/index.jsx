import React, { Component } from 'react';
import propTypes from 'prop-types';

class EditProductPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                nameError: false,
                codeError: false,
                newPriceError: false,
                endDateError: false,
            }
        }
        this.closePopup = this.closePopup.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.UpdateProduct = this.UpdateProduct.bind(this);
    }
    closePopup(e) {
        if (e.target.id === "editProductPopup") {
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
                break;
        }
        return error;
    }

    UpdateProduct() {
        const { error, ...rest } = this.state;
        if (Object.keys(error).every(item => !error[item])) {
            this.props.UpdateProduct(rest);
            this.props.closePopup();
        } else {
            alert("Incorrect Fields");
        }
    }
    render() {
        const { name, code, newPrice, endDate } = this.state;
        const { error, ...rest } = this.state;
        const { data } = this.props;
        const tempDate = new Date(data.endDate);
        const temp = `${tempDate.getFullYear()}-${("0" + (tempDate.getMonth() + 1)).slice(-2)}-${("0" + tempDate.getDate()).slice(-2)}`;
        return (
            <div className='editProductPopup' id="editProductPopup" onClick={this.closePopup}>
                <div className='popup_inner'>
                    <h2>Change Info</h2>
                    <label>
                        <h3>Name</h3>
                        <input className={`valid ${error.nameError ? 'error' : ''}`}
                            type="text" name="name" value={name === undefined ? data.name : name} onChange={this.handlerChange} />
                    </label>
                    <label>
                        <h3>Code</h3>
                        <input className={`valid ${error.codeError ? 'error' : ''}`}
                            type="text" name="code" value={code === undefined ? data.code : code} onChange={this.handlerChange} />
                    </label>
                    <label>
                        <h3>New Price</h3>
                        <input className={`valid ${error.newPriceError ? 'error' : ''}`}
                            type="text" name="newPrice" value={newPrice === undefined ? data.newPrice : newPrice } onChange={this.handlerChange} />
                    </label>
                    <label>
                        <h3>End Date</h3>
                        <input className={`valid ${error.endDateError ? 'error' : ''}`}
                            type="date" name="endDate" value={endDate === undefined ? temp : endDate} onChange={this.handlerChange} />
                    </label>
                    <div className="buttons">
                        <button className="btn" onClick={this.props.closePopup}>Cancel</button>
                        <button className="btn" disabled={!(Object.keys(rest).length > 0)} onClick={this.UpdateProduct}>Update</button>
                    </div>
                </div>
            </div>
        );
    }
}
EditProductPopup.propTypes = {
    UpdateProduct: propTypes.func.isRequired,
    closePopup: propTypes.func.isRequired,
}

export default EditProductPopup;