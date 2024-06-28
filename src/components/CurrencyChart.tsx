// /* eslint-disable @typescript-eslint/no-explicit-any */
// // src/components/CurrencyChart.tsx
// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { fetchHistoricalRates } from '../services/currencyService';

// interface CurrencyChartProps {
//   fromCurrency: string;
//   toCurrency: string;
// }

// const CurrencyChart: React.FC<CurrencyChartProps> = ({ fromCurrency, toCurrency }) => {
//   const [chartData, setChartData] = useState<any>({});

//   useEffect(() => {
//     fetchHistoricalRates(fromCurrency, toCurrency).then(data => {
//       setChartData({
//         labels: data.map((item: any) => item.date),
//         datasets: [
//           {
//             label: `${fromCurrency} to ${toCurrency} Exchange Rate`,
//             data: data.map((item: any) => item.rate),
//             fill: false,
//             backgroundColor: 'rgb(75, 192, 192)',
//             borderColor: 'rgba(75, 192, 192, 0.2)',
//           },
//         ],
//       });
//     });
//   }, [fromCurrency, toCurrency]);

//   return <Line data={chartData} />;
// };

// export default CurrencyChart;
