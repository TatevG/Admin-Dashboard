import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import Select from 'react-select';
import _ from 'lodash';
import 'react-select/dist/react-select.css';

const MAX_DETAILS = 6;

class EditShopDetailsType extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            multi: true,
            value: props.value
                .map(item => ({ ...item, _id: item.type_id._id, name: item.type_id.name.en })),
            doubleClicked: null,
            doubleClickType: null,
        }
        this.handlerChangeBonusAndComission = this.handlerChangeBonusAndComission.bind(this);
        this.hendlerDoubleClick = this.hendlerDoubleClick.bind(this);
        this.onBlurContent = this.onBlurContent.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
                .map(item => ({ ...item, _id: item.type_id._id, name: item.type_id.name.en }))
        });
    }
    hendlerDoubleClick(id, type) {
        this.setState({ doubleClicked: id, doubleClickType: type })
    }
    onChange = async (value) => {
        let differenceToDelete = this.state.value && this.state.value.filter(x => !value.map(item => item._id).includes(x._id));
        let differenceToAdd = value.filter(x => !this.state.value.map(item => item._id).includes(x._id));
        if (differenceToDelete && !_.isEmpty(differenceToDelete)) {
            if (await window.modal.confirm('Are you sure?', 'You want to remove shop type from shop')) {
                this.props.RemoveTypeFromShop(this.props.shopId, differenceToDelete[0]._id);
            }
        } else if (differenceToAdd && !_.isEmpty(differenceToAdd)) {
            if (await window.modal.confirm('Are you sure?', 'You want to assign shop type to shop')) {
                const bonus = parseFloat(prompt("Bonus"));
                const comission = parseFloat(prompt("Comission"));
                const price = parseFloat(prompt("Price"));
                if (comission !== comission || bonus !== bonus || price !== price) {
                    alert("Wrong");
                    return 0;
                }
                this.props.AddTypeToShop(this.props.shopId, { type_id: differenceToAdd[0]._id, comission, bonus, price });
            }
        } else {
            await window.modal.alert('Error', 'Something wrong');
        }
    }
    handlerChangeBonusAndComission(e, id) {
        const { value } = this.state;
        const finded = value.find(typeItem => typeItem._id === id);
        finded[e.target.name] = e.target.value;
        this.setState({ value: [...value] });
    }
    onBlurContent() {
        this.setState({ doubleClicked: null, doubleClickType: null });
    }
    onKeyPressEnter(e, shopTypeId) {
        const { name, value } = e.target;
        switch (name) {
            case 'BONUS':
                if (value > 0 && value < 100) {
                    this.props.UpdateTypeBonusAndComission(shopTypeId, { bonus: value });
                } else {
                    alert("value must be between 0 and 100");
                }
                break;
            case 'Comission':
                if (value > 0 && value < 100) {
                    this.props.UpdateTypeBonusAndComission(shopTypeId, { comission: value });
                } else {
                    alert("value must be between 0 and 100");
                }
                break;
            case 'PRICE':
                if (value >= 1 && value <= 1000) {
                    this.props.UpdateTypeBonusAndComission(shopTypeId, { price: value });
                } else {
                    alert("value must be between 1 and 1000");
                }
                break;
            default:
                alert('something is wrong');
                break;
        }
        this.setState({ doubleClicked: null, doubleClickType: null });
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
    render() {
        const { doubleClicked, doubleClickType } = this.state;
        const { value } = this.props;
        return (
            <div className="shopDetailsSelBonCom">
                <div className="shopSelect">
                    <h4>Shop Details Type</h4>
                    <Select.Async
                        key={Math.random()} // the component wasn't updated when props change
                        multi={this.state.multi}
                        value={value.map(item => ({ ...item, _id: item.type_id._id, name: item.type_id.name.en }))}
                        onChange={this.onChange}
                        valueKey="_id"
                        labelKey="name"
                        loadOptions={this.getShopDetail}
                    />
                </div>
                <table className="bonusAndComission">
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
                                        <span>{typeItem.type_id.name.en}</span>
                                    </td>
                                    <td onDoubleClick={() => this.hendlerDoubleClick(typeItem._id, 'BONUS')}>
                                        {
                                            (doubleClicked === typeItem._id && doubleClickType === 'BONUS') ?
                                                <input name="BONUS" autoFocus defaultValue={typeItem.bonus} className="changeVal"
                                                    onKeyPress={(e) => { e.key === 'Enter' ? this.onKeyPressEnter(e, typeItem._id) : null }}
                                                    onBlur={this.onBlurContent}
                                                />
                                                : typeItem.bonus
                                        }
                                    </td>
                                    <td onDoubleClick={() => this.hendlerDoubleClick(typeItem._id, 'Comission')}>
                                        {
                                            (doubleClicked === typeItem._id && doubleClickType === 'Comission') ?
                                                <input name="Comission" autoFocus defaultValue={typeItem.comission} className="changeVal"
                                                    onKeyPress={(e) => { e.key === 'Enter' ? this.onKeyPressEnter(e, typeItem._id) : null }}
                                                    onBlur={this.onBlurContent}
                                                />
                                                : typeItem.comission
                                        }
                                    </td>
                                    <td onDoubleClick={() => this.hendlerDoubleClick(typeItem._id, 'PRICE')}>
                                        {
                                            (doubleClicked === typeItem._id && doubleClickType === 'PRICE') ?
                                                <input name="PRICE" autoFocus defaultValue={typeItem.price} className="changeVal"
                                                    onKeyPress={(e) => { e.key === 'Enter' ? this.onKeyPressEnter(e, typeItem._id) : null }}
                                                    onBlur={this.onBlurContent}
                                                />
                                                : typeItem.price
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
EditShopDetailsType.defaultProps = {
    value: [],
};
EditShopDetailsType.propTypes = {
    types: propTypes.arrayOf(propTypes.any).isRequired,
    AddTypeToShop: propTypes.func.isRequired,
    RemoveTypeFromShop: propTypes.func.isRequired,
    UpdateTypeBonusAndComission: propTypes.func.isRequired,
    value: propTypes.arrayOf(propTypes.any),
}
export default EditShopDetailsType;




