const data = {
    labels: [
      '800',
      '1100',
      '1200',
      '1250',
      '1350'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [1611, 7739, 24050,2039,668],
      backgroundColor: [
        '#ffffb2',
        '#fecc5c',
        '#fd8d3c',
        '#f03b20',
        '#bd0026'
      ],
      hoverOffset: 4
    }]
  };
  // </block:setup> 

  // <block:config:0>
  const config = {
    type: 'doughnut',
    data: data,
  };
  // </block:config>
  
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );