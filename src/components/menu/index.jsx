import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import MenuItem from './item';
import { PERMISSIONS } from '../../containers/root';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            active: props.location.pathname,
        };
        this.handlerToggled = this.handlerToggled.bind(this);
        this.handlerChangeActive = this.handlerChangeActive.bind(this);
    }
    handlerToggled() {
        this.setState({ toggle: !this.state.toggle });
    }
    handlerChangeActive(index) {
        this.setState({ active: index });
    }
    render() {
        const { toggle, active } = this.state;
        return (
            <div className={`menu ${toggle ? "" : "closed"}`}>
                <ul>
                    <li className='toggle' onClick={this.handlerToggled}><h2>NEST</h2><span /></li>
                    <MenuItem
                        permission={this.props.permission}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.EDITOR]}
                    >
                        <Link className={`${active === "/users" ? 'active' : ''}`} onClick={() => this.handlerChangeActive("/users")} to="/users" >
                            <img src="/public/images/user.png" />
                            <span className="name"> ՕԳՏԱՏԵՐԵՐ</span>
                        </Link>
                    </MenuItem>
                    <MenuItem
                        permission={this.props.permission}
                        permissions={[PERMISSIONS.SUPER_ADMIN]}
                    >
                        <Link className={`${active === "/analitics"? 'active' : ''}`} onClick={() => this.handlerChangeActive("/analitics")}  to="/analitics" >
                            <img src="/public/images/analitics.png" />
                            <span className="name"> ՎԵՐԼՈՒԾՈՒԹՅՈՒՆ</span>
                        </Link>
                    </MenuItem>
                    <MenuItem
                        permission={this.props.permission}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.TECHNICIAN]}
                    >
                        <Link className={`${active === "/shopsActivity"? 'active' : ''}`} onClick={() => this.handlerChangeActive("/shopsActivity")}  to="/shopsActivity" >
                            <img src="/public/images/shopsActivity.png" />
                            <span className="name"> ԽԱՆՈՒԹԻ ԱԿՏԻՎՈՒԹՅՈՒՆ</span>
                        </Link>
                    </MenuItem>
                    <MenuItem
                        permission={this.props.permission}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.EDITOR]}
                    >
                        <Link className={`${active === "/news"? 'active' : ''}`} onClick={() => this.handlerChangeActive("/news")}  to="/news" >
                            <img src="/public/images/news.png" />
                            <span className="name"> ՆՈՐՈՒԹՅՈՒՆՆԵՐ</span>

                        </Link>
                    </MenuItem>
                    <MenuItem
                        permission={this.props.permission}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.SHOP_OWNER, PERMISSIONS.SHOP_MANAGER, PERMISSIONS.FRANCHISER]}
                    >
                        <Link className={`${active === "/bonusIn"? 'active' : ''}`} onClick={() => this.handlerChangeActive("/bonusIn")}  to="/bonusIn" >
                            <img src="/public/images/bonusIn.png" />
                            <span className="name"> ԲՈՆՈՒՍՆԵՐԻ ԿՈՒՏԱԿՈՒՄ</span>
                        </Link>
                    </MenuItem>
                    <MenuItem
                        permission={this.props.permission}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.SHOP_OWNER, PERMISSIONS.SHOP_MANAGER, PERMISSIONS.FRANCHISER]}
                    >
                        <Link className={`${active === "/bonusOut"? 'active' : ''}`} onClick={() => this.handlerChangeActive("/bonusOut")}  to="/bonusOut" >
                            <img src="/public/images/bonusOut.png" />
                            <span className="name"> ԲՈՆՈՒՍՆԵՐԻ ՕԳՏԱԳՈՐԾՈՒՄ</span>
                        </Link>
                    </MenuItem>
                    <MenuItem
                        permission={this.props.permission}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.FRANCHISER, PERMISSIONS.SHOP_OWNER, PERMISSIONS.SHOP_MANAGER]}
                    >
                        <Link className={`${active === "/shopsList"? 'active' : ''}`} onClick={() => this.handlerChangeActive("/shopsList")}  to="/shopsList" >
                            <img src="/public/images/shop.png" />
                            <span className="name"> ԽԱՆՈՒԹՆԵՐ</span>
                        </Link>
                    </MenuItem>
                    <MenuItem
                        permission={this.props.permission}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.AGENT]}
                    >
                        <Link className={`${active === "/cards"? 'active' : ''}`} onClick={() => this.handlerChangeActive("/cards")}  to="/cards" >
                            <img src="/public/images/card.png" />
                            <span className="name"> ՔԱՐՏԵՐ</span>
                        </Link>
                    </MenuItem>
                    <MenuItem
                        permission={this.props.permission}
                        permissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.EDITOR]}
                    >
                        <Link className={`${active === "/products"? 'active' : ''}`} onClick={() => this.handlerChangeActive("/products")}  to="/products" >
                            <img src="/public/images/products.png" />
                            <span className="name"> ԱՊՐԱՆՔՆԵՐ</span>
                        </Link>
                    </MenuItem>
                    <MenuItem
                        permission={this.props.permission}
                        permissions={[PERMISSIONS.SUPER_ADMIN]}
                    >
                        <Link className={`${active === "/administrativeUser"? 'active' : ''}`} onClick={() => this.handlerChangeActive("/administrativeUser")}  to="/administrativeUser" >
                            <img src="/public/images/adUser.png" />
                            <span className="name"> Ա. ՕԳՏԱՏԵՐ</span>
                        </Link>
                    </MenuItem>
                    <MenuItem
                        permission={this.props.permission}
                        permissions={[PERMISSIONS.SUPER_ADMIN]}
                    >
                        <Link className={`${active === "/addShop"? 'active' : ''}`} onClick={() => this.handlerChangeActive("/addShop")}  to="/addShop" >
                            <img src="/public/images/addShop.png" />
                            <span className="name"> ԱՎԵԼԱՑՆԵԼ ԽԱՆՈՒԹ</span>
                        </Link>
                    </MenuItem>
                    <MenuItem
                        permission={this.props.permission}
                        permissions={[PERMISSIONS.SUPER_ADMIN]}
                    >
                        <Link className={`${active === "/addShopType"? 'active' : ''}`} onClick={() => this.handlerChangeActive("/addShopType")}  to="/addShopType" >
                            <img src="/public/images/addShop.png" />
                            <span className="name"> ԱՎԵԼԱՑՆԵԼ ԽԱՆՈՒԹԻ ՏԵՍԱԿ</span>
                        </Link>
                    </MenuItem>
                    <MenuItem
                        permission={this.props.permission}
                        permissions={[PERMISSIONS.SUPER_ADMIN]}
                    >
                        <Link className={`${active === "/demoRequest"? 'active' : ''}`} onClick={() => this.handlerChangeActive("/demoRequest")}  to="/demoRequest" >
                            <img src="/public/images/request.png" />
                            <span className="name"> ԽԱՆՈՒԹԻ ՀԱՅՏԵՐ</span>
                        </Link>
                    </MenuItem>
                </ul>
            </div>
        );
    }
}

Menu.propTypes = {
    permission: propTypes.string.isRequired,
}
export default withRouter(Menu);