import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';
const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
const PHONE_REGEX = /^([+]\d{3}[.-\s]?)((91|99|96|43|55|95|41|44|93|94|77|98|49|97)[.-\s]?)(\d{2}[.-\s]?){3}$/;


class EditShopOwner extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            owner: props.value ? props.value._id : 'null',
        }
        this.onChange = this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ owner: nextProps.value ? nextProps.value._id : 'null' });
    }
    async onChange(e) {
        const id = e.target.value;
        if (await window.modal.confirm('Are you sure?', 'You want to change this shop owner')) {
            this.props.ChangeOwner(this.props.shopId, id);
        }
    }
    render() {
        const { owner } = this.state;
        return (
            <div className="shopOwner">
                <div className="headPart">
                    <h4>Change Owner</h4>
                </div>
                <select className="selectOption" name='owner' value={owner} onChange={this.onChange} >
                    {
                        this.state.owner === 'null' ? (
                            <option value='null' disabled >
                                No owner
                            </option>
                        ) : ''
                    }
                    {this.props.owners.map((item) => {
                        return (<option key={item._id} value={item._id} >{`${item.name} ${item.surname}`}</option>)
                    })}
                </select>
            </div>
        );
    }
}
EditShopOwner.defaultProps = {
    value: {},
};
EditShopOwner.propTypes = {
    owners: propTypes.arrayOf(propTypes.any).isRequired,
    value: propTypes.objectOf(propTypes.any),
    shopId: propTypes.string.isRequired,
    ChangeOwner: propTypes.func.isRequired,
}

export default EditShopOwner;