/* eslint-disable import/no-default-export */

'use client'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

export interface AuthLostPasswordPageProps {}

const AuthLostPasswordPage: React.FC<AuthLostPasswordPageProps> = () => (
  <Card>
    <Card.Body>
      <Form>
        <div>Lost password</div>
        <Form.Group controlId="exampleFormControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email address" />
        </Form.Group>
        <Button variant="primary">Ok</Button>
      </Form>
    </Card.Body>
  </Card>
)

export default AuthLostPasswordPage
