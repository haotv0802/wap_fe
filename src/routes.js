import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import CrawledDataPage from "./components/crawledData/CrawledDataPage";
import ChartPage from "./components/sellersInChart/ChartPage";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="collectedData" component={CrawledDataPage}/>
    <Route path="chart" component={ChartPage}/>
  </Route>
);
