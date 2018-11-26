import React, { PureComponent } from 'react';
import propTypes from 'prop-types';


class EditShopManager extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            manager: props.value,
        }
        this.onChange = this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ manager: nextProps.value });
    }
    async onChange(e) {
        const id = e.target.value;
        if (await window.modal.confirm('Are you sure?', 'You want to change this shop manager')) {
            this.props.AddManager(id);
        }
    }
    render() {
        const { manager } = this.state;
        if (manager) {
            return (
                <div className="shopManager">
                    <h4>Manager Info</h4>
                    <div className="shopManagerInfo">
                        {
                            `${manager.name} ${manager.surname}`
                        }
                    </div>
                </div>
            );
        } else {
            return (
                <div className="shopManager">
                    <h4>Manager Info</h4>
                    <div className="shopManagerInfo">
                        Your manager was deleted!
                        <select className="selectOption" name='managers' value={'null'} onChange={this.onChange} >
                            <option value="null" disabled >Choose </option>
                            {this.props.managers.map((item) => {
                                return (<option key={item._id} value={item._id} >{`${item.name} ${item.surname}`}</option>)
                            })}
                        </select>
                    </div>
                </div>
            );
        }
    }
}
EditShopManager.defaultProps = {
    value: {},
};
EditShopManager.propTypes = {
    value: propTypes.objectOf(propTypes.any),
    managers: propTypes.arrayOf(propTypes.any).isRequired,
    AddManager: propTypes.func.isRequired,
}

export default EditShopManager;