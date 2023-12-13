import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts';
import './grafico.css'

function Grafico({data}){
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
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
                <XAxis 
                    type="number" dataKey="x" name="Valor Médio" unit="" label ={<Label  value="Valor Médio da Ação" position="bottom" offset={30}/>}
                    axisLine={{ stroke: 'black', strokeWidth: 2.5 }} tick={{ stroke: 'black' }} tickLine={{ stroke: 'black', strokeWidth: 2.5 }}
                    tickSize={12}
                />
                <YAxis 
                type="number" dataKey="y" name="Média de ações" unit="" label ={<Label value="Número médio de ações em 90 minutos" width={135} position="left" />}
                axisLine={{ stroke: 'black', strokeWidth: 2.5 }} tick={{ stroke: 'black' }} tickLine={{ stroke: 'black', strokeWidth: 2.5}}
                tickSize={30}
                dx={27}
                dy={-10}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content = {<CustomTooltip />} />
                <Legend verticalAlign='bottom' align='center'/>
                <Scatter name="Jogadores" data={data} fill="#90cf54"> 
                </Scatter>
            </ScatterChart>
        </ResponsiveContainer>
    )
}
// content={<CustomLabel texto="TESTE Y"/>}
export default Grafico