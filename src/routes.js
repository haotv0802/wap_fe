import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import CrawledDataPage from './components/crawledData/CrawledDataPage';
import HowItWorksPage from './components/howItWorks/HowItWorksPage';
import UseCasesPage from './components/useCases/UseCasesPage';
import WhyAspirePage from './components/whyAspire/WhyAspirePage';
import LogInPage from './components/login/LogInPage';
import SignupPage from './components/createAccount/SignupPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="crawledData" component={CrawledDataPage}/>
    <Route path="howItWorks" component={HowItWorksPage}/>
    <Route path="useCases" component={UseCasesPage}/>
    <Route path="whyAspire" component={WhyAspirePage}/>
    <Route path="login" component={LogInPage}/>
    <Route path="signup" component={SignupPage}/>
  </Route>
);
