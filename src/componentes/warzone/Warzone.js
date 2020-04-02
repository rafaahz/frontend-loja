import React, {useState, useEffect} from 'react';

export default function Warzone() {

    document.title = "WARZONE";
    const [lista, setLista] = useState([]);


    useEffect( ()=>{
        var listUser = ["alizera#11908", "eraserhead#11284", "ChutoGnomos#1775", "SaGaH#1620", "Victor#15236"];
        var objetos = [];

        listUser.forEach((str, i) => {
            let a = fetch(`https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/battle/gamer/${encodeURIComponent(str)}/profile/type/mp`)
            .then(response => {
            if(response.ok) return response.json();
            console.log(response.statusText)  // throw an error if there's something wrong with the response
            })
            .then(function handleData(res) {
                let username = res.data.username;
                let nickname = username.substring(0, username.indexOf("#"));

                let obj = {
                    player: nickname,
                    level: res.data.level,
                    data: res.data.lifetime.mode.br.properties,
                    saque: res.data.lifetime.mode.br_dmz.properties,
                    all: res.data.lifetime.mode.br_all.properties,
                };
                objetos.push(obj);
                if(objetos.length === listUser.length){
                    setLista(objetos);
                }
            })
            .then(v=> v)
            .catch(function handleError(error) {
                console.log(error)
            })
        });
    }, [])


  return (
    <div className="container">
        {
            lista ? lista.map( (v,i)=>{
                return (
                    <table key={i} className="table table-dark table-striped table-hover col-12 ml-auto mr-auto mb-5 border">

                    <thead style={{borderBottom: "2px solid white"}} >
                        <tr>
                            <td style={{width: 25+"%"}}>INFORMAÇÃO</td>
                            <td className="text-center" style={{width: 25+"%"}}>BATTLE ROYAL</td>
                            <td className="text-center" style={{width: 25+"%"}}>SAQUE</td>
                            <td className="text-center" style={{width: 25+"%"}}>TOTAL</td>
                        </tr>
                        <tr>
                            <td>PLAYER</td>
                            <td className="text-center" style={{width: 25+"%"}}>{v.player}</td>
                            <td className="text-center" style={{width: 25+"%"}}>{v.player}</td>
                            <td className="text-center" style={{width: 25+"%"}}>{v.player}</td>
                        </tr>
                        <tr>
                            <td>LEVEL</td>
                            <td className="text-center">{v.level}</td>
                            <td className="text-center">{v.level}</td>
                            <td className="text-center">{v.level}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ABATES</td>
                            <td className="text-center">{v.data.kills}</td>
                            <td className="text-center">{v.saque.kills}</td>
                            <td className="text-center">{v.all.kills}</td>
                        </tr>
                        <tr>
                            <td>MORTES</td>
                            <td className="text-center">{v.data.deaths}</td>
                            <td className="text-center">{v.saque.deaths}</td>
                            <td className="text-center">{v.all.deaths}</td>
                        </tr>
                        <tr>
                            <td>DERRUBADO</td>
                            <td className="text-center">{v.data.downs}</td>
                            <td className="text-center">{v.saque.downs}</td>
                            <td className="text-center">{v.all.downs}</td>
                        </tr>
                        <tr>
                            <td>K/D RATIO</td>
                            <td className="text-center">{parseFloat(v.data.kdRatio).toFixed(3)}</td>
                            <td className="text-center">{parseFloat(v.saque.kdRatio).toFixed(3)}</td>
                            <td className="text-center">{parseFloat(v.all.kdRatio).toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td>CONTRATOS</td>
                            <td className="text-center">{v.data.contracts}</td>
                            <td className="text-center">{v.saque.contracts}</td>
                            <td className="text-center">{v.all.contracts}</td>
                        </tr>
                        <tr>
                            <td>QNT. JOGOS</td>
                            <td className="text-center">{v.data.gamesPlayed}</td>
                            <td className="text-center">{v.saque.gamesPlayed}</td>
                            <td className="text-center">{v.all.gamesPlayed}</td>
                        </tr>
                        <tr>
                            <td>QNT. VITORIAS</td>
                            <td className="text-center">{v.data.wins}</td>
                            <td className="text-center">{v.saque.wins}</td>
                            <td className="text-center">{v.all.wins}</td>
                        </tr>
                        <tr>
                            <td>TEMPO DE JOGO (HR)</td>
                            <td className="text-center">{((parseInt(v.data.timePlayed)/60)/60).toFixed(0)}</td>
                            <td className="text-center">{((parseInt(v.saque.timePlayed)/60)/60).toFixed(0)}</td>
                            <td className="text-center">{((parseInt(v.all.timePlayed)/60)/60).toFixed(0)}</td>
                        </tr>

                    </tbody>
                </table>
                )
            }) : <p>Sem dados</p>
        }
    </div>
  );
}
