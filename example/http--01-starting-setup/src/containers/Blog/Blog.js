import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectPostId: null,
        error: false
    }
    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                // console.log(response)
                const posts = response.data.slice(0, 4);
                const updatePosts = posts.map(post => {
                    return post = {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({ posts: updatePosts})
            })
            .catch(err => {
                this.setState({ error: true})
            })
    }

    postSelectedHandler = (id) => {
        this.setState({selectPostId: id})
    }
    render () {
        let posts = <p>Something went wrong !</p>
        // if (!this.state.error) {
        //     posts = this.state.posts.map(post => {
        //         return <Post 
        //             key={post.id} 
        //             title={post.title} 
        //             author={post.author}
        //             clicked={() => this.postSelectedHandler(post.id)}/>
        //     })
        // } 
        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {posts}
                </section>
            </div>
        );
    }
}

export default Blog;