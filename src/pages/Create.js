import React, { Component } from 'react'
import { Container, Row, Col, InputGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


export default class Registration extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			small_description: '',
			description: '',
			need_money: '',
			collected_money: '',
			start_date: '',
			end_date: '',
			category: [1,2],
			image: '',
			info_cat: null
		};
	}

	componentDidMount() {
		if (!localStorage.getItem('accessToken')) {
			window.location.href = `/login`;
		}
		fetch('http://localhost:8000/') // замените на URL вашего DRF API и ID проекта
			.then(response => response.json())
			.then(data => this.setState({ info_cat: data }));
	}
	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	handleSubmit = event => {
		event.preventDefault();
		const accessToken = localStorage.getItem('accessToken');
		const { name, small_description, description, need_money, collected_money, start_date, end_date, category, image } = this.state;
		fetch('http://localhost:8000/projects/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
				'Authorization': 'Bearer ' + accessToken
			},
			body: JSON.stringify({
				name,
				small_description,
				description,
				need_money,
				collected_money,
				start_date,
				end_date,
				category,
				image
			})
		})
			.then(response => response.json())
			.then(data => { console.log(data); this.setState({ errorMessage: data }); })

			.catch(error => {

				console.error(error);
			})
	};
	render() {

		return (
			<Container style={{ marginTop: '60px' }}>

				<Row xs={1} md={2} className='g-4'>
					<Col>
						<h1 style={{ marginBottom: '0.5em', fontWeight: 'bold', fontSize: '55px' }}>
							Создание проекта
						</h1>




						<Form onSubmit={this.handleSubmit}>
							<Form.Group className="mb-3" >
								<Form.Label>Название проекта</Form.Label>
								<Form.Control name="name" value={this.state.name} onChange={this.handleChange} type="text" placeholder="Введите название" />
								{this.state.errorMessage && <Form.Text className="text-danger"> {this.state.errorMessage.name} </Form.Text>}
								<div style={{ display: 'block' }}>
									<Form.Text className="text-muted">
										*название вашего проекта
									</Form.Text>
								</div>
							</Form.Group>

							<Form.Group className="mb-3" >
								<Form.Label>Короткое описание проекта</Form.Label>
								<Form.Control name="small_description" value={this.state.small_description} onChange={this.handleChange} as="textarea" placeholder="Введите короткое описание" />
								{this.state.errorMessage && <Form.Text className="text-danger"> {this.state.errorMessage.small_description} </Form.Text>}
								<div style={{ display: 'block' }}>
									<Form.Text className="text-muted">
										*это описание увидят пользователи на карточке вашего проекта
									</Form.Text>
								</div>
							</Form.Group>

							<Form.Group className="mb-3" >
								<Form.Label>Полное описание проекта</Form.Label>
								<Form.Control rows={5} name="description" value={this.state.description} onChange={this.handleChange} as="textarea" placeholder="Введите полное описание проекта" />
								{this.state.errorMessage && <Form.Text className="text-danger"> {this.state.errorMessage.description} </Form.Text>}
							</Form.Group>

							<Form.Group className="mb-3" >
								<Form.Label>Необходимое количество средств</Form.Label>
								<InputGroup className="mb-3">
									<Form.Control name="need_money" value={this.state.need_money} onChange={this.handleChange} type="number" placeholder="Надо денег" />
									<InputGroup.Text>₽</InputGroup.Text>
									{this.state.errorMessage && <Form.Text className="text-danger"> {this.state.errorMessage.need_money} </Form.Text>}
									
								</InputGroup>
							</Form.Group>

							<Form.Group className="mb-3" >
								<Form.Label>Уже собранное количество средств</Form.Label>
								<InputGroup className="mb-3">
									<Form.Control name="collected_money" value={this.state.collected_money} onChange={this.handleChange} type="number" placeholder="Не надо денег" />
									<InputGroup.Text>₽</InputGroup.Text>
									{this.state.errorMessage && <Form.Text className="text-danger"> {this.state.errorMessage.collected_money} </Form.Text>}
								
								</InputGroup>
							</Form.Group>

							<Form.Group className="mb-3" >
								<Form.Label>Дата начала реализации проектаа</Form.Label>
								<Form.Control name="start_date" value={this.state.start_date} onChange={this.handleChange} type="date" placeholder="Дата начала реализации проекта" />
								{this.state.errorMessage && <Form.Text className="text-danger"> {this.state.errorMessage.start_date} </Form.Text>}
							</Form.Group>

							<Form.Group className="mb-3" >
								<Form.Label>Дата конца реализации проекта</Form.Label>
								<Form.Control name="end_date" value={this.state.end_date} onChange={this.handleChange} type="date" placeholder="Дата конца реализации проекта" />
								{this.state.errorMessage && <Form.Text className="text-danger"> {this.state.errorMessage.end_date} </Form.Text>}
							</Form.Group>

							{/* <Form.Group className="mb-3" >
								<Form.Label>Выберите категории</Form.Label>
								<Form.Control name="category" value={this.state.end_date} onChange={this.handleChange} type="date" placeholder="Дата конца реализации проекта" />
								{this.state.errorMessage && <Form.Text className="text-danger"> {this.state.errorMessage.category} </Form.Text>}
							</Form.Group> */}

								<Form.Group className="mb-3" >
									<Form.Label>Фотография для карточки вашего проекта</Form.Label>
									<Form.Control accept="image/jpeg,image/png,image/gif" name="image" value={this.state.image} onChange={this.handleChange} type="file" placeholder="Дата конца реализации проекта" />
									{this.state.errorMessage && <Form.Text className="text-danger"> {this.state.errorMessage.image} </Form.Text>}
								</Form.Group>
								{console.log(this.state.image)}
							<Form.Group className="mb-3" controlId="formBasicCheckbox" style={{ display: 'flex' }}>
								<Form.Check type="checkbox" style={{ marginRight: '1em' }} />
								<Form.Label>Нажимая на кнопку «Создать, я соглашаюсь с <a href="https://vk.com/lastimperatorr">политикой по обработке персональных данных</a></Form.Label>
							</Form.Group>

							<Button variant="primary" type="submit">
								Создать
							</Button>

						</Form>
					</Col>


				</Row>

			</Container>
		)
	}
}
