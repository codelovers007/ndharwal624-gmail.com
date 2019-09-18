import React, { Component } from 'react'
import { Table, Input } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import _  from "lodash";
import { starwarService } from '../services/starwar-service.js';

class Movies extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    let movies = JSON.parse(localStorage.getItem('movies')) || []
    movies =_.orderBy(movies, [( movie ) => { return movie.favourite===true }], ['desc']); 
    if (movies.length !== 0){
      this.setState({movies: movies})
    } else {
      starwarService.getMovies().then(response => {
        localStorage.setItem('movies', JSON.stringify(response.results));
        this.setState({movies: response.results})
      })
    }
  }

  searchMovies = (event, data) => {
    const value = data.value
    starwarService.searchMovies(value).then(response => {
      this.setState({movies: response.results})
    })
  }

  render() {
    return (
      <div>
        <h2>All Movies:</h2>
        <Input placeholder='Search Movies' onChange={this.searchMovies}/>
        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Released</Table.HeaderCell>
              <Table.HeaderCell>Directed by</Table.HeaderCell>
              <Table.HeaderCell>Produced by</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {
            this.state.movies.map((movie) => {
              return (
              <Table.Row key={movie.episode_id}>
                <Table.Cell><Link to={`/movies/${movie.episode_id}`}>{movie.title} (Episode {movie.episode_id})</Link></Table.Cell>
                <Table.Cell>{movie.release_date}</Table.Cell>
                <Table.Cell>{movie.director}</Table.Cell>
                <Table.Cell>{movie.producer}</Table.Cell>
              </Table.Row>)
            })
          }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export {Movies}
