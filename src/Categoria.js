import React, {Component} from 'react';

class Categoria extends Component {
    constructor(props) {
        super(props)
        this.state = {
            produtos: [], 
            categoria: {},
            id: null
        }
    }

    componentDidMount() {
        const id = this.props.match.params.catId
        this.loadData(id)
    }
    componentWillReceiveProps(newProps) {
        const id = newProps.match.params.catId
        if(id !== this.state.id)
            this.loadData(id)
    }

    loadData = (id) => {
        this.setState({ id })
        this.props.loadProdutos(id)
        this.props.loadCategoria(id)
    }
    
    renderProduto(produto) {
        return (
            <div className="card card-body"  key={produto.id}>
                <div className="card-link"> 
                    <p>
                        {produto.produto}
                    </p>
                    <button className="btn btn-outline-danger btn-sm" 
                        onClick={() => this.props.removeProduto(produto).then(res=> this.loadData(this.props.match.params.catId))}
                    
                    >
                        <i className="fas fa-minus-circle"></i>
                    </button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h1>{this.props.categoria.categoria} </h1>
                {this.props.produtos.length === 0 && 
                    <p className="alert alert-danger">Nenhum produto.</p>
                }
                {this.props.produtos.map((produto) => this.renderProduto(produto))}
            </div>
        )
    }
}

export default Categoria