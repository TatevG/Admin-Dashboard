import React, { Component } from 'react';
import propTypes from 'prop-types';

class UseBonusPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            reason: '',
            error: {
                balanceError: false,
                reasonError: false,
            }
        }
        this.closePopup = this.closePopup.bind(this);
        this.UseUserBonus = this.UseUserBonus.bind(this);
        this.handlerChange = this.handlerChange.bind(this);

    }
    handlerChange(e) {
        const { name, value } = e.target;
        const error = this.validateField(name, value);
        this.setState({ [name]: value, error: Object.assign({}, this.state.error, error) });
    }
    validateField(fieldName, value) {
        let error = {};
        switch (fieldName) {
            case 'balance':
                if (value && value < 1) {
                    error.balance = true;
                } else {
                    error.balanceError = false;
                }
                break;
            case 'reason':
                if (!value) {
                    error.reasonError = true;
                } else {
                    error.reasonError = false;
                }
                break;
            default:
                throw new Error(`${fieldName} is not defined`);
                break;
        }
        return error;
    }
    closePopup(e) {
        if (e.target.id === "useBonusPopup") {
            this.props.closePopup();
        }
    }
    async UseUserBonus() {
        if(await window.modal.confirm('Are you sure', 'You want to use bonuses')){
            const { balance, reason } = this.state;
            this.props.UseUserBonus(balance, reason);
            this.props.closePopup();
        }
    }
    render() {
        const { balance, reason, error } = this.state;
        let disable = (!error.balanceError && !error.reasonError && balance && reason) ? false : true;
        const options = ['APPA', 'HOTEL']; //'CARPARTS', 'SHOPPAYMENT'
        return (
            <div className='useBonusPopup' id="useBonusPopup" onClick={this.closePopup}>
                <div className='popup_inner'>
                    <h2>Use Bonus</h2>
                    <div className="content">
                        <div className="balance">
                            <span>Current balance - {Math.round(this.props.balance*100)/100}</span>
                            <input type="number" name="balance" value={balance} onChange={this.handlerChange} />
                        </div>
                        <select className="selectOption" name='reason' value={reason} onChange={this.handlerChange}>
                            <option value='' disabled >Select</option>
                            {options.map((item, index) => {
                                return (<option key={index} value={item}>{item}</option>)
                            })}
                        </select>
                    </div>
                    <div className="buttons">
                        <button className="btn" onClick={this.props.closePopup}>Cancel</button>
                        <button className="btn" disabled={disable} onClick={this.UseUserBonus}>Use</button>
                    </div>
                </div>
            </div>
        );
    }
}
UseBonusPopup.propTypes = {
    UseUserBonus: propTypes.func.isRequired,
    closePopup: propTypes.func.isRequired,
    balance: propTypes.number.isRequired,
}
export default UseBonusPopup;