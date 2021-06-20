import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { PostList } from "./features/posts/PostsList";
import { AddPostForm } from "./features/posts/AddPostForm";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { EditPostForm } from "./features/posts/EditPostForm";
import { UsersList } from "./features/users/UsersList";
import { UserPage } from "./features/users/UserPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <section>
                <React.Fragment>
                    <PostList />
                </React.Fragment>
              </section>
            )}
          />
            <Route exact path={'/posts/:postId'} component={SinglePostPage} />
            <Route exact path={'/editPost/:postId'} component={EditPostForm} />
            <Route exact path={'/new-post'} component={AddPostForm} />
            <Route exact path={'/users'} component={UsersList} />
            <Route exact path={'/users/:userId'} component={UserPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
