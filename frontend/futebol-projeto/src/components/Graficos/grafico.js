import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Legend, Label } from 'recharts';
import './grafico.css'


function Grafico({data}){
    const label_y = "Número médio \nde ações em \n90 minutos"
    const CustomLabel = (active, texto) => {
        if(active){
        return(
            <div classname="Label_eixo">
            <p>{texto}</p>
            </div>
        )
    }
    }
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            console.log(payload)
          return (
            <div className="custom-tooltip">
                <p className="name">{`Nome : ${payload[0].payload.name}`}</p>
                <p className="x">{`Valor médio : ${payload[0].payload.x}`}</p>
                <p className="y">{`Média de ações : ${payload[0].payload.y}`}</p>
            </div>
          );
        }
      
        return null;
      };
    return (        
        <ResponsiveContainer width="100%" height={600}>
            <ScatterChart
            margin={{
                top: 20,
                right: 300,
                bottom: 50,
                left: 200,
            }
            }
            stroke="black"
            >
                {/* <CartesianGrid stroke ={"rgba(0,0,0,1)"}/> */}
                <XAxis 
                    type="number" dataKey="x" name="Valor Médio" unit="" label ={<Label  value="Valor Médio da Ação" position="bottom" offset={30}/>}
                    axisLine={{ stroke: 'black', strokeWidth: 2.5 }} tick={{ stroke: 'black' }} tickLine={{ stroke: 'black', strokeWidth: 2.5 }}
                    tickSize={20}
                />
                <YAxis 
                type="number" dataKey="y" name="Média de ações" unit="" label ={<Label  value="Número médio  \nde ações em \n90 minutos" position="left"/>}
                axisLine={{ stroke: 'black', strokeWidth: 2.5 }} tick={{ stroke: 'black' }} tickLine={{ stroke: 'black', strokeWidth: 2.5}}
                tickSize={30}
                dx={27}
                dy={-10}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content = {<CustomTooltip />} />
                <Legend verticalAlign='bottom' align='left' />
                <Scatter name="Jogadores" data={data} fill="#90cf54"> 
                    {/* <LabelList dataKey="x" /> */}
                </Scatter>
            </ScatterChart>
        </ResponsiveContainer>
    )
}
// content={<CustomLabel texto="TESTE Y"/>}
export default Grafico