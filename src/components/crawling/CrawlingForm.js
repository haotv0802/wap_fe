import React, {PropTypes} from 'react';
import TextInputWithLabel from '../common/TextInputWithLabel';

const CrawlingForm = ({crawling, onChange, onSubmit, onReset, errors}) => {
  return (
    <form>
      <TextInputWithLabel
        name="url"
        placeholder="Input link here"
        label="URL"
        width="250px"
        onChange={onChange}
        value={crawling.url}
      />
      <TextInputWithLabel
        name="limit"
        placeholder="Input limit number here"
        label="Limit"
        width="250px"
        onChange={onChange}
        value={crawling.link}
      />
      <input
        type="reset"
        value="Reset"
        className="btn btn-primary"
        disabled={!crawling.url && !crawling.limit}
      />
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
