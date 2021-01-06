import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import { Spinner } from '../../../components';

class PostList extends React.Component {

    componentDidMount() {
        if (!this.props.posts) {
            this.props.onInitUsers();
            this.props.onInitPosts();
        }
    }

    getUserName = (userId) => {
        const { users } = this.props;
        const userDetails = users.filter(user => user.id === userId);
        return userDetails && userDetails.length > 0 ? userDetails[0].username : '';
    }

    getPostDetail = (postData) => {
        this.props.history.push('/posts/post-detail/' + postData.id);
    }

    getUserDetail = (userId) => {
        this.props.history.push('/users/user-detail/' + userId);
    }

    moveToMainPage = () => {
        this.props.history.push('/');
    }

    render() {
        const { posts, users } = this.props;
        return (posts && users) ? (
            <div className="container">
                <div className="common-pages-wrap">
                    <div className="common-header">
                        <h3>Post List</h3>
                        <button onClick={this.moveToMainPage} type="button" className="btn btn-outline-primary">Back</button>
                    </div>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Post Title</th>
                            <th scope="col">User Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length > 0 ? (
                                posts.map((post, index) => (
                                    <tr key={post.id}>
                                        <td className="cursor-pointer" onClick={() => this.getPostDetail(post)}>{index + 1}</td>
                                        <td className="cursor-pointer" onClick={() => this.getPostDetail(post)}>{post.title}</td>
                                        <td className="cursor-pointer" onClick={() => this.getUserDetail(post.userId)}>{this.getUserName(post.userId)}</td>
                                    </tr>
                                ))
                            ) : (
                                <div>
                                    No Data Found
                                </div>
                            )}
                        </tbody>
                    </table>
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
        posts: state.post.posts,
        users: state.user.users
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPosts: () => dispatch(actions.fetchPosts()),
        onInitUsers: () => dispatch(actions.fetchUsers()),
    };
} 

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
