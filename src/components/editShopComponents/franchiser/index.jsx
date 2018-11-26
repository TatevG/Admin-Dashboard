import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


const MAX_FRANCHISERS = 6;

class EditFranchiser extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            multi: true,
            value: props.value
            .map(item => ({...item, fullName: `${item.name} ${item.surname}` })),
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({ value: nextProps.value
            .map(item => ({...item, fullName: `${item.name} ${item.surname}` }))
        });
    }
    onChange = async value => {
        let differenceToDelete = this.state.value && this.state.value.filter(x => !value.map(item => item._id).includes(x._id));
        let differenceToAdd = value.filter(x => !this.state.value.map(item => item._id).includes(x._id));
        if (differenceToDelete && !_.isEmpty(differenceToDelete)) {
            if (await window.modal.confirm('Are you sure?', 'You want to remove franchiser from shop')) {
                this.props.RemoveFranchiserFromShop(this.props.shopId,differenceToDelete[0]._id);
            }
        } else if (differenceToAdd && !_.isEmpty(differenceToAdd)) {
            if (await window.modal.confirm('Are you sure?', 'You want to assign franchiser to shop')) {
                this.props.AssignFranchiserToShop(this.props.shopId, differenceToAdd[0]._id);
            }
        } else {
            await window.modal.alert('Error', 'Something wrong');
        }
    }
    
    getFranchisers = (input, callback) => {
        const { franchisers } = this.props;
        input = input.toLowerCase();
        var options = franchisers.map(
            item => ({ ...item, fullName: `${item.name} ${item.surname}` })
        ).filter(i => {
            return i.fullName.substr(0, input.length).toLowerCase() === input;
        });
        var data = {
            options: options.slice(0, MAX_FRANCHISERS),
            complete: options.length <= MAX_FRANCHISERS,
        };
        callback(null, data);
    }
    render() {
        const { value } = this.state;
        return (
            <div className= "section">
                <div className="headPart">
                    <h4>Assign or Delete Franchiser</h4>
                </div>
                <div className="select">
                    <Select.Async
                        key={Math.random()} // the component wasn't updated when props change
                        multi={this.state.multi}
                        value={ _.isEmpty(value)? this.state.value : value.map(item => ({...item, fullName: `${item.name} ${item.surname}` }))}
                        onChange={this.onChange}
                        valueKey="_id"
                        labelKey="fullName"
                        loadOptions={this.getFranchisers}
                    />
                </div>
            </div>
        );
    }
}
EditFranchiser.defaultProps = {
    value: [],
};
EditFranchiser.propTypes = {
    franchisers: propTypes.arrayOf(propTypes.any).isRequired,
    shopId: propTypes.string.isRequired,
    value: propTypes.arrayOf(propTypes.any),
}

export default EditFranchiser;
