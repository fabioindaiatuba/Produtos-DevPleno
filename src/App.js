import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './Home'
import Sobre from './Sobre'
import Produtos from './Produtos'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categorias: [],
      produtos: [],
      categoria: {}
    }
  }
  
  loadCategorias = () => {
    this.props.api.loadCategorias().then(res => {
            this.setState({
                categorias: res.data
            })
        })
  }

  removeCategoria = (categoria) => {
    this.props.api.deleteCategoria(categoria.id).then(res => {
      this.loadCategorias()
    })
  }

  createCategoria = (categoria) => {
    this.props.api.createCategoria(categoria).then(res => {
      this.loadCategorias()
    })
  }

  editCategoria = (categoria) => {
    this.props.api.editCategoria(categoria).then(res => {
      this.loadCategorias()
    })
  }

  loadCategoria = (categoria) => {
    return this.props.api.readCategoria(categoria).then(res => {
      this.setState({
          categoria: res.data
      })
    })
  }

  createProduto = (produto) => {
    return this.props.api.createProduto(produto)
  }

  removeProduto = (produto) => {
    return this.props.api.deleteProduto(produto.id)
  }

  loadProdutos = (categoria) => {
    this.props.api.loadProdutos(categoria).then(res => {
      this.setState({
          produtos: res.data
      })
    })
  }

  readProduto = (id) => {
    return this.props.api.readProduto(id)
  }
  
  editProduto = (produto) => {
    return this.props.api.editProduto(produto)
  }

  render() {
    return (
      <Router>
      
        <div>
          <nav className='navbar navbar-expand navbar-dark bg-dark'>
            <div className='container'>
              <div className='navbar-header'>
                <Link to='/' className='navbar-brand'>Gerenciador de Produtos</Link>
              </div>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                  <li className='nav-item'><Link to='/' className="nav-link" >Home</Link></li>
                  <li className='nav-item'><Link to='/produtos' className="nav-link" >Produtos</Link></li>
                  <li className='nav-item'><Link to='/sobre' className="nav-link">Sobre</Link></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route exact path='/sobre' component={Sobre} />
            <Route path='/produtos' render={(props) => {
              return (<Produtos 
                {...props} 
                categorias={this.state.categorias}
                loadCategorias={this.loadCategorias} 
                removeCategoria={this.removeCategoria}
                createCategoria={this.createCategoria}
                editCategoria={this.editCategoria}

                loadCategoria={this.loadCategoria}
                categoria={this.state.categoria}
                
                readProduto={this.readProduto}
                loadProdutos={this.loadProdutos}
                createProduto={this.createProduto}
                removeProduto={this.removeProduto}
                editProduto={this.editProduto}
                produtos={this.state.produtos}
                /> 
              )}} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
