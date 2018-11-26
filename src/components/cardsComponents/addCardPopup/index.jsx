import React, { Component } from 'react';
import propTypes from 'prop-types';

const MAX_CARDS = 6;
const RANGE_REGEX = /^[1-9][0-9]{0,7}$/i;
const NUMBER_REGEX = /^\d{8}$/i;
class AddCardPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardAgent: '',
            start: '',
            end: '',
            number: '',
            toggle: true,
            error: {
                cardAgentError: false,
                startError: false,
                endError: false,
                numberError: false,
            },
        }
        this.handlerToggled = this.handlerToggled.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.AddCard = this.AddCard.bind(this);
    }
    handlerToggled() {
        this.setState({ toggle: !this.state.toggle });
    }
    handlerChange(e) {
        const { name, value } = e.target;
        const error = this.validateField(name, value);
        this.setState({ [name]: value, error: Object.assign({}, this.state.error, error) });
    }
    validateField(fieldName, value) {
        let error = {};
        switch (fieldName) {
            case 'start':
                if (value && !RANGE_REGEX.test(value)) {
                    error.startError = true;
                } else {
                    error.startError = false;
                }
                break;
            case 'end':
                if (value && !RANGE_REGEX.test(value)) {
                    error.endError = true;
                } else {
                    error.endError = false;
                }
                break;
            case 'number':
                if (value && !NUMBER_REGEX.test(value)) {
                    error.numberError = true;
                } else {
                    error.numberError = false;
                }
                break;
            case 'cardAgent':
                error.cardAgentError = false;
                break;
            default:
                throw new Error(`${fieldName} is not defined`);
                break;
        }
        return error;
    }
    closePopup(e) {
        if (e.target.id === "addCardPopup") {
            this.props.closePopup();
        }
    }
    async AddCard() {
        const { toggle, start, end, number, cardAgent, error } = this.state;
        if (toggle) {
            if (start && end && !error.startError && !error.endError  && cardAgent) {
                this.props.AddCardMany({ start, end, agentId : cardAgent });
            } else {
                await window.modal.alert('Error', 'Please check Your start and/or end numbers');
            }
        } else {
            if (number && !error.numberError  && cardAgent) {
                this.props.AddCard(number, cardAgent);
            } else {
                await window.modal.alert('Error', 'Please check Your card number');
            }
        }
        this.props.closePopup();
    }
    render() {
        const { error, toggle, cardAgent, number, start, end } = this.state;
        let disable = true;
        if(toggle) {
            disable = (!error.startError && !error.endError && start && end && cardAgent) ? false : true;
        } else {
            disable = (!error.numberError && number && cardAgent) ? false : true;
        }
        return (
            <div className="addCardPopup" id="addCardPopup" onClick={this.closePopup}>
                <div className={` popup_inner ${toggle ? "" : "hide"}`} >
                    <div className="headPart">
                        <div className="can-toggle can-toggle--size-large">
                            <input id="switcher1" type="checkbox" />
                            <label htmlFor="switcher1" onClick={this.handlerToggled}>
                                <div className="can-toggle__switch" data-checked="Single" data-unchecked="Range"></div>
                            </label>
                        </div>
                    </div>
                    <div className="range">
                        <div className="rangeElems">
                            <h4>From</h4>
                            <input type="text" className="rangeInput" name="start" value={start} onChange={this.handlerChange} />
                        </div>
                        <div className="rangeElems">
                            <h4>To</h4>
                            <input type="text" className="rangeInput" name="end" value={end} onChange={this.handlerChange} />
                        </div>
                    </div>
                    <div className="single">
                        <label htmlFor=""><b>Number</b>
                            <input className={`valid ${error.numberError ? 'error' : ''}`}
                                type="text" name="number" value={number} onChange={this.handlerChange} />
                        </label>
                    </div>
                    <div className="selectAgent">
                        <h3>Choose Card Agent</h3>
                        <select className="selectOption"
                            name='cardAgent'
                            value={cardAgent}
                            onChange={this.handlerChange}
                        >
                            <option value='' disabled >Select</option>
                            {this.props.agents.map((item) => {
                                return (<option key={item._id} value={item._id}>{`${item.name} ${item.surname}`}</option>)
                            })}
                        </select>
                    </div>
                    <div className="buttons">
                        <button className="btn" onClick={this.props.closePopup}>Cancel</button>
                        <button className="btn" disabled={disable} onClick={this.AddCard}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}
AddCardPopup.propTypes = {
    AddCard: propTypes.func.isRequired,
    AddCardMany: propTypes.func.isRequired,
    closePopup: propTypes.func.isRequired,
    agents: propTypes.arrayOf(propTypes.any).isRequired,
}
export default AddCardPopup;