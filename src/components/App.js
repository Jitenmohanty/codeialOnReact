import { useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getPosts } from "../api";
import { Home , Login } from "../pages";
import { Loader, Navbar } from "./";

const About = () => {
  return <h1>About</h1>;
};
const UserInfo = () => {
  return <h1>UserInfo</h1>;
};

const PageNotFound = () => {
  return <h1>404 Error</h1>;
};

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home posts={posts} />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>

          <Route exact path="/login">
            <Login/>
          </Route>

          <Route exact path="/userinfo">
            <UserInfo />
          </Route>

          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
