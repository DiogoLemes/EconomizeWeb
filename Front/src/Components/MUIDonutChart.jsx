import * as React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'


export default function MUIDonutChart({valorReceitas, valorDespesas}) {
  const data = [
    { id: 0, label: 'Receitas', value: valorReceitas, color: '#2DCF0C' },
    { id: 1, label: 'Despesas', value: valorDespesas, color: '#FD3838' },
  ]
  
  const settings = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    hideLegend: true,
  }


  return (
    <PieChart
      series={[{ innerRadius: 50, outerRadius: 100, data, arcLabel: 'value' }]}
      {...settings}
    />
  )
}