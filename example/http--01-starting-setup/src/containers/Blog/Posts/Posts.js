import React, { Component }from 'react';
import './Posts.css';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import { Link, Route } from 'react-router-dom'
import FullPost from '../FullPost/FullPost'
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
    this.props.history.push('/posts/' + id);
  }

  render() {
    // console.log(this.props)
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
      <div>
        <section className='Posts'>
          {posts}
        </section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />

      </div>
    )
  }
}
export default Posts;