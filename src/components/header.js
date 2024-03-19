import React, { Component } from 'react'
import {
	Container,
	FormControl,
	Nav,
	Navbar,
	Form,
	Button
} from 'react-bootstrap'
import logo from '../logo512.png'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'



import About from '../pages/About'
import Courses from '../pages/Courses'
import Login from '../pages/Login'
import News from '../pages/News'
import Projects from '../pages/Projects'
import Registration from '../pages/Registration'
import Home from '../pages/Home'
import ProfileComponent from './ProfileComponent'
import ProjectPage from './ProjectPage';
import Create from '../pages/Create';
import SearchComponent from './SearchComponent'


export default class header extends Component {

	render() {
		return (
			<>

				<Navbar fixed='top' collapseOnSelect expand="md" bg="white" variant="light" style={{
					boxShadow: '0px 0px 10px #a8a8a8',

				}}>
					<Container>
						<Navbar.Brand href="/home" className='fw-bold'>
							<img
								src={logo}
								height="30"
								width="30"
								className='d-inline-block align-top'
								alt='Logo'
							/> NA VOLNE
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className="me-auto d-flex justify-content-between">
								<Nav.Link href="/news" className='fw-bold'> Новости </Nav.Link>
								<Nav.Link href="/projects" className='fw-bold'> Проекты </Nav.Link>
								<Nav.Link href="/courses" className='fw-bold'> Курсы </Nav.Link>
								<Nav.Link href="/about" className='fw-bold'> FAQ </Nav.Link>


							</Nav>
							<Form className='d-flex' >
								<FormControl
									type="text"
									placeholder='Найти проект'
									className="me-sm-2"
								/>
								<Button variant="outline-primary" className='me-sm-5' href='/search'>Найти</Button>
							</Form>

							<Nav className="d-flex ms-sm-5">
								{!localStorage.getItem('accessToken') && <div className='d-flex'>
									<Button variant="outline-primary" className='me-sm-2' href="/login">Войти</Button>
									<Button variant="primary" className='me-sm-2' href="/registration">Зарегистрироваться</Button>
								</div>
								}
								{localStorage.getItem('accessToken') &&
									<Navbar.Brand href={`/profile/${localStorage.getItem('user')}`} className='fw-bold'>
										<img
											src={logo}
											height="30"
											width="30"
											className='d-inline-block align-top'
											alt='Logo'
										/>
									</Navbar.Brand>
								}
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>

				<Router>
					<Switch>
						<Route exact path="/News" component={News} />
						<Route exact path="/projects" component={Projects} />
						<Route exact path="/Courses" component={Courses} />
						<Route exact path="/About" component={About} />
						<Route exact path="/Login" component={Login} />
						<Route exact path="/Registration" component={Registration} />
						<Route exact path="/Home" component={Home} />
						<Route exact path="/Create" component={Create} />
						<Route path="/profile/:profilename" component={ProfileComponent} />
						<Route path="/projects/:slug" component={ProjectPage} />
						<Route path="/search/" component={SearchComponent} />
					</Switch>
				</Router>
			</>
		)
	}
}
