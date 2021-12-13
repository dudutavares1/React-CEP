import React, { Component } from 'react'
import "./index";
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      result: null,
      inputDoCep: '',
    }

    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  fetchSearchTopStories(inputDoCep) {
    fetch(`https://viacep.com.br/ws/${inputDoCep}/json/`)
      .then(res => res.json())
      .then(result => this.setState({ result }))
      .catch(err => err);
  }

  onSearchChange(e) {
    this.setState({ inputDoCep: e.target.value });
  }

  onSearchSubmit(e) {
    const { inputDoCep } = this.state;

    this.fetchSearchTopStories(inputDoCep)

    e.preventDefault()
  }

  componentDidMount() {
    const { inputDoCep } = this.state;

    this.fetchSearchTopStories(inputDoCep)
  }

  render() {

    const { result, inputDoCep } = this.state

    return (
      <section className="">

        <img src="https://newordereditora.com.br/wp-content/uploads/2017/02/frete.png" alt="Imagem do Banner" className="banner" />


        <h2>Consulte o cep desejado</h2>
        <h4 className="merchan">Se desejar, baixe nosso APP no botão localizado logo abaixo:</h4>
        <form onSubmit={this.onSearchSubmit}>
          <button class="botao-baixar">Baixar App</button>
          <input className="resultado" type='text' value={inputDoCep} maxlength="8" onChange={this.onSearchChange} />
          <button type='submit'>Enviar</button>
        </form>
        {result ?
          <div>
            <div className="conteudo">
              <span key={result.cep}>
                <p>{result.logradouro}: (Rua)</p>
                <p>{result.bairro}: (Bairro)</p>
                <p>{result.localidade}:(Cidade)</p>
                <p>{result.uf} (Estado)</p>
                <h4>Grato por utilizar nosso serviço!</h4>
              </span>
            </div>
          </div>
          : null}
      </section>
    );
  }
}
export default App;
