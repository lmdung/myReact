import React, { Component }from 'react';
import './Posts.css';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import { Link } from 'react-router-dom'
class Posts extends Component {
  state = {
    posts: [],
    error: false,
    selectPostId: null,
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
    // this.props.history.push({pathname: '/' + id});
    this.props.history.push('/' + id);
  }

  render() {
    let posts = <p>Something went wrong !</p>
    if (!this.state.error) {
        posts = this.state.posts.map(post => {
            return (
            // <Link to={"/" + post.id} key={post.id}>
              <Post 
                  key={post.id}
                  title={post.title} 
                  author={post.author}
                  clicked={() => this.postSelectedHandler(post.id)}/>
            // </Link>
            )
        })
    } 
    return (
      <section className='Posts'>
        {posts}
      </section>
    )
  }
}
export default Posts;