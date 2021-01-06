import * as React from 'react';
import { connect } from 'react-redux';

import { fetchUserDetail } from '../../../store/actions';
import { Spinner } from '../../../components';

class UserDetail extends React.Component {

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.props.getUserDetail(userId);
    }

    moveToPosts = () => {
        this.props.history.push('/posts');
    }

    render() {
        const { userDetail } = this.props;
        return userDetail ? (
            <div className="container">
                <div className="common-pages-wrap">
                    <div className="common-header">
                        <h3>User View</h3>
                        <button onClick={this.moveToPosts} type="button" className="btn btn-outline-primary">Back</button>
                    </div>
                    <div className="user-view-wrap">
                        <div className="d-flex">
                            <div className="user-title">User Name:</div> <div className="user-detail">{userDetail.username}</div>
                        </div>
                        <div className="d-flex">
                            <div className="user-title">Full Name:</div> <div className="user-detail">{userDetail.name}</div>
                        </div>
                        <div className="d-flex">
                            <div className="user-title">Email:</div> <div className="user-detail">{userDetail.email}</div>
                        </div>
                        <div className="d-flex">
                            <div className="user-title">Web Site:</div> <div className="user-detail">{userDetail.website}</div>
                        </div>
                        <div className="d-flex">
                            <div className="user-title">Company:</div> 
                            <div className="user-detail">
                                {userDetail.company.name}
                                <div className="company-pharse">
                                    {userDetail.company.catchPhrase}
                                </div>
                            </div>
                        </div>
                    </div>
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
        userDetail: state.user.userDetail,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getUserDetail: (userId) => dispatch(fetchUserDetail(userId)),
    };
} 

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
