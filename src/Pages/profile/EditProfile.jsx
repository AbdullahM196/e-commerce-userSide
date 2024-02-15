import { Modal, Button, Col, Row, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import { useUpdateUserMutation } from "../../store/api/Slices/User";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
export default function EditProfile({ show, setShow, data }) {
  const MySwal = withReactContent(Swal);
  const handleClose = () => setShow(false);
  const [user, setUser] = useState({
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    userName: data.userName,
    email: data.email,
    mobile: data.mobile,
    img: data.img.url ?? "",
  });
  const [updateUser] = useUpdateUserMutation();
  async function handleUpdate() {
    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("mobile", user.mobile);
    formData.append("image", user.img);
    try {
      await updateUser(formData).unwrap();
      handleClose();
      MySwal.fire({
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: err.data.message,
      });
    }
  }
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Your Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter FirstName"
                value={user.firstName}
                onChange={(evt) =>
                  setUser({ ...user, firstName: evt.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>LastName</Form.Label>
              <Form.Control
                type="text"
                placeholder="LastLanme"
                value={user.lastName}
                onChange={(evt) =>
                  setUser({ ...user, lastName: evt.target.value })
                }
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridUserName">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              placeholder="userName"
              value={user.userName}
              onChange={(evt) =>
                setUser({ ...user, userName: evt.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="example@example.com"
              value={user.email}
              onChange={(evt) => setUser({ ...user, email: evt.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              placeholder="01(0-1-2)8-Numbers"
              value={user.mobile}
              onChange={(evt) => setUser({ ...user, mobile: evt.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(evt) => setUser({ ...user, img: evt.target.files[0] })}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleUpdate}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
EditProfile.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  data: PropTypes.object,
};
