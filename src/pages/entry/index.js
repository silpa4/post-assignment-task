/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

class Entry extends React.Component {

    componentDidMount() {
        this.props.onInitUsers();
        this.props.onInitPosts();
    }

    navigateToPage = (type) => {
        if (type === 'posts') {
            this.props.history.push('/posts');
        } else {
            this.props.history.push('/users');
        }
    }
    
    render() {
        return (
            <div className="container">
                <div className="common-pages-wrap">
                    <div className="common-header common-center">
                        <h2>Assignment Task</h2>
                    </div>
                    <ul className="nav flex-row common-center w100">
                        <li className="nav-item" onClick={() => this.navigateToPage('posts')}>
                            <button type="button" className="btn btn-link">POSTS</button>
                        </li>
                        <li className="nav-item" onClick={() => this.navigateToPage('users')}>
                            <button type="button" className="btn btn-link">USERS</button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPosts: () => dispatch(actions.fetchPosts()),
        onInitUsers: () => dispatch(actions.fetchUsers()),
    };
} 

export default connect(null, mapDispatchToProps)(Entry);
