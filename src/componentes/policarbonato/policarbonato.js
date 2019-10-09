import React, {useState} from 'react';
import Resultado from './resolve/resultado';
import Ajustes from './ajustes/ajustes';
import itens from './itens/itens';

export default function Policarbonato(props){

    const [largura, setLargura] = useState('');
    const [comprimento, setComprimento] = useState('');

    const [materiais, setMateriais] = useState(itens);

    const [modalShow, setModalShow] = useState(false);
    
    function inputChange(item, e){

        item === 'largura' ? setLargura(e.target.value) : setComprimento(e.target.value);
    }

    return(
        <div className="container-fluid">

            <div className="border rounded d-flex justify-content-around align-items-center p-3 shadow">

                <label className="text-muted">
                    Largura (em milímetro)
                    <input type="text" className="form-control "
                    placeholder={"Ex: 4000"} value={largura} onChange={inputChange.bind(this, "largura")} />
                </label>

                <label className="text-muted">
                    comprimento (em milímetro)
                    <input type="text" className="form-control " maxLength={4}
                    placeholder={"Ex: 2800 (maximo 6000)"} value={comprimento} onChange={inputChange.bind(this, "comprimento")} />
                </label>

                <div className="row p-3">
                    <button className="btn btn-info font-weight-bold col-12 mt-1"
                    onClick={(e)=> setModalShow(true)}
                    > AJUSTES </button>
                </div>
            </div>

            <Resultado itens={materiais} largura={largura} comprimento={comprimento} />

            <Ajustes setItens={(obj)=> setMateriais(obj)} itens={materiais} modalShow={modalShow} setModalShow={( )=> setModalShow(false)} />

        </div>
    )
}