const data = {
    labels: [
      '0',
      '1',
      '2',
      '3',
      '4'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [23208, 1571, 563,8383,2647],
      backgroundColor: [
        'rgb(250, 250, 250)',
        'rgb(234, 92, 43)',
        'rgb(255, 127, 63)',
        'rgb(246, 216, 96)',
        'rgb(149, 205, 65)'
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