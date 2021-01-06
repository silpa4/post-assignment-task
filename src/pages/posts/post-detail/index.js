import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import { Spinner } from '../../../components';

class PostDetail extends React.Component {

    componentDidMount() {
        if (!this.props.posts) {
            this.props.onInitUsers();
            this.props.onInitPosts();
        }
        const postId = this.props.match.params.postId;
        this.props.fetchPostData(postId);
    }

    moveToPosts = () => {
        this.props.history.push('/posts');
    }

    getPostTitle = (type) => {
        const { posts, match, users } = this.props;
        const postId = Number(match.params.postId);
        const postDetails = posts.filter(post => post.id === postId);
        if (type === 'post') {
            return postDetails && postDetails.length > 0 ? postDetails[0].title : '';
        } else {
            const userId = postDetails && postDetails.length > 0 ? postDetails[0].userId : '';
            const userDetails = users.filter(user => user.id === userId);
            return userDetails && userDetails.length > 0 ? userDetails[0].username : '';
        }
    }

    render() {
        const { postDetail, users, posts } = this.props;
        return (postDetail && users && posts) ? (
            <div className="container">
                <div className="common-pages-wrap">
                    <div className="common-header">
                        <h3>Post View</h3>
                        <button onClick={this.moveToPosts} type="button" className="btn btn-outline-primary">Back</button>
                    </div>
                    <div className="post-wrap">
                        <div>
                            <span className="post-title">Post Title:</span> <span className="post-detail">{this.getPostTitle('post')}</span>
                        </div>
                        <div>
                            <span className="post-title">User Name:</span> <span className="post-detail">{this.getPostTitle('user')}</span>
                        </div>
                    </div>
                    <div>
                        <h4>Comments</h4>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                <th scope="col">Comment Subject</th>
                                <th scope="col">Comment Body</th>
                                <th scope="col">Email Of Commenter</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postDetail.length > 0 ? (
                                    postDetail.map((comment) => (
                                        <tr key={comment.id}>
                                            <td>{comment.name}</td>
                                            <td>{comment.body}</td>
                                            <td>{comment.email}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <div>
                                        No Comments Found
                                    </div>
                                )}
                            </tbody>
                        </table>
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
        postDetail: state.post.postDetail,
        posts: state.post.posts,
        users: state.user.users
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPosts: () => dispatch(actions.fetchPosts()),
        onInitUsers: () => dispatch(actions.fetchUsers()),
        fetchPostData: (postId) => dispatch(actions.fetchPostsDetail(postId))
    };
} 

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
