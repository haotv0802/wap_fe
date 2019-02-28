import React from "react";
import {connect} from "react-redux";
import * as contactActions from "../../actions/contactActions";
import * as postsActions from "../../actions/postsActions";
import {bindActionCreators} from 'redux';
import PropTypes from "prop-types";
import Divider from 'material-ui/Divider';
import Pagination from "react-js-pagination";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Select from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import PostPage from "../dialogs/post/PostPage";
import toastr from "toastr";


class ContactPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      contacts: JSON.parse(JSON.stringify(this.props.contacts)),
      posts: JSON.parse(JSON.stringify(this.props.posts)),
      pageNumber: this.props.pageNumber,
      total: this.props.total,
      size: this.props.size,
      nameFilter: this.props.nameFilter,
      phoneFilter: this.props.phoneFilter,
      emailFilter: this.props.emailFilter,
      typeFilter: this.props.typeFilter,
      manualCheckFilter: this.props.manualCheckFilter,
      emailExistingFilter: this.props.emailExistingFilter,
      activePage: 1,
      editMode: false,
      hasChanges: false,
      types: this.props.types,
      isExisting: this.props.isExisting,
      isOpenPost: this.props.isOpenPost,
      sortingMap : new Map()
    };
    this.onLoadContacts = this.onLoadContacts.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFiltersChange = this.handleFiltersChange.bind(this);
    this.handleEditContact = this.handleEditContact.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleCheckedTypeChange = this.handleCheckedTypeChange.bind(this);
    this.handleEmailExistingChange = this.handleEmailExistingChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleTypeEditChange = this.handleTypeEditChange.bind(this);
    this.handleEmailExistingEditChange = this.handleEmailExistingEditChange.bind(this);
    this.handleTypeManualCheckEditChange = this.handleTypeManualCheckEditChange.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.handlePostClose = this.handlePostClose.bind(this);
    this.openPostDialog = this.openPostDialog.bind(this);
    this.sortingContacts = this.sortingContacts.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.posts !== nextProps.posts) {
      this.setState({
        posts: JSON.parse(JSON.stringify(nextProps.posts))
      });
    }

    if (this.props.contacts !== nextProps.contacts) {
      this.setState({
        contacts: JSON.parse(JSON.stringify(nextProps.contacts))
      });
    }
    if (this.props.pageNumber !== nextProps.pageNumber) {
      this.setState({
        pageNumber: nextProps.pageNumber
      });
    }

    if (this.props.total !== nextProps.total) {
      this.setState({
        total: nextProps.total
      });
    }
    if (this.props.size !== nextProps.size) {
      this.setState({
        size: nextProps.size
      });
    }
  }

  handlePageChange(pageNumber) {
    this.onLoadContacts(pageNumber);
  }

  componentWillMount() {
    this.props.actions.getContacts(
      this.state.nameFilter,
      this.state.phoneFilter,
      this.state.emailFilter,
      this.state.typeFilter,
      this.state.manualCheckFilter,
      this.state.emailExistingFilter,
      this.state.pageNumber, this.state.size,
      this.state.sortingMap
    );
  }

  onLoadContacts(pageNumber) {
    this.setState({
      pageNumber: pageNumber,
      activePage: pageNumber
    }, () => {
      this.props.actions.getContacts(
        this.state.nameFilter,
        this.state.phoneFilter,
        this.state.emailFilter,
        this.state.typeFilter,
        this.state.manualCheckFilter,
        this.state.emailExistingFilter,
        this.state.pageNumber, this.state.size,
        this.state.sortingMap);
    });
  }

  handleFiltersChange (event) {
    this.setState({ [event.target.name]: event.target.value},
      () => {
        this.props.actions.getContacts(
          this.state.nameFilter,
          this.state.phoneFilter,
          this.state.emailFilter,
          this.state.typeFilter,
          this.state.manualCheckFilter,
          this.state.emailExistingFilter,
          this.state.pageNumber, this.state.size,
          this.state.sortingMap);
      }
    );
  }

  handleTypeChange (event, key, value) {
    this.setState({ typeFilter: value},
      () => {
        this.props.actions.getContacts(
          this.state.nameFilter,
          this.state.phoneFilter,
          this.state.emailFilter,
          this.state.typeFilter,
          this.state.manualCheckFilter,
          this.state.emailExistingFilter,
          this.state.pageNumber, this.state.size,
          this.state.sortingMap);
      }
    );
  }

  handleEmailExistingEditChange (event, key, value) {
    let id = value.split("_")[0];
    let emailExisting = value.split("_")[1];
    let contactsList = Object.assign([], this.state.contacts);
    contactsList.find((item) => {
      if (item.id == id) {
        item.emailExisting = emailExisting;
        item.updated = true;
        return item;
      }
    });
    this.setState({
      hasChanges : true,
      contacts : contactsList
    });
  }

  handleTypeManualCheckEditChange (event, key, value) {
    let id = value.split("_")[0];
    let type = value.split("_")[1];
    let contactsList = Object.assign([], this.state.contacts);
    contactsList.find((item) => {
      if (item.id == id) {
        item.manualCheck = type;
        item.updated = true;
        return item;
      }
    });
    this.setState({
      hasChanges : true,
      contacts : contactsList
    });
  }

  handleTypeEditChange (event, key, value) {
    let id = value.split("_")[0];
    let type = value.split("_")[1];
    let contactsList = Object.assign([], this.state.contacts);
    contactsList.find((item) => {
      if (item.id == id) {
        item.type = type;
        item.updated = true;
        return item;
      }
    });
    this.setState({
      hasChanges : true,
      contacts : contactsList
    });
  }

  handleEmailExistingChange (event, key, value) {
    this.setState({ emailExistingFilter: value},
      () => {
        this.props.actions.getContacts(
          this.state.nameFilter,
          this.state.phoneFilter,
          this.state.emailFilter,
          this.state.typeFilter,
          this.state.manualCheckFilter,
          this.state.emailExistingFilter,
          this.state.pageNumber, this.state.size,
          this.state.sortingMap);
      }
    );
  }

  handleCheckedTypeChange (event, key, value) {
    this.setState({ manualCheckFilter: value},
      () => {
        this.props.actions.getContacts(
          this.state.nameFilter,
          this.state.phoneFilter,
          this.state.emailFilter,
          this.state.typeFilter,
          this.state.manualCheckFilter,
          this.state.emailExistingFilter,
          this.state.pageNumber, this.state.size,
          this.state.sortingMap);
      }
    );
  }

  handleEditContact() {

    this.setState({
      editMode: !this.state.editMode
    },() => {
      if (this.state.hasChanges) {
        let hasError = false;
        this.state.contacts.find((contact) => {
          if (contact.updated === true) {
            if (contact.name === undefined || contact.name === "") {
              toastr.clear();
              toastr.error("Name of customer should not be null");
              hasError = true;
              return contact;
            }
            if (contact.phone === undefined || contact.phone === "") {
              toastr.clear();
              toastr.error("Phone of customer should not be null");
              hasError = true;
              return contact;
            }
            if (contact.email === undefined || contact.email === "") {
              toastr.clear();
              toastr.error("Email of customer should not be null");
              hasError = true;
              return contact;
            }
          }
        });

        if (!hasError) {
          console.log(this.state.contacts);
          this.props.actions.updateContacts(this.state.contacts);
        }
      }

      if (!this.state.editMode) {
        this.setState({
          hasChanges: false
        });
      }
    });

  }

  openPostDialog(event) {
    this.props.postsActions.getPostsByContactId(event.target.id);
    this.setState(prevState => ({
        isOpenPost: !prevState.isOpenPost
      })
    );
  }

  handleInputChange(event) {
    let array = event.target.id;
    array = array.split("_");
    let id = array[0];
    let name = array[1];
    let contactsList = Object.assign([], this.state.contacts);
    let data = contactsList.find(contact => {
      if (contact.id == id) {
        contact[name] = event.target.value;
        contact.updated = true;
        return contact;
      }
    });
    this.setState({
      hasChanges : true,
      contacts: contactsList
    });
  }

  handleCancel() {
    this.setState({
      editMode: false,
      hasChanges : false
    });
  }


  handleClearSearch() {
    this.setState({
      nameFilter: "",
      phoneFilter: "",
      emailFilter: "",
      typeFilter: "",
      manualCheckFilter: "",
      emailExistingFilter: "",
      sortingMap: new Map()
    }, () => {
      this.props.actions.getContacts(
        this.state.nameFilter,
        this.state.phoneFilter,
        this.state.emailFilter,
        this.state.typeFilter,
        this.state.manualCheckFilter,
        this.state.emailExistingFilter,
        this.state.pageNumber, this.state.size,
        this.state.sortingMap);
    });
  }

  handlePostClose() {
    this.setState({
      isOpenPost: false
    });
  }

  sortingContacts(event) {
    let key = event.target.id;

    let map = this.state.sortingMap;
    let value = map.get(key);
    if (value === undefined) {
      value = 0;
    }

    value += 1;
    map.set(key, value);

    this.setState({
      sortingMap: map
    }, () => {
        this.props.actions.getContacts(
        this.state.nameFilter,
        this.state.phoneFilter,
        this.state.emailFilter,
        this.state.typeFilter,
        this.state.manualCheckFilter,
        this.state.emailExistingFilter,
        this.state.pageNumber, this.state.size,
        this.state.sortingMap
        );
    });
  }



  render() {
    return (
      <div className="panel panel-primary">

        <div className="table-responsive">
          {this.state.editMode === true ?
            <span>
              <RaisedButton backgroundColor="#f49842" label="Cancel" onClick={this.handleCancel}/>&nbsp;
            </span> : ""
          }
          <RaisedButton label={this.state.editMode ? "Save" : "Edit"} primary onClick={this.handleEditContact} />
          {((this.state.nameFilter !== undefined && this.state.nameFilter !== "")
            || (this.state.phoneFilter !== undefined && this.state.phoneFilter !== "")
            || (this.state.emailFilter !== undefined) && this.state.emailFilter !== ""
            || (this.state.typeFilter !== undefined) && this.state.typeFilter !== ""
            || (this.state.manualCheckFilter !== undefined) && this.state.manualCheckFilter !== ""
            || (this.state.emailExistingFilter !== undefined) && this.state.emailExistingFilter !== ""
          ) ?
            <RaisedButton label="Clear filtering" backgroundColor="#f49842" onClick={this.handleClearSearch} /> : ""}

          {this.state.sortingMap.size > 0
           ?
            <RaisedButton label="Clear sorting" backgroundColor="#f49842" onClick={this.handleClearSearch} /> : ""}
          <Table
            selectable={false}
            fixedHeader
            bodyStyle={{overflow:'visible'}}
          >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={nameStyles}>
                  <a href="#" onClick={this.sortingContacts} id="name-sortingId">
                    Name
                  </a>
                </TableHeaderColumn>
                <TableHeaderColumn style={phoneStyles}>
                  <a href="#" onClick={this.sortingContacts} id="phone-sortingId">
                    Phone
                  </a>
                </TableHeaderColumn>
                <TableHeaderColumn style={postsCountStyles}>
                  <a href="#" onClick={this.sortingContacts} id="posts_count-sortingId">
                    Posts
                  </a>
                </TableHeaderColumn>
                <TableHeaderColumn style={emailStyles}>
                  <a href="#" onClick={this.sortingContacts} id="email-sortingId">
                    Email
                  </a>
                </TableHeaderColumn>
                <TableHeaderColumn style={typeStyles}>Type</TableHeaderColumn>
                <TableHeaderColumn style={manualStyles}>Manual check</TableHeaderColumn>
                <TableHeaderColumn style={emailExistsStyles}>Email existing?</TableHeaderColumn>
                <TableHeaderColumn style={emailExistsStyles}>Location</TableHeaderColumn>
                <TableHeaderColumn style={descriptionStyles}>Description</TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn style={nameStyles}>
                  <TextField
                    id="name"
                    label="Name"
                    name="nameFilter"
                    value={this.state.nameFilter}
                    style={nameStyles}
                    onChange={this.handleFiltersChange}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn style={phoneStyles}>
                  <TextField
                    id="phone"
                    label="Phone"
                    name="phoneFilter"
                    value={this.state.phoneFilter}
                    style={phoneStyles}
                    onChange={this.handleFiltersChange}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn style={postsStyles}></TableHeaderColumn>
                <TableHeaderColumn style={emailStyles}>
                  <TextField
                    id="email"
                    label="Email"
                    name="emailFilter"
                    value={this.state.emailFilter}
                    style={emailStyles}
                    onChange={this.handleFiltersChange}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn style={typeStyles}>
                  <Select
                    name="typeFilter"
                    value={this.state.typeFilter}
                    style={typeStyles}
                    onChange={this.handleTypeChange}
                  >
                    {this.state.types.map((data, key) =>
                      <MenuItem key={key} value={data} primaryText={data} />
                    )}
                  </Select>
                </TableHeaderColumn>
                <TableHeaderColumn style={manualStyles}>
                  <Select
                    name="manualCheckFilter"
                    value={this.state.manualCheckFilter}
                    style={manualStyles}
                    onChange={this.handleCheckedTypeChange}
                  >
                    {this.state.types.map((data, key) =>
                      <MenuItem key={key} value={data} primaryText={data} />
                    )}
                  </Select>
                </TableHeaderColumn>
                <TableHeaderColumn style={emailExistsStyles}>
                  <Select
                    name="emailExistingFilter"
                    value={this.state.emailExistingFilter}
                    style={emailExistsStyles}
                    onChange={this.handleEmailExistingChange}
                  >
                    {this.state.isExisting.map((data, key) =>
                      <MenuItem key={key} value={data} primaryText={data} />
                    )}
                  </Select>
                </TableHeaderColumn>
                <TableHeaderColumn style={emailExistsStyles}>
                  <Select
                    name="emailExistingFilter"
                    value={this.state.emailExistingFilter}
                    style={emailExistsStyles}
                  >
                    {this.state.isExisting.map((data, key) =>
                      <MenuItem key={key} value={data} primaryText={data} />
                    )}
                  </Select>
                </TableHeaderColumn>
                <TableHeaderColumn style={descriptionStyles}>
                  <TextField
                    id="description"
                    label="Description"
                    style={descriptionStyles}
                  />
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover stripedRows={false}>
              {!this.state.editMode && this.state.contacts.map((data, key) => {
                  return (<TableRow key={key}>
                    <TableRowColumn style={nameStyles}><span>{data.name}</span></TableRowColumn>
                    <TableRowColumn style={phoneStyles}><span>{data.phone}</span></TableRowColumn>
                    <TableRowColumn style={postsCountStyles}>
                      <a href="#" id={data.id} onClick={this.openPostDialog}
                         style={{fontFamily: "Courier New", fontWeight: "bold", fontSize: "18px"}}>
                        {data.postsCount}
                      </a>
                    </TableRowColumn>
                    <TableRowColumn style={emailStyles}><span>{data.email}</span></TableRowColumn>
                    <TableRowColumn style={typeStyles}><span>{data.type}</span></TableRowColumn>
                    <TableRowColumn style={manualStyles}><span>{data.manualCheck}</span></TableRowColumn>
                    <TableRowColumn style={emailExistsStyles}><span>{data.emailExisting}</span></TableRowColumn>
                    <TableRowColumn style={emailExistsStyles}><span></span></TableRowColumn>
                    <TableRowColumn style={descriptionStyles}><span>{data.description}</span></TableRowColumn>
                  </TableRow>)
                    ;
                }
              )}

              {this.state.editMode && this.state.contacts.map((data, key) => {
                  return (<TableRow key={key}>
                    <TableRowColumn style={nameStyles}><span>
                      <TextField
                        id={data.id + "_name"}
                        hintText="Input name"
                        value={data.name}
                        onChange={this.handleInputChange}
                      />
                    </span></TableRowColumn>
                    <TableRowColumn style={phoneStyles}><span>
                      <TextField
                        id={data.id + "_phone"}
                        hintText="Input phone"
                        value={data.phone === null ? "" : data.phone}
                        onChange={this.handleInputChange}
                      />
                    </span></TableRowColumn>
                    <TableRowColumn style={emailStyles}><span>
                      <TextField
                        id={data.id + "_email"}
                        hintText="Input email"
                        value={data.email === null ? "" : data.email}
                        onChange={this.handleInputChange}
                      />
                    </span></TableRowColumn>
                    <TableRowColumn style={postsStyles}>123</TableRowColumn>
                    <TableRowColumn style={typeStyles}>
                      <Select
                        name="type"
                        value={data.id + "_" + data.type}
                        style={typeStyles}
                        onChange={this.handleTypeEditChange}
                      >
                        {this.state.types.map((type, key) =>
                          <MenuItem key={key} value={data.id + "_" + type} primaryText={type} />
                        )}
                      </Select>
                    </TableRowColumn>
                    <TableRowColumn style={manualStyles}>
                      <Select
                        name="manualCheck"
                        value={data.id + "_" + data.manualCheck}
                        style={manualStyles}
                        onChange={this.handleTypeManualCheckEditChange}
                      >
                        {this.state.types.map((manualCheck, key) =>
                          <MenuItem key={key} value={data.id + "_" + manualCheck} primaryText={manualCheck} />
                        )}
                      </Select>
                    </TableRowColumn>
                    <TableRowColumn style={emailExistsStyles}>
                      <Select
                        name="emailExisting"
                        value={data.id + "_" + data.emailExisting}
                        style={emailExistsStyles}
                        onChange={this.handleEmailExistingEditChange}
                      >
                        {this.state.isExisting.map((emailExisting, key) =>
                          <MenuItem key={key} value={data.id + "_" + emailExisting} primaryText={emailExisting} />
                        )}
                      </Select>
                    </TableRowColumn>
                    <TableRowColumn style={emailExistsStyles}>
                    </TableRowColumn>
                    <TableRowColumn style={descriptionStyles}><span>
                      <TextField
                        id={data.id + "_description"}
                        hintText="Input description"
                        value={data.description === null ? "" : data.description}
                        onChange={this.handleInputChange}
                      />
                    </span></TableRowColumn>
                  </TableRow>)
                    ;
                }
              )}

            </TableBody>
          </Table>
          <Divider />
          <center>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.size}
              totalItemsCount={this.state.total}
              pageRangeDisplayed={10}
              onChange={this.handlePageChange}
            />
          </center>
        </div>

        <PostPage open={this.state.isOpenPost} handlePostClose={this.handlePostClose} posts={this.state.posts}/>
      </div>
    );
  }
}

ContactPage.defaultProps = {
  contacts: [],
  posts: [],
  total: 0,
  size: 10,
  pageNumber: 1,
  nameFilter: '',
  phoneFilter: '',
  emailFilter: '',
  typeFilter: '',
  manualCheckFilter: '',
  emailExistingFilter: '',
  types: ["", "OWNER", "SALE", "NA"],
  isExisting: ["", "YES", "NO", "NA"],
  isOpenPost: false
};

ContactPage.propTypes = {
  actions: PropTypes.object.isRequired,
  postsActions: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  total: PropTypes.number,
  size: PropTypes.number.isRequired,
  nameFilter: PropTypes.string,
  phoneFilter: PropTypes.string,
  emailFilter: PropTypes.string,
  typeFilter: PropTypes.string,
  manualCheckFilter: PropTypes.string,
  emailExistingFilter: PropTypes.string,
  types: PropTypes.array,
  isExisting: PropTypes.array,
  isOpenPost: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
  return {
    posts: state.post.data.content,
    contacts: state.contact.data.content,
    pageNumber: state.contact.data.number,
    total: state.contact.data.total,
    size: state.contact.data.size
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contactActions, dispatch),
    postsActions: bindActionCreators(postsActions, dispatch)
  };
}

const nameStyles = {
  width: "150px"
};

const phoneStyles = {
  width: "130px"
};

const postsCountStyles = {
  width: "93px"
};

const emailStyles = {
  width: "220px"
};

const typeStyles = {
  width: "130px"
};

const manualStyles = {
  width: "130px"
};

const emailExistsStyles = {
  width: "90px"
};

const postsStyles = {
  width: "80px"
};

const descriptionStyles = {
  width: "200px"
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
