import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from "material-ui/Table";

export default class PostPage extends Component {

  render() {
    console.log(this.props.posts);
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
              <TableHeaderColumn style={postStyles.name}>Title</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.address}>Address</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.description}>Description</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.contactName}>Name</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.contactEmail}>Email</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.acreage}>Acreage</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.price}>Price</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.publishDate}>Published</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.endDate}>Ended</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.url}>URL</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.locationId}>Location</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.source}>Source</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.type}>Type</TableHeaderColumn>
              <TableHeaderColumn style={postStyles.contactId}>Contact</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows={false}>
          {this.props.posts.map((data, key) => {
              return (
                <TableRow key={key}>
                  <TableHeaderColumn style={postStyles.name}>{data.name}</TableHeaderColumn>
                  <TableHeaderColumn style={postStyles.address}>{data.address}</TableHeaderColumn>
                  <TableHeaderColumn style={postStyles.description}>{data.description}</TableHeaderColumn>
                  <TableHeaderColumn style={postStyles.contactName}>{data.contactName}</TableHeaderColumn>
                  <TableHeaderColumn style={postStyles.contactEmail}>{data.contactEmail}</TableHeaderColumn>
                  <TableHeaderColumn style={postStyles.acreage}>{data.acreage}</TableHeaderColumn>
                  <TableHeaderColumn style={postStyles.price}>{data.price}</TableHeaderColumn>
                  <TableHeaderColumn style={postStyles.publishDate}>{data.publishDate}</TableHeaderColumn>
                  <TableHeaderColumn style={postStyles.endDate}>{data.endDate}</TableHeaderColumn>
                  <TableHeaderColumn style={postStyles.url}>{data.url}</TableHeaderColumn>
                  <TableHeaderColumn style={postStyles.locationId}>{data.locationId}</TableHeaderColumn>
                  <TableHeaderColumn style={postStyles.source}>{data.source}</TableHeaderColumn>
                  <TableHeaderColumn style={postStyles.type}>{data.type}</TableHeaderColumn>
                  <TableHeaderColumn style={postStyles.contactId}>{data.contactId}</TableHeaderColumn>

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
    width: "80px"
  },
  address: {
    width: "80px"
  },
  description: {
    width: "80px"
  },
  contactName: {
    width: "80px"
  },
  contactEmail: {
    width: "80px"
  },
  acreage: {
    width: "80px"
  },
  price: {
    width: "80px"
  },
  publishDate: {
    width: "80px"
  },
  endDate: {
    width: "80px"
  },
  url: {
    width: "80px"
  },
  locationId: {
    width: "80px"
  },
  source: {
    width: "80px"
  },
  type: {
    width: "80px"
  },
  contactId: {
    width: "80px"
  }
};
