import React, { useEffect, useState } from 'react';

import Desenha from '../desenha/desenha';

// import { Container } from './styles';

export default function Resolve(props) {

  const larguraPlaca = props.placaL;
  const comprimentoPlaca = props.placaC;
  const PrecoPlaca = props.placaPreco;

  const larguraPedaco = props.pedacoL;
  const comprimentoPedaco = props.pedacoC;

  const [calc1, setCalc1] = useState({
    largura: [0],
    comprimento: [0],
    total: 0
  });

  const [obj, setObj] = useState({});

  const [qntPlacas, setQntPlacas] = useState(0);

  useEffect(() => {

    if (larguraPlaca && comprimentoPlaca && larguraPedaco && comprimentoPedaco) {

      // Largura da placa / Largura da peça
      let laPlXlaPe = larguraPlaca / larguraPedaco;
      // Largura da placa / Comprimento da peça
      let laPlXcoPe = larguraPlaca / comprimentoPedaco;

      // Comprimento da placa / Largura da peça
      let coPlXlaPe = comprimentoPlaca / larguraPedaco;
      // Comprimento da placa / Comprimento da peça
      let coPlXcoPe = comprimentoPlaca / comprimentoPedaco;

      if( Math.floor(laPlXlaPe) * Math.floor(coPlXcoPe) >= Math.floor(laPlXcoPe) * Math.floor(coPlXlaPe) ){
        setObj({
          largura: Math.floor(laPlXlaPe),
          comprimento: Math.floor(coPlXcoPe),
          // definição dos pixels para montagem
          pixelL: larguraPedaco,
          pixelC: comprimentoPedaco,
          // verificando os milímetros sobrados da chapa
          sobraL: larguraPlaca % larguraPedaco,
          sobraC: comprimentoPlaca % comprimentoPedaco
        })
      } else {
        setObj({
          largura: Math.floor(laPlXcoPe),
          comprimento: Math.floor(coPlXlaPe),
          // definição dos pixels para montagem
          pixelL: comprimentoPedaco,
          pixelC: larguraPedaco,
          // verificando os milímetros sobrados da chapa
          sobraL: larguraPlaca % comprimentoPedaco,
          sobraC: comprimentoPlaca % larguraPedaco
        })
      }
    }
  }, [props])

  useEffect( ()=>{
    if (larguraPlaca >0 && comprimentoPlaca>0 && larguraPedaco>0 && comprimentoPedaco>0) {
      setCalc1({
        largura: new Array( obj.largura ).fill( obj.largura ),
        comprimento: new Array( obj.comprimento ).fill( obj.comprimento ),
        total: obj.largura * obj.comprimento,
        m2: (( (obj.sobraL * comprimentoPlaca) + (obj.sobraC * (larguraPlaca - obj.sobraL)) ) / 1000000).toFixed(3)
      });
    }

  }, [obj])
  
  useEffect(()=>{
    setQntPlacas( Math.ceil(props.quantidade / calc1.total) );
  }, [calc1])

  if(props.go){

    return (
      <>
        <div className="w-75 bg-success mr-auto ml-auto rounded p-3 text-light shadow mb-5">
          <div className="d-flex m-2 border-bottom">
            <span className="mr-2">
              Quantidade de peça por placa:
            </span>
            <span className="font-weight-bold">
              {calc1.total}
            </span>
          </div>
          <div className="d-flex m-2 border-bottom">
            <span className="mr-2">
              Quantidade necessária de placas:
            </span>
            <span className="font-weight-bold">
              {qntPlacas}
            </span>
          </div>
          <div className="d-flex m-2 border-bottom">
            <span className="mr-2">
              Valor total das placas:
            </span>
            <span className="font-weight-bold">
              R$ {(qntPlacas * PrecoPlaca).toFixed(2)}
            </span>
          </div>
          <div className="d-flex m-2 border-bottom">
            <span className="mr-2">
              M² de material perdido por placa:
            </span>
            <span className="font-weight-bold">
              {calc1.m2}
            </span>
          </div>
          <div className="d-flex m-2 border-bottom">
            <span className="mr-2">
              M² total de material perdido:
            </span>
            <span className="font-weight-bold">
              {calc1.m2 * qntPlacas}
            </span>
          </div>
          <div className="d-flex m-2 border-bottom justify-content-center">
            <span className="font-weight-bold">
              "{larguraPlaca}mm / {obj.pixelL}mm" e "{comprimentoPlaca}mm / {obj.pixelC}mm"
            </span>
          </div>
        </div>
  
        <Desenha placaL={larguraPlaca} placaC={comprimentoPlaca}
          pedacoC={obj.pixelC} pedacoL={obj.pixelL}
          calculo={calc1} />
  
      </>
       );
  } else {
    return(" ");
  }

}
