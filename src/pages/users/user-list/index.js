import * as React from 'react';
import { connect } from 'react-redux';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

import { fetchUsers } from '../../../store/actions';
import { Spinner } from '../../../components';
class UserList extends React.Component {

    state = {
        selectedUser: null,
        searchNotFound: false
    }

    componentDidMount() {
        this.props.onInitUsers();
    }

    moveToMainPage = () => {
        this.props.history.push('/');
    }

    handleOnSearch = (string, cached) => {
        const { users } = this.props;
        if (!string) {
            this.setState({selectedUser: null, searchNotFound: false});
        } else {
            const data = string.toLowerCase();
            const userData = users.some(user => user.name.toLowerCase().includes(data));
            if (userData === false) {
                this.setState({searchNotFound: true});
            } else {
                this.setState({searchNotFound: false});
            }
        }
    }
    
    handleOnSelect = (item) => {
        this.setState({selectedUser: item.id, searchNotFound: false});
    }


    render() {
        const { users } = this.props;
        const { selectedUser, searchNotFound } = this.state;
        const userList = selectedUser ? users.filter(user => user.id === selectedUser): users;
        return userList ? (
            <div className="container">
                <div className="common-pages-wrap">
                    <div className="common-header">
                        <h3>User List</h3>
                        <button onClick={this.moveToMainPage} type="button" className="btn btn-outline-primary">Back</button>
                    </div>
                    <div className="w100 search-user">
                        <ReactSearchAutocomplete
                            placeholder="Search users.."
                            items={searchNotFound ? [] : users}
                            onSearch={this.handleOnSearch}
                            onSelect={this.handleOnSelect}
                            autoFocus
                        />
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Web Site</th>
                            </tr>
                        </thead>
                        {(userList.length > 0 && !searchNotFound) && (
                            <tbody>
                                {userList.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.website}</td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                    {searchNotFound && (
                        <div className="no-data">
                            No Data Found
                        </div>
                    )}
                </div>
            </div>
        ) : (
            <div>
                <Spinner/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.users,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitUsers: () => dispatch(fetchUsers()),
    };
} 

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
