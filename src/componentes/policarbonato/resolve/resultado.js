import React, {useState, useEffect} from 'react';
import Desenha from '../desenha/desenha';

export default function Ajustes(props){
 
    const [lista, setLista] = useState([]);
    useEffect(() => {
        const policarbonato = props.itens.policarbonato;
        const meioPolicarbonato = props.itens.meioPolicarbonato;
        const poliM2 = props.itens.poliM2;
        const perfilBarraChata = props.itens.perfilBarraChata;
        const perfilU = props.itens.perfilU;
        const fitaAluminio = props.itens.fitaAluminio;

        let acomp = Math.floor(policarbonato.comprimento / props.comprimento); // Aproveitamento do Comprimento
        let QntFitaAl = Math.ceil( props.largura * 2 / fitaAluminio.comprimento ); // Quantidade de fita aluminio
        let QntPerfilU = Math.ceil( props.largura * 2 / perfilU.comprimento ); // Quantidade de perfil u

        let aci = Math.ceil(props.largura / (policarbonato.largura * acomp) ); // Aproveitamento Chapa Inteira -- Quantas chapas inteira

        // Verifica se a largura fornecida é maior que a da chapa para calcular emenda
            var eci;
        if(props.largura / policarbonato.largura >1){
            eci = Math.ceil( Math.ceil( (props.largura / policarbonato.largura) - 1) / acomp  );
        } else {
            eci = 0;
        }

        let amc = Math.ceil(props.largura / (meioPolicarbonato.largura * acomp) ); // Aproveitamento Meia Chapa -- Quantas meias chapas

        // Verifica se a largura fornecida é maior que a da chapa para calcular emenda
            var emc;
        if(props.largura / meioPolicarbonato.largura >1){
            emc = Math.ceil( Math.ceil( (props.largura / meioPolicarbonato.largura) - 1) / acomp  );
        } else {
            emc = 0;
        }

        setLista([]);
        var calculos = [];

        //console.log(restoChapainteira, restoMeiaChapa);

        //calculo 1 com placas inteiras ****************************************************************************
        let Calc1 = {
            placas : {
                txt: `Policarbonato ${policarbonato.espessura}MM` ,
                qnt: aci,
                preco:  Math.abs( aci * policarbonato.preco ),
                precoUnitario: policarbonato.preco
            },
            subPlaca: {
                txt: `Pedaço em M² ${poliM2.espessura}MM`,
                qnt: 0,
                preco: 0,
                precoUnitario: 0
            },
            emenda: {
                txt: "Emenda",
                qnt: eci,
                preco: Math.abs( eci * perfilBarraChata.preco ),
                precoUnitario: perfilBarraChata.preco
            },
            perfilU: {
                txt: `Perfil U ${perfilU.espessura}MM`,
                qnt: QntPerfilU,
                preco: Math.abs( QntPerfilU * perfilU.preco ),
                precoUnitario: perfilU.preco
            },
            fitaAluminio : {
                txt: "Fita aluminio",
                qnt:  QntFitaAl,
                preco:  Math.abs(QntFitaAl * fitaAluminio.preco),
                precoUnitario: fitaAluminio.preco
            },
            preco : function(){
                return (this.placas.preco + this.subPlaca.preco + this.emenda.preco + this.perfilU.preco + this.fitaAluminio.preco).toFixed(2).toLocaleString();
            },
            calculo: function(){
                return new Array( Math.ceil(props.largura / policarbonato.largura)  ).fill( Math.abs(props.largura / Math.ceil(props.largura / policarbonato.largura)).toFixed(2) )
            }
        }
        //FIM ** calculo 1 com placas inteiras ****************************************************************************
        calculos.push(Calc1);


        //CALCULO 2 COM PLACA INTEIRA + MEIA PLACA ****************************************************************************
        if( 
            aci > 1 &&
            props.largura > (policarbonato.largura * acomp)  &&
            props.largura <= (((policarbonato.largura * (aci - 1)) * acomp) + meioPolicarbonato.largura)  &&  
            props.largura % policarbonato.largura < 1051 && 
            props.largura % policarbonato.largura !== 0 
        ){
        let Calc2 = {
                placas: {
                    txt: `Policarbonato ${policarbonato.espessura}MM`,
                    qnt: (aci - 1),
                    preco: Math.abs( ( (aci - 1) * policarbonato.preco) ),
                    precoUnitario: policarbonato.preco
                },

                subPlaca: {
                    txt: `½ Placa ${meioPolicarbonato.espessura}MM`,
                    qnt: 1,
                    preco: Math.abs(1 * meioPolicarbonato.preco),
                    precoUnitario: meioPolicarbonato.preco
                },

                emenda: {
                    txt: "Emenda",
                    qnt: eci,
                    preco: Math.abs(eci * perfilBarraChata.preco),
                    precoUnitario: perfilBarraChata.preco
                
                },
                perfilU: {
                    txt: `Perfil U ${perfilU.espessura}MM`,
                    qnt: QntPerfilU,
                    preco: Math.abs( QntPerfilU * perfilU.preco ),
                    precoUnitario: perfilU.preco
                },

                fitaAluminio: {
                    txt: "Fita aluminio",
                    qnt: QntFitaAl,
                    preco: Math.abs(QntFitaAl * fitaAluminio.preco),
                    precoUnitario: fitaAluminio.preco
                },

                preco : function(){
                    return (this.placas.preco + this.subPlaca.preco + this.emenda.preco + this.perfilU.preco + this.fitaAluminio.preco).toFixed(2).toLocaleString();
                },
                calculo: function(){
                    let x = ( (aci -1) * acomp );
                    let arr = [];
                    let larguraComSubPlaca = props.largura - meioPolicarbonato.largura;
                    let placasInteiras = Math.abs( larguraComSubPlaca / x );
                    for(let i =0; i<x; i++ ){
                        arr[i] = placasInteiras.toFixed(2);
                    }
                    arr.push( meioPolicarbonato.largura );
                    return arr;
                }
            }
            calculos.push(Calc2);
        }
        // FIM ****CALCULO 2 COM PLACA INTEIRA + MEIA PLACA ****************************************************************************


        let Calc3 = {
            placas: {
                txt: `½ Placa ${meioPolicarbonato.espessura}MM`,
                qnt: amc,
                preco:  Math.abs( amc * meioPolicarbonato.preco ),
                precoUnitario: meioPolicarbonato.preco
            },
            subPlaca: {
                txt: `Pedaço em M² ${poliM2.espessura}MM`,
                qnt: 0,
                preco: 0,
                precoUnitario: 0
            },
            emenda: {
                txt:"Emenda",
                qnt: emc,
                preco: Math.abs( emc * perfilBarraChata.preco ),
                precoUnitario: perfilBarraChata.preco
            },
            perfilU: {
                txt: `Perfil U ${perfilU.espessura}MM`,
                qnt: QntPerfilU,
                preco: Math.abs( QntPerfilU * perfilU.preco ),
                precoUnitario: perfilU.preco
            },
            fitaAluminio: {
                txt: "Fita aluminio",
                qnt: QntFitaAl,
                preco: Math.abs(QntFitaAl * fitaAluminio.preco),
                precoUnitario: fitaAluminio.preco
            },
            preco : function(){
                return (this.placas.preco + this.subPlaca.preco + this.emenda.preco + this.perfilU.preco + this.fitaAluminio.preco).toFixed(2).toLocaleString();
            },
            calculo: function(){
                return new Array( Math.ceil(props.largura / meioPolicarbonato.largura) ).fill( Math.abs(props.largura / Math.ceil(props.largura / meioPolicarbonato.largura)).toFixed(2) )
            }
        }
        calculos.push(Calc3);

        /*
         if(
            
            aci >= 1 &&
            props.largura <= ( (policarbonato.largura * aci) * acomp)  && 
            props.largura <= ( policarbonato.largura * ((aci - 1) * acomp) + poliM2.largura )  && 
            props.largura % policarbonato.largura > 1050 && 
            props.largura % policarbonato.largura !== 0 
        )
         */
        if(
            aci >= 1 &&
            props.largura <= ( (policarbonato.largura * aci) * acomp)  && 
            props.largura <= ( policarbonato.largura * ((aci - 1) * acomp) + poliM2.largura )  && 
            (props.largura % policarbonato.largura > 1050  || props.largura % policarbonato.largura === 0)
        ){
        let Calc4 = {
                placas: {
                    txt: `Policarbonato ${policarbonato.espessura}MM`,
                    qnt: (aci -1),
                    preco: Math.abs( ( (aci - 1) * policarbonato.preco) ),
                    precoUnitario: policarbonato.preco
                },
                subPlaca: {
                    txt: `Pedaço em M² ${poliM2.espessura}MM`,
                    qnt: ((2100 * props.comprimento) / 1000000).toFixed(4).toLocaleString() ,
                    preco: Math.abs( ((poliM2.preco * ( 2100 * props.comprimento) / 1000000)).toFixed(2) ),
                    precoUnitario: poliM2.preco
                },
                emenda: {
                    txt: "Emenda",
                    qnt: eci,
                    preco: Math.abs(eci * perfilBarraChata.preco),
                    precoUnitario: perfilBarraChata.preco
                },
                perfilU: {
                    txt: `Perfil U ${perfilU.espessura}MM`,
                    qnt: QntPerfilU,
                    preco: Math.abs( QntPerfilU * perfilU.preco ),
                    precoUnitario: perfilU.preco
                },
                fitaAluminio: {
                    txt: "Fita aluminio",
                    qnt: QntFitaAl,
                    preco: Math.abs(QntFitaAl * fitaAluminio.preco),
                    precoUnitario: fitaAluminio.preco
                },
                preco : function(){
                    return (this.placas.preco + this.subPlaca.preco + this.emenda.preco + this.perfilU.preco + this.fitaAluminio.preco).toFixed(2).toLocaleString();
                },
                calculo: function(){
                    return new Array( Math.ceil(props.largura / policarbonato.largura)  ).fill( Math.abs(props.largura / Math.ceil(props.largura / policarbonato.largura)).toFixed(2) )
                }
    
            }
            calculos.push(Calc4);

        }

        calculos.sort(function(a,b){
            if(parseFloat(a.preco()) > parseFloat(b.preco())){
                return 1;
            }
            if(parseFloat(a.preco()) < parseFloat(b.preco())){
                return -1;
            }
            return 0;
        })

        setLista(calculos);
    
    }, [props]);

    if(props.largura >100 && props.comprimento > 100){
        return(
            <>
                <Desenha array={lista || []} comprimento={props.comprimento}  />
            </>
        )
    } else {
        return(
            ''
        )
    }
}