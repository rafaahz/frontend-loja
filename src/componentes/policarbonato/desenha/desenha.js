
import React, {useState, useEffect} from 'react';
import Fade from 'react-bootstrap/Fade'

export default function Desenha(props) {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
                setOpen(true)
        }, 200);
    }, [])

    return (

        <Fade in={open}>
        <div className={"col-11 ml-auto mr-auto mt-5 row"}>
            {props.array.map((obj, i) => {
                var color;
                var bg;
                switch (i+1) {
                    case 1:
                        color = "text-success";
                        bg = "rgba(40,167,69,.4)";
                        break;

                    case 2:
                        color = "text-warning";
                        bg = "rgba(255,193,7,.4)";
                        break;

                    case 3:
                        color = "text-danger";
                        bg = "rgba(220,53,69,.4)";
                        break;
                    default:
                        color = "text-danger";
                        bg = "rgba(220,53,69,.4)";
                }

                return (
                    <div className={"col-12 shadow m-2 p-2"} key={i}>

                        <table className="table table-striped mb-3 border-bottom">
                            <thead>
                                <tr style={{background: bg}}>
                                    <th scope="col" className={color}>#</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Quantidade</th>
                                    <th scope="col">Valor Unitario</th>
                                    <th scope="col">Valor Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{obj.placas.txt}</td>
                                    <td>{obj.placas.qnt}</td>
                                    <td>{obj.placas.precoUnitario.toFixed(2)}</td>
                                    <td>{obj.placas.preco.toFixed(2)}</td>
                                </tr>
                                
                                {obj.subPlaca.qnt !== 0 ? 
                                <tr>
                                    <th scope="row">2</th>
                                    <td>{obj.subPlaca.txt}</td>
                                    <td>{obj.subPlaca.qnt}</td>
                                    <td>{obj.subPlaca.precoUnitario.toFixed(2)}</td>
                                    <td >{obj.subPlaca.preco.toFixed(2)}</td>
                                </tr> : null
                                }

                                <tr>
                                    <th scope="row">3</th>
                                    <td>{obj.emenda.txt}</td>
                                    <td>{obj.emenda.qnt}</td>
                                    <td>{obj.emenda.precoUnitario.toFixed(2)}</td>
                                    <td>{obj.emenda.preco.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>{obj.perfilU.txt}</td>
                                    <td>{obj.perfilU.qnt}</td>
                                    <td>{obj.perfilU.precoUnitario.toFixed(2)}</td>
                                    <td>{obj.perfilU.preco.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td>{obj.fitaAluminio.txt}</td>
                                    <td>{obj.fitaAluminio.qnt}</td>
                                    <td>{obj.fitaAluminio.precoUnitario.toFixed(2)}</td>
                                    <td>{obj.fitaAluminio.preco.toFixed(2)}</td>
                                </tr>
                                <tr style={{ fontWeight: 'bold' }} className={color}>
                                    <th scope="row">6</th>
                                    <td colSpan={3}>VALOR TOTAL</td>
                                    <td>{obj.preco()}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div style={{width: "95%", height: "350px",margin: "auto"}} className="border border-secondary row" >
                            {obj.calculo().map( (item, i)=>{
                                let total = obj.calculo().reduce( (a,b)=> parseFloat(a)+parseFloat(b) );
                                return(
                                    <div key={i} style={ {width: `${((item*100)/total)}%` } } className="d-flex align-items-center justify-content-center border border-secondary"> 
                                        <div className="d-flex flex-column text-center">
                                            <span>{item} mm</span>
                                            <span>x</span>
                                            <span>{props.comprimento} mm</span>
                                        </div>
                                    </div>
                                )
                            } )}
                        </div>

                    </div>
                )
            })}
        </div>
        </Fade>
    )
}