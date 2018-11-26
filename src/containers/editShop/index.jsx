import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import EditFranchiser from '../../components/editShopComponents/franchiser';
import EditShopDetails from '../../components/editShopComponents/shopDetails';
import EditShopDetailsType from '../../components/editShopComponents/shopDetailsType';
import EditShopOwner from '../../components/editShopComponents/shopOwner';
import EditShopManager from '../../components/editShopComponents/shopManager';
import EditShopUser from '../../components/editShopComponents/shopUser';
import { GetShop, GetFranchiser, GetTypes, GetOwner, GetManager } from '../../action/shop';
import {
    AssignFranchiserToShop,
    RemoveFranchiserFromShop,
    ChangeOwner,
    AddManager,
    AddTypeToShop,
    RemoveTypeFromShop,
    UpdateShopDetails,
    AddUserToShop,
    DeleteUserFromShop,
    AddShopUserPermission,
    DelShopUserPermission,
    UpdateTypeBonusAndComission,
    DeleteShop,
} from '../../action/editShop';

class EditShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shopDetalsTypes: [],
        };
        this.deleteShop = this.deleteShop.bind(this);
    }
    componentWillMount() {
        this.props.GetFranchiser();
        this.props.GetOwner();
        if (this.props.types.length === 0) {
            this.props.GetTypes();
        }
        this.props.GetManager();
        this.props.GetShop(this.props.match.params.id);
    }
    async deleteShop (){
        if(await window.modal.confirm('Are you sure?', 'Do you want to delete this shop?')){
            // this.props.DeleteShop(this.props.match.params.id, this.props.history);
            this.props.history.push('/shopsList');
        }
    }
    render() {
        const { shop, shopLoading } = this.props;
        if (shopLoading) {
            return (
                <div className="loading">
                    <img src="/public/images/loading.gif" />
                </div>
            )
        }
        return (
            <div className="editShop">
                <h2>Shop Details</h2>
                <div className="editDetails">
                    <EditShopDetails
                        value={shop}
                        UpdateShopDetails={(updateData, file) => { this.props.UpdateShopDetails(this.props.match.params.id, updateData, file) }}
                        updateShopLoading={this.props.updateShopLoading}
                    />
                    <div className="threeInColomn">
                        <EditFranchiser
                            franchisers={this.props.franchisers}
                            shopId={this.props.match.params.id}
                            value={shop.franchiser}
                            AssignFranchiserToShop={this.props.AssignFranchiserToShop}
                            RemoveFranchiserFromShop={this.props.RemoveFranchiserFromShop}
                        />
                        <EditShopOwner
                            owners={this.props.owners}
                            value={shop.owner}
                            shopId={this.props.match.params.id}
                            ChangeOwner={this.props.ChangeOwner}
                        />
                        <EditShopDetailsType
                            types={this.props.types}
                            shopId={this.props.match.params.id}
                            AddTypeToShop={this.props.AddTypeToShop}
                            RemoveTypeFromShop={this.props.RemoveTypeFromShop}
                            UpdateTypeBonusAndComission={(shopTypeId, obj)=> {this.props.UpdateTypeBonusAndComission(this.props.match.params.id,shopTypeId, obj)}}
                            value={shop.type}
                        />
                        <EditShopManager
                            managers={this.props.managers}
                            AddManager={(managerId) => { this.props.AddManager(this.props.match.params.id, managerId) }}
                            value={shop.shopManager}
                        />
                    </div>
                </div>
                <EditShopUser
                    types={shop.type}
                    AddUserToShop={(shopUserData) => { this.props.AddUserToShop(this.props.match.params.id, shopUserData) }}
                    DeleteUserFromShop={this.props.DeleteUserFromShop}
                    AddShopUserPermission={this.props.AddShopUserPermission}
                    DelShopUserPermission={this.props.DelShopUserPermission}
                    value={shop.shopUser}
                />
                <button className="deleteShop" onClick={this.deleteShop}>Delete Shop</button>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        shop: store.shop.shop,
        shopLoading: store.shop.shopLoading,
        updateShopLoading: store.shop.updateShopLoading,
        franchisers: store.shop.franchisers,
        owners: store.shop.owners,
        types: store.shop.types,
        managers: store.shop.managers,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        GetOwner: () => dispatch(GetOwner()),
        GetFranchiser: () => dispatch(GetFranchiser()),
        GetManager: () => dispatch(GetManager()),
        GetTypes: () => dispatch(GetTypes()),
        GetShop: (id) => dispatch(GetShop(id)),
        AssignFranchiserToShop: (shopId, franchisorId) => dispatch(AssignFranchiserToShop(shopId, franchisorId)),
        RemoveFranchiserFromShop: (shopId, franchisorId) => dispatch(RemoveFranchiserFromShop(shopId, franchisorId)),
        AddTypeToShop: (shopId, typeId) => dispatch(AddTypeToShop(shopId, typeId)),
        RemoveTypeFromShop: (shopId, typeId) => dispatch(RemoveTypeFromShop(shopId, typeId)),
        UpdateShopDetails: (shopId, updateData, file) => dispatch(UpdateShopDetails(shopId, updateData, file)),
        ChangeOwner: (shopId, ownerId) => dispatch(ChangeOwner(shopId, ownerId)),
        AddManager: (shopId, managerId) => dispatch(AddManager(shopId, managerId)),
        AddUserToShop: (shopId, shopUserData) => dispatch(AddUserToShop(shopId, shopUserData)),
        DeleteUserFromShop: (shopUserId) => dispatch(DeleteUserFromShop(shopUserId)),
        AddShopUserPermission: (shopUserId, permissionId) => dispatch(AddShopUserPermission(shopUserId, permissionId)),
        DelShopUserPermission: (shopUserId, permissionId) => dispatch(DelShopUserPermission(shopUserId, permissionId)),
        UpdateTypeBonusAndComission: (shopId, shopTypeId, changes) => dispatch(UpdateTypeBonusAndComission(shopId, shopTypeId, changes)),
        DeleteShop: (shopId, history) => dispatch(DeleteShop(shopId, history)),
    };
};

EditShop.propTypes = {
    GetOwner: propTypes.func.isRequired,
    GetFranchiser: propTypes.func.isRequired,
    GetTypes: propTypes.func.isRequired,
    GetShop: propTypes.func.isRequired,
    GetManager: propTypes.func.isRequired,
    AssignFranchiserToShop: propTypes.func.isRequired,
    RemoveFranchiserFromShop: propTypes.func.isRequired,
    AddTypeToShop: propTypes.func.isRequired,
    RemoveTypeFromShop: propTypes.func.isRequired,
    ChangeOwner: propTypes.func.isRequired,
    AddManager: propTypes.func.isRequired,
    UpdateShopDetails: propTypes.func.isRequired,
    AddUserToShop: propTypes.func.isRequired,
    DelShopUserPermission: propTypes.func.isRequired,
    AddShopUserPermission: propTypes.func.isRequired,
    UpdateTypeBonusAndComission: propTypes.func.isRequired,
    DeleteUserFromShop: propTypes.func.isRequired,
    DeleteShop: propTypes.func.isRequired,
    shop: propTypes.objectOf(propTypes.any).isRequired,
    shopLoading: propTypes.bool.isRequired,
    types: propTypes.arrayOf(propTypes.any).isRequired,
    managers: propTypes.arrayOf(propTypes.any).isRequired,
    franchisers: propTypes.arrayOf(propTypes.any).isRequired,
    owners: propTypes.arrayOf(propTypes.any).isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditShop));