import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { SearchCardsUnassigned } from '../../../action/utilities';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const NUMBER_REGEX = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
const MAX_CARDS = 6;
class EditUserOtherInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            multi: false,
            card: null,
            showButton: props.data.card === null? true : false,            
        }
        this.assignCard = this.assignCard.bind(this);
    }
    getCards = (input, callback) => {
        input = input.toLowerCase();
        if (input.length > 3) {
            SearchCardsUnassigned(input).then((dataIn) => {
                var data = {
                    options: dataIn.data.data.slice(0, MAX_CARDS),
                    complete: dataIn.data.data.length <= MAX_CARDS,
                };
                callback(null, data);
            }).catch(error => {
                callback(error, null);
                alert(error)
            });
        } else {
            callback(null, []);
        }
    }
    onChangeCards = (value) => {
        this.setState({
            card: value,
        });
    }
    assignCard(cardId) {
        this.props.AssignCard(cardId);
        this.setState({ showButton: false })
    }
    render() {
        const { data } = this.props;
        return (
            <div className="userInfo">
                <table>
                    <tbody>
                        <tr>
                            <td className="fieldName">Card Number</td>
                            <td className="fieldInput">
                                <div className="cardSelect">
                                    {
                                        data.username ? data.username : (
                                            <div className="select">
                                                <Select.Async
                                                    className="selectAsync"
                                                    key={Math.random()}
                                                    multi={this.state.multi}
                                                    value={this.state.card}
                                                    onChange={this.onChangeCards}
                                                    valueKey="_id"
                                                    labelKey="number"
                                                    loadOptions={this.getCards}
                                                />
                                            </div>)
                                    }
                                    {
                                        this.state.showButton?
                                            <button
                                                className="changeButton"
                                                disabled={!NUMBER_REGEX.test(this.state.card ? this.state.card._id : '')}
                                                onClick={() => { this.assignCard(this.state.card._id) }}
                                            >
                                                Assign
                                            </button> : ''
                                    }
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="fieldName">Balance</td>
                            <td className="fieldInput">
                                {data.balance ? Math.round(data.balance * 100) / 100 : 0}
                            </td>
                        </tr>
                        <tr>
                            <td className="fieldName">Agent</td>
                            <td className="fieldInput">
                                {data.agent ? `${data.agent.name} ${data.agent.surname}` : 'No Agent'}
                            </td>
                        </tr>
                        <tr>
                            <td className="fieldName">Provider</td>
                            <td className="fieldInput">
                                {data.provider? `${data.provider.name} ${data.provider.surname}` : 'no Provider'}
                                {/* {this.state.provider} */}
                            </td>
                        </tr>
                        <tr>
                            <td className="fieldName">Create At</td>
                            <td className="fieldInput">
                                {new Date(data.createAt).toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <td className="fieldName">Last Visit</td>
                            <td className="fieldInput">
                                {new Date(data.lastLoginDate).toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <td className="fieldName">Is Danger</td>
                            <td className="fieldInput">
                                {/* {this.props.data.danger} */}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
EditUserOtherInfo.defaultProps = {
    data: {},
};
EditUserOtherInfo.propTypes = {
    data: propTypes.objectOf(propTypes.any),
    AssignCard: propTypes.func.isRequired,
}

export default EditUserOtherInfo;
