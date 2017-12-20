import React, {PropTypes} from 'react';

class CollectionDataPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="panel panel-primary">
          <div className="table-responsive">
            <table className="table table-bordered table-hover" style={{width: "1200px"}}>
              <thead style={{color: "#337AB7"}}>
                <th className="col-sm-2">Name</th>
                <th className="col-sm-1">Category</th>
                <th className="col-sm-2">Vendor Name</th>
                <th className="col-sm-1">Location</th>
                <th className="col-sm-1">Ship on time</th>
                <th className="col-sm-1">Positive</th>
                <th className="col-sm-1">Neutral</th>
                <th className="col-sm-1">Negative</th>
                <th className="col-sm-1">Link</th>
                <th className="col-sm-1">Time on lazada</th>
                <th className="col-sm-1">Rating</th>
                <th className="col-sm-1">Size</th>
              </thead>
              <tbody>
              <tr>
                <td>Name</td>
                <td>Category</td>
                <td>Vendor Name</td>
                <td>Location</td>
                <td>Shipping</td>
                <td>Positive</td>
                <td>Neutral</td>
                <td>Negative</td>
                <td>Link</td>
                <td>Time on lazada</td>
                <td>Rating</td>
                <td>Size</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>Category</td>
                <td>Vendor Name</td>
                <td>Location</td>
                <td>Shipping</td>
                <td>Positive</td>
                <td>Neutral</td>
                <td>Negative</td>
                <td>Link</td>
                <td>Time on lazada</td>
                <td>Rating</td>
                <td>Size</td>
              </tr>
              </tbody>
            </table>
          </div>
      </div>
    );
  }
}

CollectionDataPage.propTypes = {
  pageTitle: PropTypes.string.isRequired
};

CollectionDataPage.defaultProps = {
  pageTitle: "Business Loans"
};

export default CollectionDataPage;
