import React, {PropTypes} from 'react';
import TextInputWithLabel from '../common/TextInputWithLabel';

const CrawlingForm = ({crawling, onChange, onSubmit, onReset, errors}) => {
  return (
    <form style={{height: "auto"}}>
      <TextInputWithLabel
        name="url"
        placeholder="Input link here"
        label="URL"
        width="150px"
        onChange={onChange}
        value={crawling.url}
      />
      <TextInputWithLabel
        name="limit"
        placeholder="Input limit number here"
        label="Limit"
        width="150px"
        onChange={onChange}
        value={crawling.link}
      />
      <br/>
      <div style={{display: "inline", width: "400px"}}>
        <input
          type="submit"
          value="Crawling"
          className="btn btn-primary"
          onClick={onSubmit}
          disabled={!errors.formValid}
        />
        &nbsp;&nbsp;&nbsp;
        <input
          type="reset"
          value="Reset"
          className="btn btn-primary"
          disabled={!crawling.url && !crawling.limit}
        />
      </div>
    </form>
  );
};


CrawlingForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  crawling: PropTypes.object.isRequired,
  errors: React.PropTypes.object
};

export default CrawlingForm;
