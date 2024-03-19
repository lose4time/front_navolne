import React, { Component } from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';
import ProgressBar from "../components/progress-bar.component";
import "../css/home.css";
import footage from "../images/surgut.mp4"
import { Link } from 'react-router-dom'


class Home extends Component {


	constructor(props) {
		super(props);
		this.state = {
			project: null
		};
	}

	componentDidMount() {
		fetch('http://localhost:8000/') // замените на URL вашего DRF API и ID проекта
			.then(response => response.json())
			.then(data => this.setState({ project: data }));
	}

	render() {
		const { project } = this.state;
		if (!project) {
			return <div>Loading...</div>;
		}


		return (

			<>

				<section>
					<video style={{ marginTop: '50px', padding: '0', height: '80vh', objectFit: 'cover' }} className="w-100" autoPlay loop muted>
						<source
							src={footage}
							type="video/mp4"
							allowFullScreen
						/>
					</video>
					<div className="float-center">
						<h1 className='video-h1-center'>NA VOLNE</h1>
						<h2 className='video-h2-center'>Инвестиции в будущее</h2>
						<h3 className='video-h3-center'>Мы помогаем инвесторам, компаниям малого и среднего бизнеса быстро, и безопасно провести сделки по привлечению капитала в ХМАО</h3>
					</div>

				</section>

				<Container style={{ marginTop: '50px' }}  >



					<h2 className='text-center m-4'>Популярные проекты</h2>

					<Row xs={1} md={2} className='g-4'>
						{project.projects.all_projects.map(project => (
							<Col>
								<Link to={`/projects/${project.slug}`} className="text-decoration-none">

									<Card key={project.pk} className='border-0 rounded-3' style={{ backgroundColor: '#F5F5F5' }} >

										<div style={{ display: 'none' }}>{this.money = Math.round((project.collected_money / project.need_money) * 100)}</div>
										<Card.Img style={{ height: 200, objectFit: 'cover' }} variant='top' src={"https://avatars.mds.yandex.net/get-shedevrum/11465050/e5e1c85bbdd811ee91e4260d35446c60/orig"} />
										<Card.Body className='d-flex flex-column'>
											<Card.Title className='fs-1'>{project.name}</Card.Title>
											<div className='d-flex'>
												{project.category.map((category, index) => (
													<div className="badge bg-primary text-wrap ms-1 mb-1" style={{ width: "6rem" }} key={index}>{category}</div>
												))}
											</div>
											<Card.Text className='fs-5' style={{ height: '3em' }}>{project.small_description}</Card.Text>
											<div style={{ marginTop: 'auto' }}>
												<Card.Text>Собрано:</Card.Text>
												<ProgressBar bgcolor={"#0d6efd"} completed={this.money} completed_money={project.collected_money} need_money={project.need_money} />
												<div className='d-flex justify-content-between align-items-center'>
													<p className='aboutProject fs-4 mt-2'>Подробнее о проекте</p>
													<div className='d-flex me-2 my-auto'>
														<span className="material-symbols-outlined my-auto">
															visibility
														</span>
														<p className="d-flex align-items-center ms-1 align-middle my-auto fs-5">{project.views}</p>
													</div>

												</div>
											</div>



										</Card.Body>
									</Card>
								</Link>


							</Col>
						))}
					</Row>



				</Container>
			</>

		);
	}
}

export default Home;

