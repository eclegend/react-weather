import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import Toolbar from '@material-ui/core/Toolbar';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import './App.scss';
//https://material-ui.com/api/button/
const PLACES = [
  { name: 'Palo Alto', zip: '94303' },
  { name: 'San Jose', zip: '94088' },
  { name: 'Santa Cruz', zip: '95062' },
  { name: 'Honolulu', zip: '96803' },
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL =
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      zip +
      '&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial';
    fetch(URL).then((res) => res.json()).then((json) => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = 'http://openweathermap.org/img/w/' + weather.icon + '.png';
    return (
      <div>
        {/* <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1> */}
        <Toolbar>
        <Typography variant="h6">
          {weather.main} in {weatherData.name}
          </Typography>
          </Toolbar>
        <Table>
        
          <TableBody>
            <TableRow>
              <TableCell>
                <p>Current:</p>
              </TableCell>
              <TableCell>
                <p>{weatherData.main.temp}°</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p>High:</p>
              </TableCell>
              <TableCell>
                <p>{weatherData.main.temp_max}°</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p>Low:</p>
              </TableCell>
              <TableCell>
                <p>{weatherData.main.temp_min}°</p>
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
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className='App'>
      <div className='Button-Container'>
        {PLACES.map((place, index) => (
          <Button
            size={"medium"}
            variant={'flat'}
            key={index}
            onClick={() => {
              this.setState({ activePlace: index });
            }}
          >
            {place.name}
          </Button>
        ))}
        </div>
        <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
      </div>
    );
  }
}

export default App;
