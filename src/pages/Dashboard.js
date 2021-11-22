import { Card, Container, Row, Button } from "react-bootstrap";
import { AiFillHome } from 'react-icons/ai';
import { FiUserPlus, FiUsers } from 'react-icons/fi';
import { BiBookmark, BiBookmarks } from 'react-icons/bi';
import { SideBarData } from '../components/Navbar/SidebarData';
import 'bootstrap/dist/css/bootstrap.min.css'

const Dashboard = () => {

    return (
        <div className="dashboard">
            <div className="maindiv">
                <Container fluid>
                    <Row xs={12} md={4} lg={3}>
                        {SideBarData.slice(1).map((item, index) => {
                            return (
                                <Card style={{ width: '20rem', fontSize: '20px', padding: '10px', margin: '20px' }}>
                                    <Card.Body>
                                        <Card.Title>{item.icon} {item.title}</Card.Title>
                                        <Button variant="primary" href={item.path}>{item.title}</Button>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Dashboard;