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
const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';
    tooltipEl.style.transition = 'all .1s ease';
    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);
  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  if (tooltip.body) {

    const tableHead = document.createElement('thead');
    let dataIndex = chart.data.labels.findIndex((item) => item == tooltip.title[0])
    let cValue = chart.data.datasets[0].data[dataIndex]
    let lValue = chart.data.datasets[0].data[0];
    let cTxt = chart.data.labels[dataIndex];
    let lTxt = chart.data.labels[0];
    if (dataIndex > 0) {
      lValue = chart.data.datasets[0].data[dataIndex - 1]
      lTxt = chart.data.labels[dataIndex - 1];
    }
    let sign = '';
    let value = 0;
    let backcolor = ''
    let textcolor = ""
    if (lValue <= cValue) {
      sign = "+";
      backcolor = "#a9e591";
      textcolor = "#37751f"
      if (cValue == 0) value = 0;
      else
        value = Math.round((cValue - lValue) / cValue * 100)
    } else {
      sign = "-";
      backcolor = "#e6c387";
      textcolor = "#c45c28";
      if (lValue == 0) value = 100;
      else
        value = Math.round((lValue - cValue) / lValue * 100)
    }
    const values = {
      txt: [cTxt, lTxt],
      val: [cValue, lValue]
    }
    console.log(tooltip)
    const tr = document.createElement('tr');
    tr.style.borderWidth = 0;
    const th = document.createElement('th');
    th.style.borderWidth = '0  0  1px 0 ';
    th.style.borderColor = 'rgb(181 181 181)';
    th.style.color = 'black';
    th.colSpan = 2;
    th.style.textAlign = 'right';

    const spanHader = document.createElement('span');
    spanHader.style.background = backcolor;
    spanHader.style.color = textcolor;
    spanHader.style.fontSize = '0.8em';
    spanHader.style.fontWeight = '500';
    spanHader.style.borderRadius = '3px';
    spanHader.style.padding = '2px 5px';
    spanHader.appendChild(document.createTextNode(`${sign} ${value} %`))


    // const text = document.createTextNode(title);

    th.appendChild(spanHader);
    tr.appendChild(th);
    tableHead.appendChild(tr);

    const tableBody = document.createElement('tbody');

    const colors = ['#807ccc', '#bfccc9'];
    colors.map((item, i) => {
      const span = document.createElement('span');
      span.style.background = item;
      span.style.borderColor = item;
      span.style.borderWidth = '2px';
      span.style.borderRadius = '50%';
      span.style.marginRight = '8px';
      span.style.height = '10px';
      span.style.width = '10px';
      span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = 0;

      let td = document.createElement('td');
      td.style.borderWidth = 0;
      td.style.fontSize = '0.8em';
      td.style.color = 'rgb(181 181 181)';



      console.log(dataIndex, lTxt, cTxt);

      const txtSpan1 = document.createElement('span');
      const txtSpan2 = document.createElement('span');
      txtSpan1.appendChild(document.createTextNode(values.txt[i]))
      txtSpan2.appendChild(document.createTextNode(values.val[i]))

      td.appendChild(span);
      td.appendChild(txtSpan1);

      tr.appendChild(td);
      td = document.createElement('td');
      td.style.borderWidth = 0;
      td.style.fontSize = '0.8em';
      td.style.color = 'rgb(181 181 181)';
      td.style.paddingLeft = '50px';
      td.appendChild(txtSpan2);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    })




    const tableRoot = tooltipEl.querySelector('table');
    // Remove old children
    while (tableRoot && tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.backgroundColor = 'white';
  tooltipEl.style.borderRadius = '10px';
  tooltipEl.style.borderWidth = '1px';
  tooltipEl.style.borderColor = 'rgb(181 181 181)';
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  // tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  tooltipEl.style.padding = '10px';
};
export const options = {
  responsive: true,
  interaction: {
    intersect: false,
    mode: 'index',
  },
  elements: {
    point: {
      radius: 0
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        callback: function (val, index) {
          if (index == 0 || this.ticks.length - 1 == index) return this.getLabelForValue(index);
          return '';
        }
      }
    },
    y: {
      grid: {
        display: false
      },
      ticks: {
        callback: function (val, index) {
          if (index == 0 || this.ticks.length - 1 == index) return this.getLabelForValue(index);
          return '';
        }
      }
    },

  },
  plugins: {
    showTooltips: false,
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
    tooltip: {
      enabled: false,
      position: "average",
      external: externalTooltipHandler,
      intersect: false
    }
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data1 = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * 6) + 1),
      borderColor: '#807ccc',
      backgroundColor: '#807ccc',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * 6) + 1),
      borderColor: '#bfccc9',
      backgroundColor: '#bfccc9',
    },
  ],
};


function App() {
  return (
    <div class="bg-green-200 min-h-screen p-20 justify-items-center grid">
      <div class="w-2/3 rounded-lg overflow-hidden shadow-lg bg-white p-4 items-center" >
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
        <div class='chart-section'>
          <Line options={options} data={data1} class="mt-4" />
        </div>
      </div>
    </div>
  );
}

export default App;
