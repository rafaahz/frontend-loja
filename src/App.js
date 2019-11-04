import React, { Component } from 'react';

import { GoHome, GoTasklist } from 'react-icons/go';
import { MdMonetizationOn } from 'react-icons/md'
import { FaWhatsapp, FaBars, FaCalculator } from 'react-icons/fa';
import { FaBus } from 'react-icons/fa'

import { Button, Collapse} from 'react-bootstrap';

import './css/bootstrap.min.css';
import { Link } from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true
    };

  }


  render() {
    return (
      <>
        <div className="container-fluid">

          <div id="loading" className="d-flex justify-content-center"
            style={{
              visibility: "hidden", width: "100%", height: "100%",
              position: "fixed", alignItems: "center", zIndex: 2, background: "#000000ab",
              top: 0, left: 0
            }}>
              
            <div className="spinner-border text-primary" style={{ height: "5rem", width: "5rem" }}></div>
          </div>

          <div className="row" style={{ height: "-webkit-fill-available" }}>

            <nav className="col-md-2 bg-dark align-items-start justify-content-center">

              <Button
                onClick={() => this.setState({open: !this.state.open })}
                aria-controls="navbar"
                aria-expanded={this.state.open}
                variant="dark"
                size="lg" block
              >
                <FaBars />
              </Button>

              <Collapse in={this.state.open}>
                <div id="navbar">

                  <ul className="navbar-nav mr-auto flex-column">

                    <li className="nav-item text-left mt-4 mb-2">

                      <Link to="/" className="text-light text-decoration-none mt-2 font-weight-bold">
                        <div className="d-flex justify-content-between text-right align-items-center border-bottom underline pb-2">
                          <span className="text-light pr-2"><GoHome /></span>
                          <span>Home</span>
                        </div>
                      </Link>
                    </li>

                    <li className="nav-item text-left mt-2 mb-2">
                      <Link to="/tabela" className="text-light text-decoration-none mt-2 font-weight-bold">
                        <div className="d-flex justify-content-between text-right align-items-center border-bottom underline pb-2">
                          <span className="text-light pr-2"><FaBus /></span>
                          <span>Tabela Cidades Transportadoras</span>
                        </div>
                      </Link>
                    </li>

                    <li className="nav-item text-left mt-2 mb-2">
                      <Link to="/tab-materiais" className="text-light text-decoration-none mt-2 font-weight-bold">
                        <div className="d-flex justify-content-between text-right align-items-center border-bottom underline pb-2">
                          <span className="text-light pr-2"><GoTasklist /></span>
                          <span>Tabela materiais</span>
                        </div>
                      </Link>
                    </li>

                    <li className="nav-item text-left mt-2 mb-2">
                      <Link to="/juncao-cobranca" className="text-light text-decoration-none mt-2 font-weight-bold">
                        <div className="d-flex justify-content-between text-right align-items-center border-bottom underline pb-2">
                          <span className="text-light pr-2"><MdMonetizationOn /></span>
                          <span>Junção de cobrança</span>
                        </div>
                      </Link>
                    </li>

                    <li className="nav-item text-left mt-2 mb-2">
                      <Link to="/whatsapp" className="text-light text-decoration-none mt-2 font-weight-bold">
                        <div className="d-flex justify-content-between text-right align-items-center border-bottom underline pb-2">
                          <span className="text-light pr-2"><FaWhatsapp /></span>
                          <span>WhatsApp</span>
                        </div>
                      </Link>
                    </li>

                    <li className="nav-item text-left mt-2 mb-2">
                      <Link to="/calculo-policarbonato" className="text-light text-decoration-none mt-2 font-weight-bold">
                        <div className="d-flex justify-content-between text-right align-items-center border-bottom underline pb-2">
                          <span className="text-light pr-2"><FaCalculator /></span>
                          <span>Calculo Policarbonato</span>
                        </div>
                      </Link>
                    </li>

                    <li className="nav-item text-left mt-2 mb-2">
                      <Link to="/calculo-placa" className="text-light text-decoration-none mt-2 font-weight-bold">
                        <div className="d-flex justify-content-between text-right align-items-center border-bottom underline pb-2">
                          <span className="text-light pr-2"><FaCalculator /></span>
                          <span>Aproveitamento de placa</span>
                        </div>
                      </Link>
                    </li>

                  </ul>
                </div>
              </Collapse>

            </nav>

            <main role="main" className="ml-auto mr-auto mt-1 col-md-10 col-lg-10 col-sm-12 p-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                {this.props.children}
              </div>
            </main>

          </div>
        </div>
      </>
    );
  }

}

export default App;