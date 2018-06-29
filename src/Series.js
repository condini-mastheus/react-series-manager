import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'

import api from './Api'

const statuses = {
  'watched': 'Assistida',
  'watching': 'Assistinto',
  'toWatch': 'Assistir'
}

class Series extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      series: []
    }

    this.renderSeries = this.renderSeries.bind(this)
    this.loadData = this.loadData.bind(this)
  }
  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.setState({
      isLoading: true
    })

    const genre = this.props.match.params.genre

    api.loadSeriesByGenre(genre).then(res => {
      this.setState({
        isLoading: false,
        series: res.data
      })
    }).catch(error => {
      console.log(error)
      console.log('n deu')
    })
  }

  deleteSeries(id) {
    api.deleteSeriesById(id).then(res => {
      this.loadData()
    }).catch(error => {
      console.log(error)
      console.log('n deu')
    })
  }
  renderSeries(serie) {
    return (
      <div key={serie.id} className='item col-xs-4 col-lg-4'>
        <div className='thumbnail'>
          <img className='group list-group-image' src='http://placehold.it/400x250/000/fff' alt='' />
          <div className='caption'>
            <h4 className='group inner list-group-item-heading'>{serie.name}</h4>
            <div className='row'>
              <div className='col-xs-12'>
                <p className='lead'>
                  {serie.genre} / &nbsp;
                  {
                    serie.status === 'toWatch' &&
                    <span className="label label-xs label-warning">{statuses[serie.status]}</span>
                  }
                  {
                    serie.status === 'watching' &&
                    <span className="label label-xs label-info">{statuses[serie.status]}</span>
                  }
                  {
                    serie.status === 'watched' &&
                    <span className="label label-xs label-success">{statuses[serie.status]}</span>
                  }
                  
                </p>
              </div>
              <div className='col-xs-12'>
                <div className="row">
                  <div className="col-xs-12 col-md-6">
                    <Link to={`/series/${serie.id}/edit`} className='btn btn-success' href=''>Editar</Link>
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <button className='btn btn-danger' onClick={() => this.deleteSeries(serie.id)} href=''>Excluir</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <section id='intro' className='intro-section'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <h1>Series {this.props.match.params.genre}</h1>

              <div id='series' className='row list-group'>
                { 
                  this.state.isLoading &&
                  <h3>Carregando...</h3>
                }
                {
                  !this.state.isLoading && this.state.series.length === 0 &&
                  <div className="alert alert-info">Nenhuma série cadastrada!</div>
                }
                {
                  !this.state.isLoading &&
                  this.state.series.map(serie => this.renderSeries(serie))
                }
              </div>
            
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Series