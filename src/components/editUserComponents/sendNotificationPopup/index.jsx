import React, { Component } from 'react';
import propTypes from 'prop-types';

class SendNotificationPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            error: {
                titleError: false,
                bodyError: false,
            }
        }
        this.closePopup = this.closePopup.bind(this);
        this.SendNotificationToUser = this.SendNotificationToUser.bind(this);
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
            case 'title':
                if (value && value < 3) {
                    error.titleError = true;
                } else {
                    error.titleError = false;
                }
                break;
            case 'body':
                if (value && value < 3) {
                    error.bodyError = true;
                } else {
                    error.bodyError = false;
                }
                break;
            default:
                throw new Error(`${fieldName} is not defined`);
                break;
        }
        return error;
    }
    closePopup(e) {
        if (e.target.id === "sendNotificationPopup") {
            this.props.closePopup();
        }
    }
    SendNotificationToUser() {
        const { title, body } = this.state;
        this.props.SendNotificationToUser(title, body);
        this.props.closePopup();
    }
    render() {
        const { title, body, error } = this.state;
        let disable = (!error.titleError && !error.bodyError && title && body) ? false : true;
        return (
            <div className='sendNotificationPopup' id="sendNotificationPopup" onClick={this.closePopup}>
                <div className='popup_inner'>
                    <h2>Send Notification</h2>
                    <input type="text" name="title" value={title} onChange={this.handlerChange} placeholder="Title" />
                    <textarea name="body" value={body} onChange={this.handlerChange} placeholder="Message Text"></textarea>
                    <div className="buttons">
                        <button className="btn" onClick={this.props.closePopup}>Cancel</button>
                        <button className="btn" disabled={disable} onClick={this.SendNotificationToUser}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}
SendNotificationPopup.propTypes = {
    SendNotificationToUser: propTypes.func.isRequired,
    closePopup: propTypes.func.isRequired,
}
export default SendNotificationPopup;