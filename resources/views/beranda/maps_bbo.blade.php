@push('bottom')

<link href="https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">

<script type="text/javascript">
    /*
    TODO:
    - Check data labels after drilling. Label rank? New positions?
    */

    var data = Highcharts.geojson(Highcharts.maps['countries/id/id-all']),
        separators = Highcharts.geojson(Highcharts.maps['countries/id/id-all'], 'mapline'),
        // Some responsiveness
        small = $('#container').width() < 400;

    // Set drilldown pointers
    $.each(data, function (i) {
        this.drilldown = this.properties['hc-key'];
        this.value = i; // Non-random bogus data
    });

    // Instantiate the map
    Highcharts.mapChart('container', {
        chart: {
            events: {
                drilldown: function (e) {
                    if (!e.seriesOptions) {
                        var chart = this,
                            mapKey = 'countries/id/' + e.point.drilldown + '-all',
                            // Handle error, the timeout is cleared on success
                            fail = setTimeout(function () {
                                if (!Highcharts.maps[mapKey]) {
                                    chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);
                                    fail = setTimeout(function () {
                                        chart.hideLoading();
                                    }, 1000);
                                }
                            }, 3000);

                        // Show the spinner
                        chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner

                        // Load the drilldown map
                        $.getScript('https://code.highcharts.com/mapdata/' + mapKey + '.js', function () {

                            data = Highcharts.geojson(Highcharts.maps[mapKey]);

                            // Set a non-random bogus value
                            $.each(data, function (i) {
                                this.value = i;
                            });

                            // Hide loading and add series
                            chart.hideLoading();
                            clearTimeout(fail);
                            chart.addSeriesAsDrilldown(e.point, {
                                name: e.point.name,
                                data: data,
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}'
                                }
                            });
                        });
                    }

                    this.setTitle(null, { text: e.point.name });
                },
                drillup: function () {
                    this.setTitle(null, { text: '' });
                }
            }
        },

        title: {
            text: ''
        },

        subtitle: {
            text: '',
            floating: true,
            align: 'right',
            y: 50,
            style: {
                fontSize: '16px'
            }
        },



        colorAxis: {
            min: 0,
            minColor: '#E6E7E8',
            maxColor: '#005645'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        plotOptions: {
            map: {
                states: {
                    hover: {
                        color: '#EEDD66'
                    }
                }
            }
        },

        series: [{
            data: data,
            name: 'Indonesia',
            dataLabels: {
                enabled: true,
                format: '{point.properties.postal-code}'
            }
        }, {
            type: 'mapline',
            data: separators,
            color: 'silver',
            enableMouseTracking: false,
            animation: {
                duration: 500
            }
        }],

        drilldown: {
            activeDataLabelStyle: {
                color: '#FFFFFF',
                textDecoration: 'none',
                textOutline: '1px #000000'
            },
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    x: 0,
                    y: 60
                }
            }
        }
    });
    </script>
@endpush
<div class="panel panel-default">
    <div class="panel-heading">
        <h4>Peta Persebaran IBBO , IEBA , IOT</h4>
    </div>
    <div class="panel-body">
        <div id="container"></div>
    </div>
</div>