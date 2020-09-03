import React, { Component } from 'react';
import { getAuth } from './utilities';
import './App.css';

class App extends Component {
  	constructor() {
		super();
		this.state = {
			input: '',
			type: 'album',
			results: [],
		}
	}

	handleSubmit = () => {
		const { input, type } = this.state;
		if (!input) return;
		getAuth().then((token) => {
			console.log(token)
			fetch(`https://api.spotify.com/v1/search?access_token=${token}&q=${input}&type=${type}&limit=10&market=US`)
			.then(res => res.json())
			.then(data => {
				console.log(data)
				const type = Object.keys(data)[0];
				this.setState({
					results: data[type].items,
				});
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
					const href = images.length ? images[0].url : 'https://via.placeholder.com/300/eee/eee';
					const artist = artists ? artists[0].name : null;
					const date = release_date ? `${release_date.split('-')[0]}` : null;
					return (
						<div className="result" key={key}>
							<img className="result-image" src={href} alt="" />
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
		const { results } = this.state;
		const resultsList = this.renderResults();
		const resultsContainerClass = results.length ? 'container' : 'container-hide';
		const searchContainerClass = results.length ? 'container' : 'container-ascend';
    	return (
			<div className="app">
				<div className={searchContainerClass}>
					<img className="logo" src="https://i.ibb.co/CJF0wnD/s.png" alt="" />
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
				<div className={resultsContainerClass}>
					<div className="subtitle">Results</div>
					<select className="sort" onChange={this.handleSort}>
						<option value='album'>Ascending</option>
						<option value='artist'>Descending</option>
					</select>
					{resultsList}
				</div>
			</div>
        );
    }
}

export default App;
