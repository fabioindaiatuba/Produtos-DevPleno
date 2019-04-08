import React, {Component} from 'react';

import axios from 'axios';

class Categoria extends Component {
    constructor(props) {
        super(props)
        this.state = {
            produtos: [], 
            categorias: []
        }
    }

    componentDidMount() {
        const id = this.props.match.params.catId
        this.loadData(id)
    }
    componentWillReceiveProps(newProps) {
        const id = newProps.match.params.catId
        this.loadData(id)
    }

    loadData = (id) => {
        axios
            .get('http://localhost:3001/produtos?categoria='+id)
            .then(res => {
                this.setState({
                    produtos: res.data
                })
            })
        axios
            .get('http://localhost:3001/categorias/'+id)
            .then(res => {
                this.setState({
                    categorias: res.data
                })
            })
    }
    
    renderProduto(produto) {
        return (
            <p className="card card-body" key={produto.id} >{produto.produto}</p>
        )
    }

    render() {
        return (
            <div>
                <h1>{this.state.categorias.categoria} </h1>
                {this.state.produtos.map(this.renderProduto)}
            </div>
        )
    }
}

export default Categoria