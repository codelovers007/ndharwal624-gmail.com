import React, { Component } from 'react'
import { Image, List, Table, Input } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import _  from "lodash";
import { starwarService } from '../services/starwar-service.js';

class Peoples extends Component {

  constructor(props) {
    super(props)
    this.state = {
      peoples: []
    }
  }

  componentDidMount() {
    let peoples = JSON.parse(localStorage.getItem('peoples')) || []
    peoples = _.orderBy(peoples, ['favourite'], ['desc'])
    if (peoples.length !== 0){
      this.setState({peoples: peoples})
    } else {
      starwarService.getPeoples().then(response => {
        localStorage.setItem('peoples', JSON.stringify(response.results));
        this.setState({peoples: response.results})
      })
    }
  }

  searchPeople = (event, data) => {
    const value = data.value
    starwarService.searchPeople(value).then(response => {
      this.setState({peoples: response.results})
    })
  }

  render() {
    return (
      <div>
        <h5>All Peoples:</h5>
        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Birth Year</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.HeaderCell>Height</Table.HeaderCell>
              <Table.HeaderCell>Hair color</Table.HeaderCell>
              <Table.HeaderCell>Skin color</Table.HeaderCell>
              <Table.HeaderCell>Eye color</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {
            this.state.peoples.map((people) => {
              return (
              <Table.Row key={people.name}>
                <Table.Cell><Link to='#'>{people.name}</Link></Table.Cell>
                <Table.Cell>{people.birth_year}</Table.Cell>
                <Table.Cell>{people.gender}</Table.Cell>
                <Table.Cell>{people.height}</Table.Cell>
                <Table.Cell>{people.hair_color}</Table.Cell>
                <Table.Cell>{people.skin_color}</Table.Cell>
                <Table.Cell>{people.eye_color}</Table.Cell>
              </Table.Row>)
            })
          }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export {Peoples}
