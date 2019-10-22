import React, { useState } from 'react';

import { somenteNumero, virgulaParaPonto } from '../helper/inputText';
import Resolve from './resolve/resolve';
// import { Container } from './styles';

export default function AproveitamentoPlaca() {

    document.title = 'CALCULO DE APROVEITAMENTO';

    // L = largura / C = comprimento
    const [placaL, setPlacaL] = useState('');
    const [placaC, setPlacaC] = useState('');
    const [placaPreco, setPlacaPreco] = useState('');

    const [pedacoL, setPedacoL] = useState('');
    const [pedacoC, setPedacoC] = useState('');
    const [quantidade, setQuantidade] = useState('');

    const [go, setGo] = useState(false);

    return (
        <div className="container-fluid">

            <div className="border rounded d-flex flex-column justify-content-around align-items-center p-3 shadow m-3">

                <div className="text-center col-12 mb-4 border-bottom">
                    <h3>Informações da placa</h3>
                </div>

                <div className="d-flex align-items-center justify-content-around col-12 ">

                    <label className="text-muted">
                        Largura (milímetro)
                    <input type="text" className="form-control"
                            value={placaL}
                            onChangeCapture={(e) => somenteNumero(e)}
                            onChange={(e) => setPlacaL(e.target.value)} />
                    </label>

                    <label className="text-muted">
                        comprimento (milímetro)
                    <input type="text" className="form-control"
                            value={placaC}
                            onChangeCapture={(e) => somenteNumero(e)}
                            onChange={(e) => setPlacaC(e.target.value)} />
                    </label>

                    <label className="text-muted">
                        Valor da placa
                    <input type="text" className="form-control"
                            value={placaPreco}
                            onChangeCapture={(e) => { virgulaParaPonto(e); somenteNumero(e) }}
                            onChange={(e) => setPlacaPreco(e.target.value)} />
                    </label>

                    <div className="row p-3">
                        <button className="btn btn-info font-weight-bold col-12 mt-1"> AJUSTES </button>
                    </div>

                </div>

            </div>

            <div className="border rounded d-flex flex-column justify-content-around align-items-center p-3 shadow m-3">

                <div className="text-center col-12 mb-4 border-bottom">
                    <h3>Informações do pedaço</h3>
                </div>


                <div className="d-flex align-items-center justify-content-around col-12 ">

                    <label className="text-muted">
                        Largura (milímetro)
                    <input type="text" className="form-control"
                            value={pedacoL}
                            onChangeCapture={(e) => somenteNumero(e)}
                            onChange={(e) => setPedacoL(e.target.value)} />
                    </label>

                    <label className="text-muted">
                        comprimento (milímetro)
                    <input type="text" className="form-control"
                            value={pedacoC}
                            onChangeCapture={(e) => somenteNumero(e)}
                            onChange={(e) => setPedacoC(e.target.value)} />
                    </label>

                    <label className="text-muted">
                        Quantidade necessária
                    <input type="text" className="form-control"
                            value={quantidade}
                            onChangeCapture={(e) => somenteNumero(e)}
                            onChange={(e) => setQuantidade(e.target.value)} />
                    </label>

                    <div className="row p-3">
                        <button className="btn btn-info font-weight-bold col-12 mt-1"> AJUSTES </button>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-info font-weight-bold col-4 mb-5" onClick={()=> setGo(!go) }>
                    Resultado
                </button>
            </div>

            <Resolve
                placaL={placaL}
                placaC={placaC}
                placaPreco={placaPreco}
                pedacoL={pedacoL}
                pedacoC={pedacoC}
                quantidade={quantidade}
                go={go}
            />

        </div>
    );

}
