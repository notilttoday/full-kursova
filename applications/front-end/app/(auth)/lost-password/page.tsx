/* eslint-disable import/no-default-export */

'use client'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import classes from '@boilerplate/front-end/app/(auth)/styles.module.scss'

export interface AuthLostPasswordPageProps { }

const AuthLostPasswordPage: React.FC<AuthLostPasswordPageProps> = () => (
  <div className={classes.container}>
    <Card style={{ width: '320px', padding: '20px', height: '220px', backgroundColor: '#ededed', border: '0' }}>
      <Card.Body>
        <Form>
          <div style={{ textAlign: "center", fontSize: "18px" }}>Втратили пароль</div>
          <Form.Group controlId="exampleFormControlInput1">
            <Form.Label style={{ marginTop: "25px" }}>Пошта</Form.Label>
            <Form.Control type="email" placeholder="Введіть пошту" />
          </Form.Group>
          <div style={{ textAlign: "center" }}>
            <Button variant="primary" style={{ marginTop: "25px", backgroundColor: "#008000", border: "0" }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#006400'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#008000'}>
              Підтвердити
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  </div>
)

export default AuthLostPasswordPage
