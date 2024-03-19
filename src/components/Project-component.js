import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Col, Row } from 'react-bootstrap';
import ProgressBar from "../components/progress-bar.component.js";
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'
import "../css/home.css";


const PaginationComponent = () => {
	const [data, setData] = useState([]);
	const [nextPage, setNextPage] = useState(null);
	const [prevPage, setPrevPage] = useState(null);
	useEffect(() => {
		fetchData('http://localhost:8000/projects/all');
	}, []);

	const fetchData = (url) => {
		axios.get(url)
			.then(response => {
				setData(response.data.results);
				setNextPage(response.data.next);
				setPrevPage(response.data.previous);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
	};

	const handleNextPage = () => {
		if (nextPage) {
			fetchData(nextPage);
		}
	};
	const handlePrevPage = () => {
		if (prevPage) {
			fetchData(prevPage);
		}
	};

	return (
		<Container style={{ marginTop: '70px' }}>
			<h2 className='text-center m-4'>Все проекты</h2>

			<MDBPagination circle className='m-4' style={{ display: 'flex', justifyContent: 'space-between' }}>
				<MDBPaginationItem >
					<MDBPaginationLink href='#' tabIndex={-1} onClick={handlePrevPage}>
						Предыдущая
					</MDBPaginationLink>
				</MDBPaginationItem>


				<MDBPaginationItem onClick={handleNextPage}>
					<MDBPaginationLink href='#'>Следующая</MDBPaginationLink>
				</MDBPaginationItem>
			</MDBPagination>

			<Row xs={1} md={2} className='g-4'>
				{data.map(item => (
					<Col>
						<Link to={`/projects/${item.slug}`} className="text-decoration-none">
							<Card key={item.pk} className='border-0 rounded-3' style={{ backgroundColor: '#F5F5F5' }} >
								<Card.Img style={{ height: 200, objectFit: 'cover' }} variant='top' src={"https://avatars.mds.yandex.net/get-shedevrum/11465050/e5e1c85bbdd811ee91e4260d35446c60/orig"} />
								<Card.Body className='d-flex flex-column'>
									<Card.Title className='fs-1'>{item.name}</Card.Title>

									<div className='d-flex'>
										{item.category.map((category, index) => (
											<div className="badge bg-primary text-wrap ms-1 mb-1" style={{ width: "6rem" }} key={index}>{category}</div>
										))}
									</div>

									<Card.Text className='fs-5' style={{ height: '3em' }}>{item.small_description}</Card.Text>
									<div style={{ marginTop: 'auto' }}>
										<Card.Text>Собрано:</Card.Text>
										<ProgressBar bgcolor={"#0d6efd"} completed={Math.round((item.collected_money / item.need_money) * 100)} completed_money={item.collected_money} need_money={item.need_money} />
										<div className='d-flex justify-content-between align-items-center'>
											<p className='aboutProject fs-4 mt-2'>Подробнее о проекте</p>
											<div className='d-flex me-2 my-auto'>
												<span className="material-symbols-outlined my-auto">
													visibility
												</span>
												<p className="d-flex align-items-center ms-1 align-middle my-auto">{item.views}</p>
											</div>

										</div>

									</div>
								</Card.Body>
							</Card>
						</Link>

					</Col>


				))}
			</Row>


			<MDBPagination circle className='m-4' style={{ display: 'flex', justifyContent: 'space-between' }}>
				<MDBPaginationItem >
					<MDBPaginationLink href='#' tabIndex={-1} onClick={handlePrevPage}>
						Предыдущая
					</MDBPaginationLink>
				</MDBPaginationItem>


				<MDBPaginationItem onClick={handleNextPage}>
					<MDBPaginationLink href='#'>Следующая</MDBPaginationLink>
				</MDBPaginationItem>
			</MDBPagination>

		</Container>
	);
};

export default PaginationComponent;