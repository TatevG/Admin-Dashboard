import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Select from 'react-select';
import {
    GetCards,
    GetCardById,
    AddCard,
    AddCardMany,
    DeleteCard,
    UnAssigned,
    GetAgents,
    AssignAgent,
} from '../../action/cards';
import { SearchCards } from '../../action/utilities';
import Pagination from "react-js-pagination";
import AddCardPopup from '../../components/cardsComponents/addCardPopup';
import 'react-select/dist/react-select.css';

const MAX_CARDS = 6;
class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            multi: false,
            value: null,
            doubleClicked: null,
            cardAgent: '',
            activePage: props.match.params.page || 1,
            itemsCount: 10,
            filter: {
                offset: ((props.match.params.page || 1) - 1) * 10,
                limit: 10,
                orderBy: 'createAt',
                dec: false,
                order: null,
            },
            popupContent: '',
        };
        this.unAssigned = this.unAssigned.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeCards = this.onChangeCards.bind(this);
        this.handlerChangeAgent = this.handlerChangeAgent.bind(this);
        this.hendlerDoubleClick = this.hendlerDoubleClick.bind(this);
        this.paginationOnChange = this.paginationOnChange.bind(this);
        this.columeOnChange = this.columeOnChange.bind(this);
        this.openAddCardPopup - this.openAddCardPopup.bind(this);
        this.closeCardPopup = this.closeCardPopup.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.checkAssignType = this.checkAssignType.bind(this);
    }
    onChange(e) {
        const { value } = e.target;
        const { filter } = this.state;
        this.setState({ filter: { ...filter, limit: parseInt(value) }, itemsCount: parseInt(value), activePage: 1 });
        this.props.GetCards({ ...filter, limit: parseInt(value), dec: (filter.dec) ? 1 : -1, offset: 0 });
    }
    checkAssignType(e) {
        const { filter } = this.state;
        const { value } = e.target;
        switch (value) {
            case 'all':
                console.log('value', value);
                console.log('filter', filter);
                this.setState({ filter: { ...filter, order: 0 } });
                this.props.GetCards({ ...filter, order: 0, dec: (filter.dec) ? 1 : -1 });
                break;
            case 'assigned':
                console.log('value', value);
                console.log('filter', filter);
                this.setState({ filter: { ...filter, order: 1 } });
                this.props.GetCards({ ...filter, order: 1, dec: (filter.dec) ? 1 : -1 });
                break;
            case 'unassigned':
                console.log('value', value);
                console.log('filter', filter);
                this.setState({ filter: { ...filter, order: 2 } });
                this.props.GetCards({ ...filter, order: 2, dec: (filter.dec) ? 1 : -1 });
                break;
            default:
                alert("something wrong")
                break;
        }

    }
    paginationOnChange(page) {
        const { filter, itemsCount } = this.state;
        this.setState({ activePage: page, filter: { ...filter, offset: (page - 1) * itemsCount } });
        this.props.GetCards({ ...filter, offset: (page - 1) * itemsCount, dec: (filter.dec) ? 1 : -1 });
    }
    columeOnChange(orderBy) {
        const { filter } = this.state;
        if (orderBy !== filter.orderBy) {
            this.setState({ filter: { ...filter, orderBy } });
            this.props.GetCards({ ...filter, orderBy, dec: (filter.dec) ? 1 : -1 });
        } else {
            this.setState({ filter: { ...filter, dec: !filter.dec } });
            this.props.GetCards({ ...filter, dec: (!filter.dec) ? 1 : -1 });
        }

    }
    componentDidMount() {
        const { filter } = this.state;
        this.props.GetCards({ ...filter, dec: (!filter.dec) ? 1 : -1 });
        this.props.GetAgents();
    }
    getCards = (input, callback) => {
        input = input.toLowerCase();
        if (input.length > 3) {
            SearchCards(input).then((dataIn) => {
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
            value: value
        });
        if (value === null) {
            this.props.GetCards({ ...this.state.filter, dec: this.state.filter.dec ? 1 : -1 });
        } else {
            this.props.GetCardById(value._id);
        }
    }
    hendlerDoubleClick(id) {
        this.setState({ doubleClicked: id, cardAgent: '' });
    }
    handlerChangeAgent(e) {
        this.props.AssignAgent(this.state.doubleClicked, e.target.value);
        this.setState({ doubleClicked: null });

    }
    openAddCardPopup() {
        this.setState({
            popupContent: (
                <AddCardPopup
                    closePopup={this.closeCardPopup}
                    AddCard={this.props.AddCard}
                    AddCardMany={this.props.AddCardMany}
                    agents={this.props.agents}
                />
            )
        });
    }
    closeCardPopup() {
        this.setState({ popupContent: '' });
    }
    async deleteCard(cardId) {
        if (await window.modal.confirm('Are you sure?', 'Do you want to delete this card?')) {
            //this.props.DeleteCard(cardId);
            console.log(cardId);
        }
    }
    async unAssigned(id) {
        if (await window.modal.confirm('Are you sure?', 'Do you want to unassign this card?')) {
            this.props.UnAssigned(id);
        }
    }
    render() {
        const { filter, popupContent, doubleClicked } = this.state;
        const { cardsLoading, cards } = this.props;
        const ifPagination = this.props.cardsCount > this.state.itemsCount;
        return (
            <div className="cards">
                <div className="searchField">
                    <div className="selectSize">
                        <h3>Row Count</h3>
                        <select className="selectOption"
                            name="rowCount"
                            value={this.state.itemsCount}
                            onChange={this.onChange}
                        >
                            <option value='10' >10</option>
                            <option value='15' >15</option>
                            <option value='20' >20</option>
                            <option value='30' >30</option>
                            <option value='50' >50</option>
                        </select>
                    </div>
                    <div className="select">
                        <h3>Card Number</h3>
                        <Select.Async
                            className="selectAsync"
                            key={Math.random()}
                            multi={this.state.multi}
                            value={this.state.value}
                            onChange={this.onChangeCards}
                            valueKey="_id"
                            labelKey="number"
                            loadOptions={this.getCards}
                        />
                    </div>
                    <div className="assignedRadio">
                        <h3>Choose</h3>
                        <div className="radios">
                            <div className="chooseRadio">
                                <input type="radio" id="isAssignedChoice3" name="isAssigned" value="all" onChange={this.checkAssignType} checked={filter.order === 0 ? true : false} />
                                <label htmlFor="isAssignedChoice3">All</label>
                            </div>
                            <div className="chooseRadio">
                                <input type="radio" id="isAssignedChoice1" name="isAssigned" value="assigned" onChange={this.checkAssignType} checked={filter.order === 1 ? true : false} />
                                <label htmlFor="isAssignedChoice1">Assigned</label>
                            </div>
                            <div className="chooseRadio">
                                <input type="radio" id="isAssignedChoice2" name="isAssigned" value="unassigned" onChange={this.checkAssignType} checked={filter.order === 2 ? true : false} />
                                <label htmlFor="isAssignedChoice2">Unassigned</label>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    cardsLoading ?
                        (<div className="loading">
                            <img src="/public/images/loading.gif" />
                        </div>) :
                        (<table className="cardsTable">
                            <thead>
                                <tr>
                                    <th onClick={() => this.columeOnChange('number')} >
                                        Card Number
                    {filter.orderBy === 'number' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                                    </th>
                                    <th onClick={() => this.columeOnChange('user')} >
                                        User
                    {filter.orderBy === 'user' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                                    </th>
                                    <th onClick={() => this.columeOnChange('agent')} >
                                        Agent
                    {filter.orderBy === 'agent' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (<span>&#x2193;</span>) : ''}
                                    </th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (() => {
                                        const renderCards = [];
                                        for (let i = 0; i < Math.min(parseInt(filter.limit), cards.length); i++) {
                                            renderCards.push((
                                                <tr key={cards[i]._id}>
                                                    <td>{cards[i].number}</td>
                                                    <td>{cards[i].isAssign ? (
                                                        <span><Link to={`/user/${cards[i].user._id}`}>{cards[i].user.name + ' ' + cards[i].user.surname}</Link><img src="/public/images/unAssign.png" onClick={() => { this.unAssigned(cards[i]._id) }} /></span>
                                                    ) : (<span>--------</span>)}
                                                    </td>
                                                    <td onDoubleClick={() => this.hendlerDoubleClick(cards[i]._id)} className="showSelected">{
                                                        doubleClicked === cards[i]._id ? (
                                                            <select defaultValue='' onChange={this.handlerChangeAgent} >
                                                                <option value='' disabled >Select</option>
                                                                {this.props.agents.map((item) => {
                                                                    return (<option key={item._id} value={item._id}>{`${item.name} ${item.surname}`}</option>)
                                                                })}
                                                            </select>
                                                        ) : (<span>{cards[i].agent ? (cards[i].agent.name + ' ' + cards[i].agent.surname) : '-------'}</span>)
                                                    }
                                                    </td>
                                                    <td><img src="/public/images/delete.png" onClick={() => { this.deleteCard(cards[i]._id) }} /></td>
                                                </tr>
                                            ))
                                        }
                                        return renderCards;
                                    })()
                                }
                                <tr className="addCardShop">
                                    <td colSpan="4">
                                        <img src="/public/images/addRow.png" onClick={() => { this.openAddCardPopup() }} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        )}
                {
                    ifPagination && (
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCount}
                            totalItemsCount={this.props.cardsCount}
                            pageRangeDisplayed={5}
                            onChange={this.paginationOnChange}
                            prevPageText='<'
                            nextPageText='>'
                        />
                    )
                }
                {popupContent}
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        cardsLoading: store.cards.loading,
        cards: store.cards.data,
        cardsCount: store.cards.count,
        agents: store.cards.agents
    };
}
const mapDispatchToProps = dispatch => {
    return {
        GetCards: (filter) => dispatch(GetCards(filter)),
        GetCardById: (id) => dispatch(GetCardById(id)),
        AddCard: (number, agentId) => dispatch(AddCard(number, agentId)),
        AddCardMany: (range) => dispatch(AddCardMany(range)),
        DeleteCard: (cardId) => dispatch(DeleteCard(cardId)),
        UnAssigned: (id) => dispatch(UnAssigned(id)),
        GetAgents: () => dispatch(GetAgents()),
        AssignAgent: (cardId, agentId) => dispatch(AssignAgent(cardId, agentId)),
    };
};

Cards.propTypes = {
    GetCards: propTypes.func.isRequired,
    GetCardById: propTypes.func.isRequired,
    AddCard: propTypes.func.isRequired,
    AddCardMany: propTypes.func.isRequired,
    DeleteCard: propTypes.func.isRequired,
    UnAssigned: propTypes.func.isRequired,
    GetAgents: propTypes.func.isRequired,
    AssignAgent: propTypes.func.isRequired,
    cardsLoading: propTypes.bool.isRequired,
    cards: propTypes.arrayOf(propTypes.any).isRequired,
    cardsCount: propTypes.number.isRequired,
    agents: propTypes.arrayOf(propTypes.any).isRequired,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cards));