import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Home from './componentes/home/Home';
import Tabela from './componentes/tabela/Tabelas';
import conferirMaterial from './componentes/conferirMaterial/conferirMaterial';
import juncaoCobranca from './componentes/juncao-cobranca/juncaoCobranca';
import Whatsapp from './componentes/whatsapp/whatsapp';
import policarbonato from './componentes/policarbonato/policarbonato';
import aproveitamentoPlaca from './componentes/aproveitamentoPlaca/aproveitamentoPlaca';

import './index.css';
import {BrowserRouter, Route,Switch} from 'react-router-dom';

ReactDOM.render((
        <BrowserRouter>
            <App>
                    <Switch>            
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/juncao-cobranca" component={juncaoCobranca}/>
                        <Route exact path="/tab-materiais" component={conferirMaterial}/>
                        <Route exact path="/tabela" component={Tabela}/>    
                        <Route exact path="/whatsapp" component={Whatsapp}/> 
                        <Route exact path="/calculo-policarbonato" component={policarbonato}/>                      
                        <Route exact path="/calculo-placa" component={aproveitamentoPlaca}/>                      
                    </Switch>            
            </App>
        </BrowserRouter>

), document.getElementById('root'));