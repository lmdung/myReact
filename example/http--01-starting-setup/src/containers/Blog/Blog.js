import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
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
    }
    render () {
        const ports = this.state.posts.map(port => {
            return <Post key={port.id} title={port.title} author={port.author}/>
        })
        return (
            <div>
                <section className="Posts">
                    {ports}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;