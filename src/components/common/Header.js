import React from 'react'
import { Menu, Header, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";
// import { userService } from '../../services/user.service.js';

class HeaderPage extends React.Component {
  constructor(props) {
     super(props);
     this.state = { activeItem: 'movies' }
  }

  handleItemClick = (e, { name }) => {this.setState({ activeItem: name}) }

  render() {
    const { activeItem } = this.state
    return (
      <Segment clearing inverted>
        <Header as={Menu} floated='left' inverted>
          <Menu.Item><h5>STAR-WAR</h5></Menu.Item>
        </Header>
        <Header as={Menu} floated='right' inverted >
          <Menu.Item as={Link} to="/" name='movies' active={activeItem === 'movies'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to="people" name='people' active={activeItem === 'people'} onClick={this.handleItemClick} />
        </Header>
      </Segment>
    );
  }
}

export { HeaderPage };