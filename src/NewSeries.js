import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'

const statuses = {
  'watched': 'Assistida',
  'watching': 'Assistinto',
  'toWatch': 'Assistir'
}

class NewSeries extends Component {
  constructor(props) {
    super(props)

    this.state = {
      genres: [],
      isLoading: false,
      redirect: false
    }

    this.saveSeries = this.saveSeries.bind(this)
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
  saveSeries(event) {
    event.preventDefault()
    const newSeries = {
      name: this.refs.name.value,
      genre: this.refs.genre.value,
      status: this.refs.status.value,
      comment: this.refs.comment.value
    }    
    
    api.saveSeries(newSeries).then(res => {
      this.setState({
        redirect: `/series/${newSeries.genre}`
      })
    }).catch(error => {
      console.log(error)
      console.log('n deu')
    })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} /> 
    }

    return (
      <section id='intro' className='intro-section'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <h1>Nova série</h1>

              <form>
                  <div className='form-group'>
                    <label forhtml=''>Nome</label>
                  <input ref='name' type='text' className='form-control' />
                  </div>
                  <div className='form-group'>
                    <label forhtml=''>Gênero</label>
                    <select ref='genre' className='form-control'>
                    <option defaultValue='' disabled>Selecione</option>
                    { 
                      this.state.genres.map(genre => {
                        return <option key={genre} value={genre}>{genre}</option>
                      }) 
                    }
                    </select>
                  </div>
                  <div className='form-group'>
                    <label forhtml=''>Status</label>
                    <select ref='status' className='form-control'>
                      <option defaultValue='' disabled>Selecione</option>
                      {
                        Object.keys(statuses).map(key => {
                          return <option key={key} value={key}>{statuses[key]}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className='form-group'>
                    <label forhtml=''>Comentários</label>
                    <textarea ref='comment' className='form-control' rows='4'></textarea>
                  </div>
                  <button type='submit' onClick={(event) => this.saveSeries(event)} className='btn btn-block btn-primary'>Salvar</button>
                </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default NewSeries