import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import BusinessLoansPage from './components/businessLoans/BusinessLoansPage';
import HowItWorksPage from './components/howItWorks/HowItWorksPage';
import UseCasesPage from './components/useCases/UseCasesPage';
import WhyAspirePage from './components/whyAspire/WhyAspirePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="businessLoans" component={BusinessLoansPage}/>
    <Route path="howItWorks" component={HowItWorksPage}/>
    <Route path="useCases" component={UseCasesPage}/>
    <Route path="whyAspire" component={WhyAspirePage}/>
  </Route>
);
