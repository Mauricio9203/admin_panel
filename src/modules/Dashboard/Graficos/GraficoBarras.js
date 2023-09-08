import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Enero', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Febrero', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Marzo', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Abril', uv: 278, pv: 3908, amt: 2000 },
  { name: 'Mayo', uv: 189, pv: 4800, amt: 2181 },
  { name: 'Junio', uv: 239, pv: 3800, amt: 2500 },
  { name: 'Julio', uv: 349, pv: 4300, amt: 2100 },
];

const GraficoBarras = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraficoBarras;
