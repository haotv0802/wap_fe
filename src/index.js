import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import {getCrawledData, getCitiesAndDistrict} from "./actions/crawledDataActions";
// import {getURLList} from "./actions/crawlingActions";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore();
store.dispatch(getCitiesAndDistrict());
// store.dispatch(getCrawledData());


render(
  <MuiThemeProvider>
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
