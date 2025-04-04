import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AiOutlineInfoCircle } from "react-icons/ai";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    intersect: false,
    mode: 'index',
  },
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data1 = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * 6) + 1),
      borderColor: 'oklch(58.8% .243 264.376)',
      backgroundColor: 'oklch(58.8% .243 264.376)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * 6) + 1),
      borderColor: '#155dfc80',
      backgroundColor: '#155dfc80',
    },
  ],
};

export const data2 = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * 6) + 1),
      borderColor: 'oklch(58.8% .243 264.376)',
      backgroundColor: 'oklch(58.8% .243 264.376)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * 6) + 1),
      borderColor: '#155dfc80',
      backgroundColor: '#155dfc80',
    },
  ],
};


function App() {
  return (
    <div class="bg-green-200 min-h-screen p-20">
      <div class="grid grid-cols-2 gap-4">

        <div class="w-full rounded-lg overflow-hidden shadow-lg bg-white p-4" >
          <div className='chart-title'>
            <div class="flex items-center">
              <span class='font-medium text-2xl volume-name'>MRR</span>
              <span class='info-icon ml-1'><AiOutlineInfoCircle /></span>
              <span class='bg-orange-200 info-value ml-3 p-1 text-xs text-orange-500 rounded'>-5.1%</span>
            </div>
            <div class="flex items-center">
            <span class='text-2xl volume-name text-gray-500'>£532.67</span>
            <span class='text-xl volume-name text-gray-500 ml-2'>£1,024.66 previous period</span>
            </div>
          </div>
          <Line options={options} data={data1} class="mt-4"/>
        </div>
        <div class="w-full rounded-lg overflow-hidden shadow-lg bg-white p-4" >
          <div className='chart-title'>
            <div class="flex items-center">
              <span class='font-medium text-2xl volume-name'>Gross volume</span>
              <span class='info-icon ml-1'><AiOutlineInfoCircle /></span>
              <span class='bg-green-200 info-value ml-3 p-1 text-xs text-green-500 rounded'>+6.67%</span>
            </div>
            <div class="flex items-center">
            <span class='text-2xl volume-name text-gray-500'>£532.67</span>
            <span class='text-xl volume-name text-gray-500 ml-2'>£1,024.66 previous period</span>
            </div>
          </div>
          <Line options={options} data={data2} class="mt-4"/>
        </div>
      </div>
    </div>
  );
}

export default App;
