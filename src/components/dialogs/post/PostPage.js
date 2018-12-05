import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";

export default class PostPage extends Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onRequestClose={this.props.handlePostClose}
        contentStyle={{width: '90%', maxWidth: 'none'}}
        autoScrollBodyContent={true}
      >
        <div className="panel panel-primary">
          <div className="table-responsive">
        <Table
          selectable={false}
          fixedHeader
          bodyStyle={{overflow:'visible'}}
        >
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={postStyles.name}>
                  Title
              </TableHeaderColumn>
              <TableHeaderColumn style={postStyles.address}>Address</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.contactName}>Name</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.contactEmail}>Email</TableHeaderColumn>
              {/*<TableHeaderColumn style={postStyles.acreage}>Acreage</TableHeaderColumn>*/}
              {/*<TableHeaderColumn style={postStyles.price}>Price</TableHeaderColumn>*/}
              <TableHeaderColumn style={postStyles.publishDate}>Published</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.endDate}>Ended</TableHeaderColumn>
              {/*<TableHeaderColumn style={postStyles.url}>URL</TableHeaderColumn>*/}
              {/*<TableHeaderColumn style={postStyles.locationId}>Location</TableHeaderColumn>*/}
              {/*<TableHeaderColumn style={postStyles.source}>Source</TableHeaderColumn>*/}
              {/*<TableHeaderColumn style={postStyles.type}>Type</TableHeaderColumn>*/}
              {/*<TableHeaderColumn style={postStyles.contactId}>Contact</TableHeaderColumn>*/}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows={false}>
          {this.props.posts.map((data, key) => {
              return (
                <TableRow key={key}>
                  <TableRowColumn style={postStyles.name}>
                    <a href={data.url} target="_blank">
                      {data.name}
                    </a>
                  </TableRowColumn>
                  <TableRowColumn style={postStyles.address}>{data.address}</TableRowColumn>
                  <TableRowColumn style={postStyles.contactName}>{data.contactName}</TableRowColumn>
                  <TableRowColumn style={postStyles.contactEmail}>{data.contactEmail}</TableRowColumn>
                  {/*<TableRowColumn style={postStyles.acreage}>{data.acreage}</TableRowColumn>*/}
                  {/*<TableRowColumn style={postStyles.price}>{data.price}</TableRowColumn>*/}
                  <TableRowColumn style={postStyles.publishDate}>{data.publishDate}</TableRowColumn>
                  <TableRowColumn style={postStyles.endDate}>{data.endDate}</TableRowColumn>
                  {/*<TableRowColumn style={postStyles.url}>{data.url}</TableRowColumn>*/}
                  {/*<TableRowColumn style={postStyles.locationId}>{data.locationId}</TableRowColumn>*/}
                  {/*<TableRowColumn style={postStyles.source}>{data.source}</TableRowColumn>*/}
                  {/*<TableRowColumn style={postStyles.type}>{data.type}</TableRowColumn>*/}
                  {/*<TableRowColumn style={postStyles.contactId}>{data.contactId}</TableRowColumn>*/}

                </TableRow>
              );
            }
          )}
        </TableBody>
        </Table>
          </div>
        </div>
      </Dialog>
    );
  }
}

PostPage.propTypes = {
  open: PropTypes.bool.isRequired,
  handlePostClose: PropTypes.func.isRequired,
  posts: PropTypes.array
};


const postStyles = {
  name: {
    width: "130px",
    wordWrap: 'break-word', whiteSpace: 'normal'
  },
  address: {
    width: "130px",
    wordWrap: 'break-word', whiteSpace: 'normal'
  },
  description: {
    width: "80px"
  },
  contactName: {
    width: "120px",
    wordWrap: 'break-word', whiteSpace: 'normal'
  },
  contactEmail: {
    width: "150px",
    wordWrap: 'break-word', whiteSpace: 'normal'
  },
  acreage: {
    width: "80px",
    wordWrap: 'break-word', whiteSpace: 'normal'
  },
  price: {
    width: "80px",
    wordWrap: 'break-word', whiteSpace: 'normal'
  },
  publishDate: {
    width: "80px",
    wordWrap: 'break-word', whiteSpace: 'normal'
  },
  endDate: {
    width: "80px",
    wordWrap: 'break-word', whiteSpace: 'normal'
  },
  url: {
    width: "80px"
  },
  locationId: {
    width: "80px",
    wordWrap: 'break-word', whiteSpace: 'normal'
  },
  source: {
    width: "80px",
    wordWrap: 'break-word', whiteSpace: 'normal'
  },
  type: {
    width: "80px",
    wordWrap: 'break-word', whiteSpace: 'normal'
  },
  contactId: {
    width: "80px",
    wordWrap: 'break-word', whiteSpace: 'normal'
  }
};
