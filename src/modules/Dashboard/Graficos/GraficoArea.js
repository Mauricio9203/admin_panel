import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Enero', value: 20 },
  { name: 'Febrero', value: 35 },
  { name: 'Marzo', value: 50 },
  { name: 'Abril', value: 45 },
  { name: 'Mayo', value: 60 }
];

const AreaChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="value" fill="#8884d8" stroke="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
