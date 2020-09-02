import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import './App.css';

const clientId = '4e2a6912b9e045808dbca2542fdf923c';
const clientSecret = '63fd10cdcb314cacb362454eacd4b803';

class App extends Component {
  	constructor() {
		super();
		this.state = {
			input: '',
			token: '',
			type: 'album',
			results: [],
		}
	}

	componentDidMount = () => {
		this.getAuth();
	}

	getAuth = async () => {

		const headers = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
		  	},
		  	auth: {
				username: clientId,
				password: clientSecret,
		  	},
		};

		const data = {
			grant_type: 'client_credentials',
		};

		try {
			const response = await axios.post(
				'https://accounts.spotify.com/api/token',
				qs.stringify(data),
				headers
		  	);
		  	this.setState({ token: response.data.access_token });
		} catch (error) {
			console.log(error);
		}

	};

	handleSubmit = () => {
		const { input, token, type } = this.state;
		if (!input) return;
		fetch(`https://api.spotify.com/v1/search?access_token=${token}&q=${input}&type=${type}&limit=10&market=US`)
			.then(res => res.json())
			.then(data => {
				console.log(data[`${type}s`].items)
				this.setState({
					results: data[`${type}s`].items,
				});
			})
	}

	handleInput = (e) => {
		this.setState({
			input: e.target.value
		});
	}

	handleFilterType = (e) => {
		this.setState({
			type: e.target.value,
		});
	}

	handleSort = () => {
		const results = this.state.results.reverse();
		this.setState({ results });
	}

	renderResults = () => {
		const { results } = this.state;
		return (
			<div className="results">
				{results.map((result, key) => {
					const data = result.album ? result.album : result ;
					const { artists, images, name, release_date } = data;
					const href = images[0].url;
					const artist = artists ? artists[0].name : null;
					const date = release_date ? `${release_date.split('-')[0]}` : null;
					return (
						<div className="result" key={key}>
							<img className="result-image" src={href} />
							<div className="result-album">{name}</div>
							{artist ? <div className="result-artist">{artist}</div> : ''}
							{release_date ? <div className="result-date">{date}</div> : ''}
						</div>
					);
				})}
			</div>
		);
	}

  	render() {
		const { type } = this.state;
		const results = this.renderResults();
    	return (
			<div className="app">
				<div className="container-search">
					<div className="subtitle">Search</div>
					<input
						placeholder="Artists, Albums, Songs"
						className="search"
						onChange={this.handleInput}
						onKeyPress={this.handleKeyPress}
					/>
					<select className="filter" onChange={this.handleFilterType}>
						<option value='album'>Album</option>
						<option value='artist'>Artist</option>
						<option value='track'>Track</option>
					</select>
					<div className="submit" onClick={this.handleSubmit}>Search</div>
				</div>
				<div className="container-results">
					<div className="subtitle">Results</div>
					<select className="sort" onChange={this.handleSort}>
						<option value='album'>Ascending</option>
						<option value='artist'>Descending</option>
					</select>
					{results}
				</div>
			</div>
        );
    }
}

export default App;
