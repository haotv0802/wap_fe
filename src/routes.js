import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import CrawledDataPage from './components/crawledData/CrawledDataPage';
import LogInPage from './components/login/LogInPage';
import SignupPage from './components/createAccount/SignupPage';
import CrawlingPage from "./components/crawling/CrawlingPage";
import ContactPage from "./components/contact/ContactPage";
import CustomerPage from "./components/customer/CustomerPage";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="crawledData" component={CrawledDataPage}/>
    <Route path="crawling" component={CrawlingPage}/>
    <Route path="contacts" component={ContactPage}/>
    <Route path="customers" component={CustomerPage}/>
    <Route path="login" component={LogInPage}/>
    <Route path="signup" component={SignupPage}/>
  </Route>
);
