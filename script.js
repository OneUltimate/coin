let data = {
  labels: [],
  datasets: [{
    label: 'цена',
    data: [],
    borderColor: 'blue', // Начальный цвет - синий
    fill: false,
    tension: 0 // Убрали сглаживание для резких линий
    
  }]
};

const MAX_POINTS = 10;

let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      },
      x: {
        display: true
      }
    }
  }
});

let previousValue = null; // Для сравнения с предыдущим значением

setInterval(() => {
  let newValue = Math.random() * 100;
  
  if (data.labels.length >= MAX_POINTS) {
    data.labels.shift();
    data.datasets[0].data.shift();
  }

  let color = 'blue'; // Цвет по умолчанию - синий

  if (previousValue !== null) {
    if (newValue > previousValue) {
      color = 'green'; // Зеленый, если растет
    } else if (newValue < previousValue) {
      color = 'red'; // Красный, если падает
    }
  }

  data.labels.push(new Date().toLocaleTimeString());
  data.datasets[0].data.push(newValue);
  data.datasets[0].borderColor = color; // Устанавливаем цвет линии
  myChart.update();
  document.getElementById('randomValue').innerText = `Цена: ${newValue.toFixed(2)} ₽`;
  previousValue = newValue; // Обновляем предыдущее значение
}, 1000);
