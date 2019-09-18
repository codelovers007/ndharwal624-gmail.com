import React, { Component } from 'react'
import { Popup, List } from 'semantic-ui-react';
import { starwarService } from '../services/starwar-service.js';

class ToolTip extends Component {
  _isMounted = false;

  constructor(props) {
    super(props)
    this.state = {
      peopleUrl: props.peopleUrl,
      people: {}
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    starwarService.getPeopleDetail(this.state.peopleUrl).then(response => {
       if (this._isMounted) {
        this.setState({people: response})
      }
    })
  }

  render() {
    let params = this.state
    return (
      <div>
      { params.people ? 
        <div>
          <Popup.Content>
              <List divided className="tooltip-list">
              <List.Item>
                <List.Content>
                  <List.Header>Name:</List.Header>
                  {params.people.name}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Height: </List.Header>
                  {params.people.height}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Mass:</List.Header>
                  {params.people.mass}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Hair Color:</List.Header>
                  {params.people.hair_color}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Skin Color:</List.Header>
                  {params.people.skin_color}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Eye Color:</List.Header>
                  {params.people.eye_color}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Birth Year:</List.Header>
                  {params.people.birth_year}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Gender:</List.Header>
                  {params.people.gender}
                </List.Content>
              </List.Item>
            </List>
        </Popup.Content> </div> 
      : null }
      </div>
    )
  }
}

export {ToolTip}

