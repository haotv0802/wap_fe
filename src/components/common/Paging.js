import React from 'react';
import PropTypes from 'prop-types';

const Paging = ({total, numberOfPages, size, pageNumber}) => {
  return (
    <div style={{textAlign:"center"}}>
      <nav>
        <ul className="pagination">
          <li className="page-item"><a className="page-link" href="#">Previous</a></li>

          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  );
};

Paging.propTypes = {
  total: PropTypes.string.isRequired,
  numberOfPages: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  width: PropTypes.string
};

export default Paging;
