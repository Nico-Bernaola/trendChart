let ctx = document.getElementById('myChart')
let newCol = document.getElementById('newCol')
const submit = document.getElementById('submit')
let multiplier = document.getElementById('multiplier')
const deleter = document.getElementById('deleter')
const clearer = document.getElementById('clearer')

let myChart = new Chart(ctx, {
    type:"bar",
    data:{
        labels:['Ronda 1','Ronda 2','Ronda 3','Ronda 4','Ronda 5'],
        datasets:[{
            label:'Multiplicador',
            data:[1.2,3.2,1,4.3,1.1],
            backgroundColor:[
                'rgb(131, 80, 199)',
                'rgb(80, 199, 109)',
                'rgb(199, 145, 80)',
                'rgb(69, 78, 173)',
                'rgb(214, 96, 98)'
            ]
        }]
    },
    options:{
        scales:{
            yAxes:[{
                ticks:{
                    beginAtZero:true
                }
            }]
        }
    }
});

// Éstas variables acceden a los arrays que contienen los datos de la tabla
let labelsArray = myChart.data.labels;
let dataArray = myChart.data.datasets[0].data;
let colorArray = myChart.data.datasets[0].backgroundColor;

submit.addEventListener('click', function(){
    labelsArray.push("Ronda:" + newCol.value);
    dataArray.push(parseFloat(multiplier.value)); // Pasa el valor del multiplicador a un float
    
    //Modifica el color de la columna en base al score en el multiplier
    switch (true) {
        case parseFloat(multiplier.value) <= 1.99:
            colorArray.push('rgb(119, 221, 224)');
            break;

            case parseFloat(multiplier.value) > 1.99 && parseFloat(multiplier.value) <= 9.99:
            colorArray.push('rgb(148, 71, 255)');
            break;

            case parseFloat(multiplier.value) >= 10:
            colorArray.push('rgb(220, 65, 0)');
            break;

        default:
            console.log("Invalid multiplier");
            labelsArray.pop()
    }
    
    console.log(labelsArray.length)
    myChart.update(); // Actualiza la tabla para mostrar los cambios
});

deleter.addEventListener('click', function(){
    labelsArray.pop();
    dataArray.pop();
    colorArray.pop();

    if(labelsArray.length < 1 ){
        console.error('No hay columnas por borrar')
        alert('No hay columnas por borrar');
        myChart.update();
    } else {
        myChart.update();
        console.log(labelsArray.length)
    }
});

clearer.addEventListener('click', function(){
    if(confirm('Seguro querés borrar tu gráfico?') == true){
        labelsArray.length = 0
        dataArray.length = 0
        colorArray.length = 0

        myChart.update()
    } else{
        console.log('Status quo')
    }
})