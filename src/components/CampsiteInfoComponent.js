import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    //this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };
  onSubmit = (e) => {
    this.toggleModal();
    alert(JSON.stringify(e));
  };
  render() {
    return (
      <React.Fragment>
        <Button color="primary" outline onClick={this.toggleModal}>
          <i className="fa fa-pencil fa-md m-3" />
          Submit Comment
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.onSubmit}>
              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  model=".rating"
                  name="rating"
                  className="form-control"
                >
                  <option disable selected hidden>
                    Select
                  </option>
                  <option value="1">1</option>
                  <option value="12"> 2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label htmlFor="name">Name</Label>
                <Control.text
                  model=".name"
                  name="name"
                  className="form-control"
                  placeholder="Your Name"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />

                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="name">Comment</Label>
                <Control.textarea
                  model=".comment"
                  name="comment"
                  className="form-control"
                  rows={5}
                />
              </div>
              <Button type="submit" color="primary">
                Submit{" "}
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
function RenderComments({ comments }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => (
          <div className="comment-container mb-3">
            <div>{comment.text}</div>
            <div>
              <strong>{comment.author}</strong>{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
            </div>
          </div>
        ))}
        <CommentForm />
      </div>
    );
  }
  return <div />;
}
function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  }
  return <div />;
}
export default CampsiteInfo;
