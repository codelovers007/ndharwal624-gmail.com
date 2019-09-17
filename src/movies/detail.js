import React, { Component } from 'react'
import { Item, Button, Image, List } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import _  from "lodash";
import { starwarService } from '../services/starwar-service.js';

import { toast } from 'react-toastify';
toast.configure()

class Movie extends Component {

  constructor(props) {
    super(props)
    let movies = JSON.parse(localStorage.getItem('movies')) || []
    this.state = {
      movies: movies,
      movie: {},
      movie_id: this.props.match.params.movieId
    }
  }

  componentDidMount() {
    let movieData = _.find(this.state.movies, movie => {
      return movie.episode_id === Number(this.state.movie_id)
    })
    if (movieData){
      this.setState({movie: movieData})
    }
  }

  addToFavourite = () => {
    let movies = _.map(this.state.movies, movie => {
      if (movie.episode_id === Number(this.state.movie_id)) {
        movie = Object.assign(movie, {favourite: true})
        this.setState({movie: movie})
      }
      return movie
    })
    toast.success("Successfully added to favourite")
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  unFavourite = () => {
    let movies = _.map(this.state.movies, movie => {
      if (movie.episode_id === Number(this.state.movie_id)) {
        movie = Object.assign(movie, {favourite: false})
        this.setState({movie: movie})
      }
      return movie
    })
    toast.success("Successfully added to Unfavourite")
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  render() {
    let params = this.state
    return (
      <div>
        {
          params.movie.favourite ? 
          <Button size='medium' floated={'left'} onClick={this.unFavourite}>Unfavourite</Button>
          : 
          <Button size='medium' floated={'left'} onClick={this.addToFavourite}>Add to favourite</Button>
        }
        <Button floated={'right'}><Link to='/'>Back</Link></Button>
        <h5>{params.movie.title}</h5>
        <Item>
          <Item.Content>
            <Item.Meta><b>Description:</b></Item.Meta>
            <Item.Description>
              {params.movie.opening_crawl}
            </Item.Description>
            <Item.Extra>
              <b>Released:</b> {params.movie.release_date}<br/>
              <b>Directed by:</b> {params.movie.director}<br/>
              <b>Produced by:</b> {params.movie.producer}
            </Item.Extra>
          </Item.Content>
        </Item>
      </div>
    )
  }
}

export {Movie}
