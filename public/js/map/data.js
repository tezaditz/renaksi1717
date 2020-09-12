$(document).ready(function() {
    // Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
var url = "/bbo/getDataMap";
var data = [
    {
        "hc-key": "id-3700",
        "name": null,
        "ieba":0,
        "ibbo":0
    }
];
$.get(url , function(result){
    
    // console.log(result);
    $.each(result, function (key, entry) {
        data.push({
            "hc-key":entry['hckey'],
            "name": entry['name'],
            "ieba":entry['ieba'],
            "ibbo":entry['ibbo']
        });  
    });
    Highcharts.mapChart('container', {
        chart: {
            map: 'countries/id/id-all'
        },
        legend: {
            enabled: false
          },
        title: {
            text: ''
        },

        subtitle: {
            text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/id/id-all.js">Indonesia</a>'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },

        series : [{
            data : data,
            mapData: Highcharts.maps['countries/id/id-all'],
            joinBy: 'hc-key',
            name: 'Jumlah Penduduk',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: false,
                format: '{point.name}'
            },
            tooltip: {
                    pointFormat : '<strong>{point.name}</strong><br/>Jumlah IEBA : {point.ieba}<br/>Jumlah IBBO: {point.ibbo}'
                }
        }]
    });
});

});