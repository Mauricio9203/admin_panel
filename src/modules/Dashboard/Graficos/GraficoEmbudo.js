import React from 'react';
import { FunnelChart, Funnel, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Paso 1', value: 300 },
  { name: 'Paso 2', value: 200 },
  { name: 'Paso 3', value: 100 },
  { name: 'Paso 4', value: 50 },
];

const CUSTOM_COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="label">{`${data.name} : ${data.value}`}</p>
      </div>
    );
  }

  return null;
};

const GraficoEmbudo = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <FunnelChart>
          <Funnel
            data={data}
            dataKey="value"
            dataSort="descending"
            colors={CUSTOM_COLORS}
          />
          <Tooltip content={<CustomTooltip />} />
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoEmbudo;
