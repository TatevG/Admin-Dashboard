import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';


class EditUserInfoTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
        }
    }
    componentDidMount(){
            this.props.GetUserTransactions(0);
    }
    render() {
        const { active } = this.state;
        const { loading, data } = this.props;
        if(loading){
            return(
                <div  className="loading">
                    <img src ="/public/images/loading.gif"/>
                </div>
            )
        }
        return (
            <div className="infoTable">
                <ul className="tableLinks">
                    <li className={active===0? 'active' : ''} onClick={()=>{this.props.GetUserTransactions(0); this.setState({active: 0})}}>Bonus All</li>
                    <li className={active===1? 'active' : ''} onClick={()=>{this.props.GetUserTransactions(1); this.setState({active: 1})}}>Bonus In</li>
                    <li className={active===2? 'active' : ''} onClick={()=>{this.props.GetUserTransactions(2); this.setState({active: 2})}}>Bonus Out</li>
                </ul>
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Bonus</th>
                            <th>Card Number</th>
                            <th>Shop</th>
                            {active === 0?<th>Type</th>: null}
                            <th>Create At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(item =>(
                                <tr key={item._id}>
                                    <td>{this.props.fullName}</td>
                                    <td>{item.bonuse}</td>
                                    <td>{item.cardNumber}</td>
                                    {item.shop ? (<td><Link to={`/shop/${item.shop._id}`}>{item.shop.name}</Link></td>) : (<td>NEST</td>)}
                                    {active === 0? <td>{ item.type}</td>: null}
                                    <td>{new Date(item.createAt).toLocaleString()}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
EditUserInfoTable.propTypes = {
    loading: propTypes.bool.isRequired,
    data: propTypes.arrayOf(propTypes.any).isRequired,
    fullName: propTypes.string.isRequired,
    GetUserTransactions: propTypes.func.isRequired,
}

export default EditUserInfoTable;
