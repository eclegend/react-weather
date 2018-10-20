
import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    console.warn(this.state.value)
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <Input type="text" value={this.state.value} onChange={this.handleChange} placeholder='City'/>
        </label>
        <Button type="submit" value="Submit" size={"medium"}
            variant={'flat'}>GO</Button>
      </form>
    );
  }
}

export default SearchInput;