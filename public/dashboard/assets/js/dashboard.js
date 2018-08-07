( function ( $ ) {
    "use strict";


// const brandPrimary = '#20a8d8'
const brandSuccess = '#4dbd74'
const brandInfo = '#63c2de'
const brandDanger = '#f86c6b'


function convertHex (hex, opacity) {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  const result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')'
  return result
}

function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

    var elements = 1
    var data1 = []
    var data2 = []
    var data3 = []
  

    for (var i = 0; i <= elements; i++) {
      data1.push(random(50, 200))
      data2.push(random(80, 100))
      data3.push(65)
       
    }
    
    function datosDataSet()
    {
        var resultado;
        $.ajax({
            type: 'GET',
            url: '/api/usage-data',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3MiwiZnVsbG5hbWUiOiJQcnVlYmFzIiwidXNlciI6InRlc3QiLCJjcmVhdGVkX2F0IjoiMjAxOC0wNy0xMSAyMzo0Nzo0MCIsInVwZGF0ZWRfYXQiOiIyMDE4LTA3LTExIDIzOjQ3OjQwIn0sImlhdCI6MTUzMTM1MzA3OCwiZXhwIjoxNTM2NTM3MDc4fQ.aAZ6Rry86SV67VmLt1KbcbnFAZn_qT9HQp17MQdc5mw'
            },
            async: true,
            success: function (response) {
                resultado = JSON.stringify(response);
                return _.keys(_.countBy(resultado, function (resultado) { return resultado.requested_service; }));
            },
            error: function (error) {
                console.log(error);
            }
        });
        
    };

      //bar chart
    $(function () {
        var servicesNames = {
            'usage-data': 'Estadísticas de uso',
            'financial-health': 'Salud financiera',
            'exchange-rate': 'Tasa de cambio',
            'inflation-rate': 'Tasa de inflación',
            'credit-history': 'Historial crediticio'
        };
        var label;
        var data;
        $.ajax({
            type: 'GET',
            url: '/api/usage-data',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3MiwiZnVsbG5hbWUiOiJQcnVlYmFzIiwidXNlciI6InRlc3QiLCJjcmVhdGVkX2F0IjoiMjAxOC0wNy0xMSAyMzo0Nzo0MCIsInVwZGF0ZWRfYXQiOiIyMDE4LTA3LTExIDIzOjQ3OjQwIn0sImlhdCI6MTUzMTM1MzA3OCwiZXhwIjoxNTM2NTM3MDc4fQ.aAZ6Rry86SV67VmLt1KbcbnFAZn_qT9HQp17MQdc5mw'
            },
            success: function (response) {
                label = _.keys(_.countBy(response, function (response) { return servicesNames[response.requested_service]; }));
                data = Object.values(_.countBy(response, function (response) { return response.requested_service; }));

                console.log(Object.values(_.countBy(response, function (response) { return response.user; })));
                
                var ctx = document.getElementById("barChart");
                //    ctx.height = 200;

                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: label,
                        datasets: [
                            {
                                label: "Uso de los Servicios",
                                data: data,
                                borderColor: "rgba(0, 123, 255, 0.9)",
                                borderWidth: "0",
                                backgroundColor: "rgba(0, 123, 255, 0.5)"
                            }
                        ]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });   
            },
            error: function (error) {
                console.log(error);
            }
        });
        
    });  



    //pie chart
    $(function () {
        var label;
        var data;

        $.ajax({
            type: 'GET',
            url: '/api/usage-data',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3MiwiZnVsbG5hbWUiOiJQcnVlYmFzIiwidXNlciI6InRlc3QiLCJjcmVhdGVkX2F0IjoiMjAxOC0wNy0xMSAyMzo0Nzo0MCIsInVwZGF0ZWRfYXQiOiIyMDE4LTA3LTExIDIzOjQ3OjQwIn0sImlhdCI6MTUzMTM1MzA3OCwiZXhwIjoxNTM2NTM3MDc4fQ.aAZ6Rry86SV67VmLt1KbcbnFAZn_qT9HQp17MQdc5mw' },
            success: function (response) {
                label = _.keys(_.countBy(response, function (response) { return response.user; }));
                data = Object.values(_.countBy(response, function (response) { return response.user; }));

                var ctx = document.getElementById("pieChart");
                ctx.height = 200;
                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: data,
                            backgroundColor: [
                                "rgba(0, 123, 255,0.9)",
                                "rgba(0, 123, 255,0.7)",
                                "rgba(0, 123, 255,0.5)",
                                "rgba(0,0,0,0.07)"
                            ],
                            hoverBackgroundColor: [
                                "rgba(0, 123, 255,0.9)",
                                "rgba(0, 123, 255,0.7)",
                                "rgba(0, 123, 255,0.5)",
                                "rgba(0,0,0,0.07)"
                            ]

                        }],
                        labels:label
                    },
                    options: {
                        responsive: true
                    }
                });

            },
            error: function (error) {
                console.log(error);
            }

        });

    });  
   /*
    data.reduce(function (result, current) {
            result[current.user] = result[current.division] || [];
            result[current.user].push(current);
            return result;
        }, {});*/

})(jQuery);

