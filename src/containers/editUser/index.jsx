import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
    GetUser,
    SendNotificationToUser,
    UpdateUserField,
    GetUserTransactions,
    UseUserBonus,
    AddImageToUser,
    ProvideUser,
} from '../../action/users';
import { AssignCard } from '../../action/cards';
import EditUserOtherInfo from '../../components/editUserComponents/editUserOtherInfo';
import EditUserPersonalInfo from '../../components/editUserComponents/editUserPersonalInfo';
import EditUserImages from '../../components/editUserComponents/editUserImages';
import EditUserInfoTable from '../../components/editUserComponents/editUserInfoTable';
import SendNotificationPopup from '../../components/editUserComponents/sendNotificationPopup';
import UseBonusPopup from '../../components/editUserComponents/useBonusPopup';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupContent: '',
        };
        this.openSendNotificationPopup = this.openSendNotificationPopup.bind(this);
        this.openUseBonusPopup = this.openUseBonusPopup.bind(this);
        this.closeButtonPopup = this.closeButtonPopup.bind(this);
        this.provideUser = this.provideUser.bind(this);
    }
    componentDidMount() {
        this.props.GetUser(this.props.match.params.id);
        this.props.ProvideUser(this.props.match.params.id);
    }
    openSendNotificationPopup() {
        this.setState({
            popupContent: (
                <SendNotificationPopup
                    closePopup={this.closeButtonPopup}
                    SendNotificationToUser={(title, body) => { this.props.SendNotificationToUser(this.props.match.params.id, title, body) }}
                />
            )
        });
    }
    openUseBonusPopup() {
        this.setState({
            popupContent: (
                <UseBonusPopup
                    closePopup={this.closeButtonPopup}
                    balance={this.props.user.balance}
                    UseUserBonus={(balance, reason) => { this.props.UseUserBonus(this.props.user.username, balance, reason) }}
                />
            )
        });
    }
    closeButtonPopup() {
        this.setState({ popupContent: '' });
    }
    provideUser(){
        this.props.ProvideUser(this.props.match.params.id);
    }
    render() {
        const { userLoading, user } = this.props;
        const { popupContent } = this.state;
        const { passportImgUrl, idCardImageUrl, driverLicenseImgUrl } = this.props.user;
        if (userLoading) {
            return (
                <div className="loading">
                    <img src="/public/images/loading.gif" />
                </div>
            )
        }
        return (
            <div className="editUserMain">
                <div className="editUserData">
                    <div className="editUserInfo">
                        <EditUserPersonalInfo
                            data={user}
                            UpdateUserField={(name, value) => { this.props.UpdateUserField(this.props.match.params.id, name, value) }}
                        />
                        <EditUserOtherInfo
                            data={user}
                            AssignCard={(cardId) => {this.props.AssignCard(this.props.match.params.id, cardId )}}
                        />
                    </div>
                    <div className="buttonsAndImages">
                        <div className="editUserButtons">
                            <button onClick={() => { this.openSendNotificationPopup() }} >Send Notification</button>
                            <button disabled={!this.props.user.username} onClick={() => { this.openUseBonusPopup() }}>Use Bonus</button>
                            <button onClick={() => {this.provideUser() }}>Provide</button>
                        </div>
                        <EditUserImages
                            AddImageToUser={(formData) => { this.props.AddImageToUser(this.props.match.params.id, formData) }}
                            data={{ passportImgUrl, idCardImageUrl, driverLicenseImgUrl }}
                        />
                    </div>
                </div>
                <EditUserInfoTable
                    loading={this.props.transactionLoading}
                    data={this.props.transaction}
                    fullName={`${this.props.user.name} ${this.props.user.surname}`}
                    GetUserTransactions={(order) => this.props.GetUserTransactions(this.props.match.params.id, order)}
                />
                {popupContent}
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        userLoading: store.users.loading,
        transactionLoading: store.users.transactionLoading,
        user: store.users.user,
        transaction: store.users.transaction,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        SendNotificationToUser: (id, title, body) => dispatch(SendNotificationToUser(id, title, body)),
        GetUser: (id) => dispatch(GetUser(id)),
        ProvideUser: (userId) => dispatch(ProvideUser(userId)),
        AssignCard: (userId, cardId) => dispatch(AssignCard(userId, cardId)),
        UpdateUserField: (id, name, value) => dispatch(UpdateUserField(id, name, value)),
        GetUserTransactions: (id, order) => dispatch(GetUserTransactions(id, order)),
        UseUserBonus: (cardNumber, balance, reason) => dispatch(UseUserBonus(cardNumber, balance, reason)),
        AddImageToUser: (id, formData) => dispatch(AddImageToUser(id, formData)),

    };
};

EditUser.propTypes = {
    userLoading: propTypes.bool.isRequired,
    transactionLoading: propTypes.bool.isRequired,
    user: propTypes.objectOf(propTypes.any).isRequired,
    transaction: propTypes.arrayOf(propTypes.any).isRequired,
    GetUser: propTypes.func.isRequired,
    SendNotificationToUser: propTypes.func.isRequired,
    UpdateUserField: propTypes.func.isRequired,
    GetUserTransactions: propTypes.func.isRequired,
    UseUserBonus: propTypes.func.isRequired,
    AddImageToUser: propTypes.func.isRequired,
    AssignCard: propTypes.func.isRequired,
    ProvideUser: propTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUser));