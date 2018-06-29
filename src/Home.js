import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'
import api from './Api'

class Home extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      genres: [],
      isLoading: false
    }
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    })
    api.loadGenres().then(res => {
      this.setState({
        genres: res.data,
        isLoading: false
      })
    })
  }
  renderGenre(genre) {
    return (
      <li key={genre}>
        <Link to={`/series/${genre}`}>{genre}</Link>
      </li>
    )
  }
  render() {
    return(
      <section id='intro' className='intro-section'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <h1><img src='images/logo.png' /></h1>
              <p>Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.</p>

              <ul className='genres'>
                {
                  this.state.isLoading &&
                  <li>Carregando...</li>
                }
                {
                  !this.state.isLoading &&
                  this.state.genres.map(genre => this.renderGenre(genre))
                }
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Home