import React, { Component } from 'react'
import {Route, Link } from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import ProdutosNovo from './ProdutosNovo'
import Categoria from './Categoria'

class Produtos extends Component {
    state = {
        editingCategoria: ''
    }
    
    componentDidMount() {
        this.props.loadCategorias()
    }

    editCategoria = (categoria) => {
        this.setState({
            editingCategoria: categoria.id
        })    
    }
    cancelEditing = () => {
        this.setState({
            editingCategoria: ''
        })  
    }

    handleNewCategoria = (key) => {
        if(key.keyCode === 13){
            this.props.createCategoria({
                categoria: this.refs.categoria.value
            })
            this.refs.categoria.value = ''
        }
    }

    handleEditCategoria = (key) => {
        if(key.keyCode === 13){
            this.props.editCategoria({
                id: this.state.editingCategoria,
                categoria: this.refs['cat-'+this.state.editingCategoria].value
            })
            this.setState({
                editingCategoria: ''
            })
        }
    }

    renderCategoria = (cat) => {
        return (
            <li key={cat.id}>
                { this.state.editingCategoria === cat.id &&
                    <div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <input 
                                    type="text" 
                                    defaultValue={cat.categoria}
                                    className="form-control"
                                    onKeyUp={this.handleEditCategoria}
                                    ref={'cat-'+cat.id} 
                                    placeholder="Nova Categoria" 
                                />
                                <button className="btn btn-outline-secondary" type="button" onClick={this.cancelEditing}>cancel</button>
                            </div>
                        
                        </div>
                    </div>
                }
                { this.state.editingCategoria !== cat.id &&
                    <div>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => this.props.removeCategoria(cat)}>
                            <i className="fas fa-minus-circle"></i>
                        </button>
                        <button className="btn btn-outline-info btn-sm" onClick={() => this.editCategoria(cat)}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <Link to={`/produtos/categoria/${cat.id}`}>
                            {cat.categoria}
                        </Link>
                    </div>
                }
            </li>
        )
    }

    render(){
        const { match, categorias, produtos, loadCategoria, categoria, createProduto, removeProduto, loadProdutos } = this.props;
        
        return (
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul style={{listStyle: 'none', padding: 0 }}>
                        {categorias.map(this.renderCategoria)}
                    </ul>
                    <div className="card">
                        <input 
                            onKeyUp={this.handleNewCategoria}
                            type="text" 
                            ref="categoria" 
                            className="form-control"
                            placeholder="Nova Categoria" 
                        />
                    </div>
                    <Link to='/produtos/novo'>Novo Produto</Link>
                </div>
                <div className='col-md-10'>
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={match.url+'/novo'} render={(props) => {
                        return <ProdutosNovo {...props} 
                            categorias={categorias}
                            createProduto={createProduto}    
                        />} 
                    }/>
                    <Route path={match.url+'/categoria/:catId'} 
                        render={(props) => (
                            <Categoria {...props} 
                                loadCategoria={loadCategoria}
                                categoria={categoria}
                                loadProdutos={loadProdutos} 
                                produtos={produtos}
                                removeProduto={removeProduto}
                            />
                        )} />
                </div>
            </div>

        )
    }
}

export default Produtos;