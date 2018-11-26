import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import Select from 'react-select';
import _ from 'lodash';
import GoogleMapComponentWrapper from '../../googleMaps';
import 'react-select/dist/react-select.css';


const MAX_DETAILS = 6;

class ShopDetails extends PureComponent {
    constructor() {
        super();
        super();
        this.state = {
            multi: true,
            name: {
                ru: '',
                am: '',
                en: '',
            },
            location: {
                lat: 0,
                long: 0,
            },
            address: '',
            description: '',
            image: null,
            file: null,
            value: [],
            cumulative: true,
            spendable: false,
            removeSelected: false,
            error: {
                nameamError: false,
                nameenError: false,
                nameruError: false,
                addressError: false,
            },
        }
        this.handlerNameChange = this.handlerNameChange.bind(this);
        this.handlerChangeBonusAndComission = this.handlerChangeBonusAndComission.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.handlerCheckbox = this.handlerCheckbox.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);
        this.imageChange = this.imageChange.bind(this);
    }
    onChange = async (value) => {
        let difference = this.state.value && this.state.value.filter(x => !value.includes(x));
        let differenceToAdd = value.filter(x => !this.state.value.map(item => item._id).includes(x._id));
        if (difference && !_.isEmpty(difference)) {
            if (await window.modal.confirm('Are you sure?', 'In this case, rows in Users will also being removed')) {
                this.setState({ value: value });
                this.props.changeParentState(value);
            }
        } else if (differenceToAdd && !_.isEmpty(differenceToAdd)) {
            const bonus = parseFloat(prompt("type the bonus of this type"));
            if (bonus <= 0 || bonus >= 100 || bonus !== bonus) {
                alert('bonus must be beetwin 0 - 100 ');
                return 0;
            }
            const comission = parseFloat(prompt("type the comission of this type"));
            if (comission <= 0 || comission >= 100 || comission !== comission) {
                alert('comission must be beetwin 0 - 100 ');
                return 0;
            }
            const price = parseFloat(prompt("type the pprice of this type"));
            if (price < 1 || price > 1000 || price !== price) {
                alert('price must be beetwin 1 - 1000 ');
                return 0;
            }
            this.setState({ value: [...this.state.value, { ...differenceToAdd[0], bonus, comission, price }] });
            this.props.changeParentState([...this.state.value, { ...differenceToAdd[0], bonus, comission, price }]);
        } else {
            alert('somethin is wrong');
        }
    }
    handlerChangeBonusAndComission(e, id) {
        const { value } = this.state;
        const finded = value.find(typeItem => typeItem._id === id);
        finded[e.target.name] = e.target.value;
        this.setState({ value: [...value] });
    }
    handlerChange(e) {
        const { name, value } = e.target;
        const error = this.validateField(name, value);
        this.setState({ [name]: value, error: Object.assign({}, this.state.error, error) });

    }
    validateField(fieldName, value) {
        let error = {};
        switch (fieldName) {
            case 'address':
                if (value && !(value.length > 2)) {
                    error.addressError = true;
                } else {
                    error.addressError = false;
                }
                break;
            default:
                throw new Error(`${fieldName} is not defined`);
                break;
        }
        return error;
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
                if (value && !(value.length >= 3)) {
                    error.nameamError = true;
                } else {
                    error.nameamError = false;
                }
                break;
            case 'en':
                if (value && !(value.length >= 3)) {
                    error.nameenError = true;
                } else {
                    error.nameenError = false;
                }
                break;
            case 'ru':
                if (value && !(value.length >= 3)) {
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
    handlerCheckbox(e) {
        this.setState({ [e.target.name]: !this.state[e.target.name] });
    }
    descriptionChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
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
    getShopDetail = (input, callback) => {
        const { types } = this.props;
        input = input.toLowerCase();

        var options = types.map(
            item => ({ ...item, name: item.name.en })
        ).filter(i => {
            return i.name.substr(0, input.length).toLowerCase() === input;
        });
        var data = {
            options: options.slice(0, MAX_DETAILS),
            complete: options.length <= MAX_DETAILS,
        };
        callback(null, data);
    }
    isValidComponent() {
        const { am, ru, en } = this.state.name;
        const { lat, long } = this.state.location;
        const { error, address, value } = this.state;
        if (am && ru && en && address && lat && long
            && (value && !_.isEmpty(value)) && value.every(item => (item.bonus > 0 && item.bonus < 100) && (item.comission > 0 && item.comission < 100) && (item.price >= 1 && item.price <= 1000))
            && Object.keys(error).every((item) => !error[item])) {
            return true;
        }
        return false;
    }
    render() {
        const { am, ru, en } = this.state.name;
        const { lat, long } = this.state.location;
        const { spendable, cumulative, error, address, description, image } = this.state;
        return (
            <div className="shopDetails">
                <h2>Shop Details</h2>
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
                        <label htmlFor="fileLoad"> <img src={image ? image : '/public/images/imageIcon.png'} className="image" /></label>
                        <input id="fileLoad" type="file" name="image" onChange={this.imageChange} />
                        <textarea value={description} name="description" onChange={this.descriptionChange}></textarea>
                    </div>
                </div>
                <div className="location">
                    <h4>Address and Loacation</h4>
                    <div className="addressWrapper">
                        <div className="shopAddress">
                            <input className={`valid ${error.addressError ? 'error' : ''}`}
                                type='text' name='address' value={address} onChange={this.handlerChange} placeholder="Address" />
                        </div>
                        <div className="shopLocation">
                            <input
                                name='lat' value={lat} />
                            <input
                                name='long' value={long} />
                        </div>
                    </div>
                </div>
                <div className="mapAndListWrapper">
                    <div className="googleMaps">
                        <GoogleMapComponentWrapper
                            getMarkerPosition={(position) => {
                                this.setState({ location: position });
                            }}
                            getAddress={(address) => {
                                this.setState({ address });
                            }}
                        />
                    </div>
                    <div className="bonusAndComission">
                        <table>
                            <thead>
                                {
                                    (this.state.value && this.state.value.length) ? (
                                        <tr>
                                            <th>Name</th>
                                            <th>Bonus</th>
                                            <th>Comission</th>
                                            <th>Price</th>
                                        </tr>
                                    ) : <tr></tr>
                                }
                            </thead>
                            <tbody>
                                {
                                    this.state.value.map(typeItem => (
                                        <tr key={typeItem._id}>
                                            <td>
                                                <span>{typeItem.name}</span>
                                            </td>
                                            <td>
                                                <input
                                                    name='bonus'
                                                    type='text'
                                                    onChange={(e) => this.handlerChangeBonusAndComission(e, typeItem._id)}
                                                    value={typeItem.bonus}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    name='comission'
                                                    type='text'
                                                    onChange={(e) => this.handlerChangeBonusAndComission(e, typeItem._id)}
                                                    value={typeItem.comission}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    name='price'
                                                    type='text'
                                                    onChange={(e) => this.handlerChangeBonusAndComission(e, typeItem._id)}
                                                    value={typeItem.price}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bottomPart">
                    <div className="bottomWrapper">
                        <div className="shopCheckbox">
                            <h4>Cumulative</h4>
                            <input type='checkbox' name='cumulative' onChange={this.handlerCheckbox} checked={cumulative} />
                            <h4>Spendable</h4>
                            <input type='checkbox' name='spendable' onChange={this.handlerCheckbox} checked={spendable} />
                        </div>
                        <div className="shopSelect">
                            <Select.Async
                                key={Math.random()} // the component wasn't updated when props change
                                multi={this.state.multi}
                                value={this.state.value}
                                onChange={this.onChange}
                                valueKey="_id"
                                labelKey="name"
                                loadOptions={this.getShopDetail}
                            />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
ShopDetails.propTypes = {
    types: propTypes.arrayOf(propTypes.any).isRequired,
    changeParentState: propTypes.func.isRequired,
}
export default ShopDetails;