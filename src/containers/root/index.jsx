import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import Login from '../login';
import PrivateRoot from './privateRoot';
import PublicRoot from './publicRoot';
import { IsSignIn, Logout } from '../../action/auth';
import ShopList from '../../containers/shopList';
import EditShop from '../../containers/editShop';
import EditUser from '../../containers/editUser';
import Cards from '../../containers/cards';
import AddShop from '../../containers/addShop';
import AdministrativeUser from '../../containers/administrativeUser';
import Products from '../../containers/products';
import BonusIn from '../../containers/bonusIn';
import BonusOut from '../../containers/bonusOut';
import News from '../../containers/news';
import ShopsActivity from '../../containers/shopsActivity';
import Users from '../../containers/users';
import AddShopType from '../../containers/addShopType';
import Analitics from '../../containers/analitics';
import DemoRequest from '../../containers/demoRequest';
import Loading from '../../components/loading';

export const PERMISSIONS = {
    SHOP_OWNER: 'SHOP_OWNER',
    AGENT: 'AGENT',
    SHOP_MANAGER: 'SHOP_MANAGER',
    EDITOR: 'EDITOR',
    SUPER_ADMIN: 'SUPER_ADMIN',
    FRANCHISER: 'FRANCHISER',
    TECHNICIAN: 'TECHNICIAN',
}
class Root extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const token = window.localStorage.getItem('accessToken')
        if (token) {
            this.props.IsSignIn(token);
        }
    }
    render() {
        const { loading, isSignIn, type } = this.props;
        if (loading) {
            return (
                <div className="main">
                    <Loading />
                </div>
            )
        } else {
            return (
                <Switch>
                    <PublicRoot path='/' isSignIn={isSignIn} component={Login} exact />
                    <PrivateRoot
                        path='/addShopType'
                        isSignIn={isSignIn}
                        permission={type}
                        permissions={[PERMISSIONS.SUPER_ADMIN]}
                        LogOut = {this.props.LogOut}
                    >
                        <AddShopType />
                    </PrivateRoot>
                    <PrivateRoot
                        path='/addShop'
                        isSignIn={isSignIn}
                        permission={type}
                        permissions={[PERMISSIONS.SUPER_ADMIN]}
                        LogOut = {this.props.LogOut}
                    >
                        <AddShop />
                    </PrivateRoot>
                    <PrivateRoot
                        path='/shopsList'
                        isSignIn={isSignIn}
                        permission={type}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.FRANCHISER, PERMISSIONS.SHOP_OWNER, PERMISSIONS.SHOP_MANAGER]}
                        LogOut = {this.props.LogOut}
                    >
                        <ShopList />
                    </PrivateRoot>
                    <PrivateRoot
                        path='/shop/:id'
                        isSignIn={isSignIn}
                        permission={type}
                        permissions={[PERMISSIONS.SUPER_ADMIN]}
                        LogOut = {this.props.LogOut}
                    >
                        <EditShop />
                    </PrivateRoot>
                    <PrivateRoot
                        path='/administrativeUser/:page?'
                        isSignIn={isSignIn}
                        permission={type}
                        permissions={[PERMISSIONS.SUPER_ADMIN]}
                        LogOut = {this.props.LogOut}
                    >
                        <AdministrativeUser />
                    </PrivateRoot>
                    <PrivateRoot
                        path='/products/:page?'
                        isSignIn={isSignIn}
                        permission={type}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.EDITOR]}
                        LogOut = {this.props.LogOut}
                    >
                        <Products />
                    </PrivateRoot>
                    <PrivateRoot
                        path='/cards'
                        isSignIn={isSignIn}
                        permission={type}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.AGENT]}
                        LogOut = {this.props.LogOut}
                    >
                        <Cards />
                    </PrivateRoot>
                    <PrivateRoot
                        path='/user/:id'
                        isSignIn={isSignIn}
                        permission={type}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.EDITOR]}
                        LogOut = {this.props.LogOut}
                    >
                        <EditUser />
                    </PrivateRoot>
                    <PrivateRoot
                        path='/users'
                        isSignIn={isSignIn}
                        permission={type}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.EDITOR]}
                        LogOut = {this.props.LogOut}
                    >
                        <Users />
                    </PrivateRoot>
                    <PrivateRoot
                        path='/bonusIn'
                        isSignIn={isSignIn}
                        permission={type}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.SHOP_OWNER, PERMISSIONS.SHOP_MANAGER, PERMISSIONS.FRANCHISER]}
                        LogOut = {this.props.LogOut}
                    >
                        <BonusIn />
                    </PrivateRoot>
                    <PrivateRoot
                        path='/bonusOut'
                        isSignIn={isSignIn}
                        permission={type}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.SHOP_OWNER, PERMISSIONS.SHOP_MANAGER, PERMISSIONS.FRANCHISER]}
                        LogOut = {this.props.LogOut}
                    >
                        <BonusOut />
                    </PrivateRoot>
                    <PrivateRoot
                        path='/news/:id?'
                        isSignIn={isSignIn}
                        permission={type}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.EDITOR]}
                        LogOut = {this.props.LogOut}
                    >
                        <News />
                    </PrivateRoot>
                    <PrivateRoot
                        path='/shopsActivity/:page?'
                        isSignIn={isSignIn}
                        permission={type}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.TECHNICIAN]}
                        LogOut = {this.props.LogOut}
                    >
                        <ShopsActivity />
                    </PrivateRoot>
                    <PrivateRoot
                        path='/analitics'
                        isSignIn={isSignIn}
                        permission={type}
                        permissions={[PERMISSIONS.SUPER_ADMIN]}
                        LogOut = {this.props.LogOut}
                    >
                        <Analitics />
                    </PrivateRoot>
                    <PrivateRoot
                        path='/demoRequest'
                        isSignIn={isSignIn}
                        permission={type}
                        permissions={[PERMISSIONS.SUPER_ADMIN]}
                        LogOut = {this.props.LogOut}
                    >
                        <DemoRequest />
                    </PrivateRoot>
                    <PublicRoot path='/signin' isSignIn={isSignIn} permission={type} component={Login} />
                </Switch>
            )
        }
    }
}

const mapStateToProps = store => {
    return {
        loading: store.user.loading,
        isSignIn: store.user.isSignIn,
        type: store.user.data.type,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        IsSignIn: (token) => dispatch(IsSignIn(token)),
        LogOut: (history) => dispatch(Logout(history)),
    };
};

Root.propTypes = {
    loading: propTypes.bool.isRequired,
    isSignIn: propTypes.bool.isRequired,
    IsSignIn: propTypes.func.isRequired,
    type: propTypes.string.isRequired,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
