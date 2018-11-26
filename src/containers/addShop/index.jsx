import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Franchiser from '../../components/addShopComponents/franchiser';
import ShopDetails from '../../components/addShopComponents/shopDetails';
import ShopManager from '../../components/addShopComponents/shopManager';
import ShopOwner from '../../components/addShopComponents/shopOwner';
import ShopUser from '../../components/addShopComponents/shopUser';
import { GetOwner, GetFranchiser, GetTypes, CreateShop } from '../../action/shop';

class AddShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shopDetalsTypes: [],
        }
        this.franchisers = null;
        this.owners = null;
        this.managers = null;
        this.details = null;
        this.users = null;
        this.request = {};
        this.createShop = this.createShop.bind(this);
    }
    componentDidMount() {
        if (this.props.franchisers.length === 0) {
            this.props.GetFranchiser();
        }
        if (this.props.owners.length === 0) {
            this.props.GetOwner();
        }
        if (this.props.types.length === 0) {
            this.props.GetTypes();
        }
    }
    createShop() {
        const franchisers = this.franchisers.isValidComponent();
        const owners = this.owners.isValidComponent();
        const managers = this.managers.isValidComponent();
        const details = this.details.isValidComponent();
        const users = this.users.isValidComponent();
        if (franchisers && owners && managers && details && users) {
            const temp = {
                shop: this.getState.call(this.details),
                franchisor: this.getState.call(this.franchisers),
                shopOwner: this.getState.call(this.owners),
                users: this.getState.call(this.users),
                shopManager: this.getState.call(this.managers),
            }
            let emails = temp.users.data.map(item => item.email);
            temp.franchisor.email && emails.push(temp.franchisor.email);
            temp.shopOwner.email && emails.push(temp.shopOwner.email);
            emails.push(temp.shopManager.email);
            if (!(emails.length === (new Set(emails)).size)) {
                alert("email must be unique");
            } else {
                let phones = temp.users.data.map(item => item.phone);
                temp.franchisor.phone && phones.push(temp.franchisor.phone);
                temp.shopOwner.phone && phones.push(temp.shopOwner.phone);
                phones.push(temp.shopManager.phone);
                if (!(phones.length === (new Set(phones)).size)) {
                    alert("phone must be unique");
                } else {
                    const request = {
                        franchisor: temp.franchisor.toggle ? {
                            new: true,
                            name: temp.franchisor.name,
                            surname: temp.franchisor.surname,
                            email: temp.franchisor.email,
                            password: temp.franchisor.password,
                            phone: temp.franchisor.phone,
                        } : { list: temp.franchisor.value.map(item => item._id) },
                        shopOwner: temp.shopOwner.toggle ? {
                            new: true,
                            name: temp.shopOwner.name,
                            surname: temp.shopOwner.surname,
                            email: temp.shopOwner.email,
                            password: temp.shopOwner.password,
                            phone: temp.shopOwner.phone,
                        } : { id: temp.shopOwner.owner },
                        shopManager: {
                            name: temp.shopManager.name,
                            surname: temp.shopManager.surname,
                            email: temp.shopManager.email,
                            password: temp.shopManager.password,
                            phone: temp.shopManager.phone,
                        },
                        shop: {
                            name: temp.shop.name,
                            description: temp.shop.description,
                            address: temp.shop.address,
                            location: temp.shop.location,
                            type: temp.shop.value.map(item => ({type_id: item._id, bonus: item.bonus, comission: item.comission, price: item.price} )),
                            cumulative: temp.shop.cumulative,
                            spendable: temp.shop.spendable,
                        },
                        users: temp.users.data.map(item => ({ ...item, shopTypePermission: item.value.map(indx => indx._id) })),
                    };
                    this.props.CreateShop(request, temp.shop.file);
                }
            }
        } else {
            if (!franchisers) {
                alert("Incorrect field in Franchisers")
            } else if (!managers) {
                alert("Incorrect field in Managers")

            } else if (!owners) {
                alert("Incorrect field in Owners")

            } else if (!details) {
                alert("Incorrect field in Details")

            } else if (!users) {
                alert("Incorrect field in Users")
            }
        }
    }
    getState() {
        return this.state;
    }
    render() {
        return (
            <div className="addShop">
                <div className="threeInRow">
                    <Franchiser
                        franchisers={this.props.franchisers}
                        ref={(franchisers) => { this.franchisers = franchisers }}
                    />
                    <ShopOwner
                        owners={this.props.owners}
                        ref={(owners) => { this.owners = owners }}
                    />
                    <ShopManager
                        ref={(managers) => { this.managers = managers }}
                    />
                </div>
                <ShopDetails
                    types={this.props.types}
                    changeParentState={value => this.setState({ shopDetalsTypes: value })}
                    ref={(details) => { this.details = details }}
                />
                <ShopUser
                    shopDetalsTypes={this.state.shopDetalsTypes}
                    ref={(users) => { this.users = users }}
                />
                <button onClick={this.createShop} disabled={this.props.createShopLoading} >Create</button>
            </div>

        );
    }
}
const mapStateToProps = store => {
    return {
        franchisers: store.shop.franchisers,
        owners: store.shop.owners,
        types: store.shop.types,
        createShopLoading: store.shop.createShopLoading,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        GetOwner: () => dispatch(GetOwner()),
        GetFranchiser: () => dispatch(GetFranchiser()),
        GetTypes: () => dispatch(GetTypes()),
        CreateShop: (body, file) => dispatch(CreateShop(body, file)) //If it required to check email and password, add checkList as argument
    };
};

AddShop.propTypes = {
    GetOwner: propTypes.func.isRequired,
    GetFranchiser: propTypes.func.isRequired,
    GetTypes: propTypes.func.isRequired,
    CreateShop: propTypes.func.isRequired,
    types: propTypes.arrayOf(propTypes.any).isRequired,
    franchisers: propTypes.arrayOf(propTypes.any).isRequired,
    owners: propTypes.arrayOf(propTypes.any).isRequired,
    createShopLoading: propTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddShop);