import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as crawlingActions from "../../actions/crawlingActions";
import CrawlingForm from './CrawlingForm';

class CrawlingPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      crawlingForm: Object.assign({}, this.props.crawlingForm), errors: {formValid: false}
    };
    this.updateFormState = this.updateFormState.bind(this);
    this.resetValues = this.resetValues.bind(this);
    this.crawlData = this.crawlData.bind(this);
  }

  componentWillMount() {
    console.log(this.props.crawlingForm);
  }


  updateFormState(event) {
    const field = event.target.name;
    let crawlingForm = this.state.crawlingForm;
    crawlingForm[field] = event.target.value;
    let errorsChanged = this.validateLoginFormControls(crawlingForm, field);
    return this.setState({
      crawlingForm: crawlingForm,
      errors: errorsChanged
    });
  }

  validateLoginFormControls(controls, field) {
    let errorsChanged = this.state.errors;
    errorsChanged.formValid = true;
    if (!controls.url) {
      errorsChanged.formValid = false;
      if (field === 'url') {
        errorsChanged.url = "URL must be not null.";
        return errorsChanged;
      }
    } else {
      errorsChanged.url = "";
    }

    if (!controls.limit) {
      errorsChanged.formValid = false;
      if (field === 'limit') {
        errorsChanged.limit = "Limit must be not null.";
        return errorsChanged;
      }
    } else {
      errorsChanged.limit = "";
    }

    return errorsChanged;
  }


  resetValues() {
    this.setState({
      crawlingForm: {url: '', limit: ''},
      errors: {formValid: false}
    });
  }

  crawlData() {
    console.log(this.state.crawlingForm);
    this.props.actions.crawlData(this.state.crawlingForm);
  }

  render() {
    return (
      <div className="panel panel-primary">
          <div className="table-responsive">
            <div className="panel-body" style={{width: "500px", height: "auto", textAlign: "center"}}>
              <CrawlingForm
                onChange={this.updateFormState}
                onReset={this.resetValues}
                errors={this.state.errors}
                crawling={this.state.crawlingForm}
                onSubmit={this.crawlData}
              />
            </div>
          </div>
      </div>
    );
  }
}

CrawlingPage.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  crawlingInfo: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  crawlingForm: PropTypes.object.isRequired
};

CrawlingPage.defaultProps = {
  pageTitle: "ABC DEF",
  crawlingForm: {url : 'https://batdongsan.com.vn/ban-nha-rieng-tp-hcm/p885', limit : ''}
};

function mapStateToProps(state, ownProps) {
  return {
    crawlingInfo: state.crawlingInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(crawlingActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CrawlingPage);
