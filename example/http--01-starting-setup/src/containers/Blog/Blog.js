import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'
// import axios from 'axios';
// import axios from '../../axios';
import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
// import FullPost from './FullPost/FullPost';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent (() => {
    return import('./NewPost/NewPost')
})
class Blog extends Component {
    state = {
        auth: true,
    }
    render () {
        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/posts"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/new-post",
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" render={() => <h3>Home</h3>}/>
                <Route path="/" exact render={() => <h3>Home 2</h3>}/> */}

                {/* nếu truyền vào exact (default: true) thì phải truy cập đúng đường đẫn mới hiển thị
                    Không thì vẫn hiển thị ở đường dẫn khác khi dùng render
                */}
                
                <Route path="/" exact component={Posts} />
                
                {/* chỉ load 1 route */}
                <Switch>
                    {/* <Route path="/:id" component={FullPost} /> */}
                    {/* Không đặt id trước new-post vì nó sẽ cho rằng new-post là id và get data sẽ fail */}
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    {/* <Route path="/:id" component={FullPost} /> */}
                    {/* <Redirect from="/" to="/posts" /> */}
                    <Route render = {() => <h1>NOT FOUND</h1>} />
                    {/* route không đường dẫn là cách bắt lỗi 404-k tìm thấy đường dẫn */}
                </Switch>

            </div>
        );
    }
}

export default Blog;