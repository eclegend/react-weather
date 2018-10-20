import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import Toolbar from '@material-ui/core/Toolbar';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularIndeterminate from './components/CircularIndeterminate/CircularIndeterminate'
// import SearchInput from './components/SearchInput/SearchInput'

import './App.scss';
//https://material-ui.com/api/button/
const PLACES = [
  { name: 'Moscow' },
  { name: 'Gus-Khrustalny' },
  { name: 'London' },
  { name: 'New York' },
  { name: 'Berlin' },
  { name: 'San Jose' },
  // { name: 'Palo Alto', zip: '94303' },
  // { name: 'San Jose', zip: '94088' },
  // { name: 'Santa Cruz', zip: '95062' },
  // { name: 'Honolulu', zip: '96803' },
];

class WeatherDisplay extends Component {
  constructor () {
    super();
    this.state = {
      weatherData: null,
    };
  }

  componentDidMount () {
    //   const zip = this.props.zip;
    const name = this.props.name;
    const URL =
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      name +
      '&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial';
    fetch(URL).then((res) => res.json()).then((json) => {
      console.warn(json);
      this.setState({ weatherData: json });
    });
  }
  render () {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <CircularIndeterminate/>;
    // if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    return (
      <div>
        {/* <SearchInput/> */}
        <Toolbar>
          <Typography variant='h6' className='header'>
            {weather.main} in {weatherData.name}
          </Typography>
        </Toolbar>
        <Divider />

        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <p>Current:</p>
              </TableCell>
              <TableCell>
                <p>{parseInt((weatherData.main.temp - 32) * 5 / 9, 10)}°</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p>High:</p>
              </TableCell>
              <TableCell>
                <p>{parseInt((weatherData.main.temp_max - 32) * 5 / 9, 10)}°</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p>Low:</p>
              </TableCell>
              <TableCell>
                <p>{parseInt((weatherData.main.temp_min - 32) * 5 / 9, 10)}°</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p>Wind Speed:</p>
              </TableCell>
              <TableCell>
                <p>{weatherData.wind.speed} mi/hr</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  render () {
    const activePlace = this.state.activePlace;
    return (
      <div className='App'>
        <div className='Button-Container'>
          {PLACES.map((place, index) => (
            <Button
              size={'medium'}
              variant={'text'}
              key={index}
              onClick={() => {
                this.setState({ activePlace: index });
              }}
            >
              {place.name}
            </Button>
          ))}
        </div>
        <WeatherDisplay
          key={activePlace}
          name={PLACES[activePlace].name} /* zip={PLACES[activePlace].zip} */
        />
      </div>
    );
  }
}

export default App;
