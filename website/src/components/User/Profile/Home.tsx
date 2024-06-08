import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h5">Welcome to Your Dashboard</Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <h6>Overview:</h6>
              <p>
                Welcome to your home dashboard! This is the central hub where
                you can manage various aspects of your account and projects.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>Getting Started:</h6>
              <p>
                To get started, familiarize yourself with the tabs above. Each
                tab represents a different section of your dashboard:
              </p>
              <ul>
                <li>
                  <strong>Projects:</strong> Manage your projects, create new
                  ones, and collaborate with team members.
                </li>
                <li>
                  <strong>API:</strong> Access your API key for integration with
                  external services.
                </li>
                <li>
                  <strong>Notifications:</strong> Customize your notification
                  settings to stay informed about important updates.
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>Projects:</h6>
              <p>
                The "Projects" tab is where you can view, create, and manage
                your projects. Whether you're working on a personal project or
                collaborating with a team, this section provides all the tools
                you need to stay organized and productive.
              </p>
              <Button href="/projects" variant="primary">
                Go to Projects
              </Button>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <div className="border border-primary rounded p-3">
                {" "}
                {/* Surrounding content around faceauth.js */}
                <h6>Face Authentication:</h6>
                <p>
                  Utilize the <code>faceauth.js</code> library provided in your
                  projects to implement face authentication. This library allows
                  you to securely authenticate users using facial recognition
                  technology. Simply integrate the library into your project,
                  and follow the documentation for instructions on how to set it
                  up.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>Support:</h6>
              <p>
                If you have any questions or need assistance, our support team
                is here to help. You can refer to the{" "}
                <a href="/support" target="_blank" rel="noopener noreferrer">
                  support page
                </a>{" "}
                for FAQs and troubleshooting tips, or contact us directly for
                personalized assistance.
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
