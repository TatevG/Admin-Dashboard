import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';
import GoogleMapComponentWrapper from '../../googleMaps';
import 'react-select/dist/react-select.css';

const BASE_URL_IMG = process.env.BASE_URL + '/assets/';
class EditShopDetails extends PureComponent {
    constructor(props) {
        super(props);
        const description = props.value.description? props.value.description : null;
        this.state = {
            name: props.value.name ? props.value.name : { en: '', ru: '', am: '' },
            location: {
                lat: props.value.location ? props.value.location[0] : 0,
                long: props.value.location ? props.value.location[1] : 0,
            },
            address: props.value.address,
            cumulative: props.value.cumulative,
            spendable: props.value.spendable,
            description: description ?`${description.en}||||${description.ru}||||${description.am}` : ' ',
            image: props.value.imageUrl ? `${BASE_URL_IMG}${props.value.imageUrl}` : null,
            file: null,
            error: {
                nameamError: false,
                nameenError: false,
                nameruError: false,
            },
        }
        this.handlerNameChange = this.handlerNameChange.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.handlerCheckC = this.handlerCheckC.bind(this);
        this.updateDetails = this.updateDetails.bind(this);
        this.deepEqual = this.deepEqual.bind(this);
        this.imageChange = this.imageChange.bind(this);
    }
    handlerChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handlerNameChange(e) {
        const { name, value } = e.target;
        const error = this.validateNameField(name, value);
        this.setState({ name: Object.assign({}, this.state.name, { [e.target.name]: e.target.value }), error: Object.assign({}, this.state.error, error) });
    }
    validateNameField(fieldName, value) {
        let error = {};
        switch (fieldName) {
            case 'am':
                if (!(value.length >= 3)) {
                    error.nameamError = true;
                } else {
                    error.nameamError = false;
                }
                break;
            case 'en':
                if (!(value.length >= 3)) {
                    error.nameenError = true;
                } else {
                    error.nameenError = false;
                }
                break;
            case 'ru':
                if (!(value.length >= 3)) {
                    error.nameruError = true;
                } else {
                    error.nameruError = false;
                }
                break;
            default:
                throw new Error(`${fieldName} is not defined`);
                break;
        }
        return error;
    }
    handlerCheckC(e) {
        this.setState({ [e.target.name]: !this.state[e.target.name] });
    }
    imageChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({ image: reader.result, file });
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    deepEqual(oldDetails, newDetails) {
        if (typeof oldDetails === typeof newDetails && typeof oldDetails !== 'object' && typeof oldDetails !== 'function') {
            if (oldDetails !== oldDetails && newDetails !== newDetails) { // for NaN
                return true;
            }
            if (oldDetails == newDetails) { // for other simple types
                return true;
            }
        } else if (typeof oldDetails === typeof newDetails && typeof oldDetails == "object") {
            return Object.keys(oldDetails).filter(item => oldDetails.hasOwnProperty(item)).every((item) => {
                if (newDetails.hasOwnProperty(item)) {
                    if (this.deepEqual(oldDetails[item], newDetails[item])) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
        } else if (typeof oldDetails === typeof newDetails && typeof oldDetails == "function") {
            return true;
        } else {
            return false;
        }
    }
    updateDetails() {
        const { error, image, file, ...rest } = this.state;
        const { name, location, address, cumulative, spendable, description } = this.props.value;
        const temp = {
            name, address, cumulative, spendable,
            location: {
                lat: location[0],
                long: location[1],
            },
            description: description ?`${description.en}||||${description.ru}||||${description.am}` : ' ',
        };

        if (Object.keys(error).every(item => !error[item]) && (!this.deepEqual(temp, rest) || file !== null)) {
            this.props.UpdateShopDetails(rest, file);
        }
    }
    render() {
        const { am, ru, en } = this.state.name;
        const { lat, long } = this.state.location;
        const { spendable, cumulative, error, address, image, description } = this.state;
        return (
            <div className="editShopDetails">
                <div className="shopNames">
                    <h4>Names</h4>
                    <div className="namesWrapper">
                        <input className={`valid ${error.nameamError ? 'error' : ''}`}
                            name='am' value={am} onChange={this.handlerNameChange} placeholder="Name AM" />
                        <input className={`valid ${error.nameruError ? 'error' : ''}`}
                            name='ru' value={ru} onChange={this.handlerNameChange} placeholder="Name RU" />
                        <input className={`valid ${error.nameenError ? 'error' : ''}`}
                            name='en' value={en} onChange={this.handlerNameChange} placeholder="Name EN" />
                    </div>
                </div>
                <div className="shopImage">
                    <h4>Image and Desctiption</h4>
                    <div className="imageWrapper">
                        <label htmlFor="fileLoad"> <img src={image || this.props.value.imageUrl || '/public/images/imageIcon.png'} className="image" /></label>
                        <input id="fileLoad" type="file" name="image" onChange={this.imageChange} />
                        <textarea value={description} name="description" onChange={this.handlerChange}></textarea>
                    </div>
                </div>
                <div className="location">
                    <h4>Address and Loacation</h4>
                    <div className="addressWrapper">
                        <div className="shopAddress">
                            <input
                                type='text' name='address' onChange={this.handlerChange} value={address} placeholder="Address"
                            />
                        </div>
                        <div className="shopLocation">
                            <input
                                name='lat' readOnly value={lat} />
                            <input
                                name='long' readOnly value={long} />
                        </div>
                    </div>
                    <div className="googleMaps">
                        <GoogleMapComponentWrapper
                            getMarkerPosition={(position) => {
                                this.setState({ location: position });
                            }}
                            getAddress={(address) => {
                                this.setState({ address });
                            }}
                            value={{ lat, long }}
                        />
                    </div>
                </div>
                <div className="bottomPart">
                    <div className="bottomWrapper">
                        <div className="shopCheckbox">
                            <h4>cumulative</h4>
                            <input type='checkbox' name='cumulative' onChange={this.handlerCheckC} checked={cumulative} />
                            <h4>Spendable</h4>
                            <input type='checkbox' name='spendable' onChange={this.handlerCheckC} checked={spendable} />
                        </div>
                        <button className="updateBtn" onClick={this.updateDetails} disabled={this.props.updateShopLoading}>Update</button>
                    </div>
                </div>
            </div>
        );
    }
}
EditShopDetails.defaultProps = {
    value: {},
};
EditShopDetails.propTypes = {
    value: propTypes.objectOf(propTypes.any),
    updateShopLoading: propTypes.bool.isRequired,
    UpdateShopDetails: propTypes.func.isRequired,
}
export default EditShopDetails;