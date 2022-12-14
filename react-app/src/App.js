import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import FullStoryPage from "./components/StoryDetail/FullStoryPage"
import CreateStory from "./components/CreateStory"
import Profile from "./components/Profile"
import LoadUserComments from './components/comments/LoadUserComments';
import UserProfile from './components/Profile/ProfilePage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>

        <Route path="/stories/:storyId" exact={true}>
            <FullStoryPage />
        </Route>

        <Route path="/new-story" exact={true}>
          <CreateStory />
        </Route>
        <Route path="/myprofile" exact={true}>
          <Profile />
        </Route>
        <Route path='/my-comments' exact={true} >
          <LoadUserComments />
        </Route>
         <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/profiles/:userId/stories" exact={true}>
          <UserProfile />
        </Route>
        <Route path="/profiles/:userId" exact={true}>
          <UserProfile />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
