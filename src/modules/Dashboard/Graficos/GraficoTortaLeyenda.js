import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Grupo A', value: 300 },
  { name: 'Grupo B', value: 600 },
  { name: 'Grupo C', value: 800 },
  { name: 'Grupo D', value: 400 },
  // ...otros datos
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d'];

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

const GraficoTortaLeyenda = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            fill="#8884d8"
            label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoTortaLeyenda;
