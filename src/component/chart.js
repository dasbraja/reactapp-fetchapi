export const chartSeries = (seriesName, seriesLabel, seriesData) => [ //data on the y-axis
    {
        name: seriesName,
        label: seriesLabel,
        data: seriesData
    }
];

export function getChartOptions(chartid, xaxisCategory, chartTitle, yaxisTitle) {

    const chartOptions = { //data on the x-axis
        chart: {id: chartid},

        theme: {
            monochrome: {
                enabled: true,
                color: '#228B22',
                shadeTo: 'light',
                shadeIntensity: 0.89
            }
        },
        xaxis: {
            categories: xaxisCategory,
            axisBorder: {
                show: true,
                color: ' #000080',
                offsetX: 0,
                offsetY: 0
            },
        },
        title: {
            text: chartTitle,
            align: 'center',
            style: {
                fontSize:  '20px',
                fontWeight:  'bold',
                fontFamily:  undefined,
                color:  '#263238'
            },
        },
        yaxis: {
            title: {
                text: yaxisTitle
            },
            style: {
                color: undefined,
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-yaxis-title',
            },
            axisBorder: {
                show: true,
                color: '#00008B',
                offsetX: 0,
                offsetY: 0
            },
            axisTicks: {
                show: true,
                borderType: 'solid',
                color: '#78909C',
                width: 12,
                offsetX: 0,
                offsetY: 0
            },
        },
        dataLabels: {
            style: {
                colors: ['#F44336', '#E91E63', '#9C27B0']
            },
            enabled: true
        },
        markers: {
            colors: ['#F44336', '#E91E63', '#9C27B0']
        },
        grid: {
            row: {
                colors: ['#87CEEB']
            }
        },
        colors:['#E0FFFF', "#FFBF00"]

    };
    return chartOptions;
}

export function getChartOptionsMultiple (chartId, chartType, stacked, xaxisCategory, chartTitle, yaxisTitle, colors, horizontalAlign) {
    const chartOptionsMultiple = { //data on the x-axis
        chart: {
            id: chartId,
            type: chartType,
            stacked: stacked,
        },
        plotOptions: {
            bar: {
                horizontal: horizontalAlign,
                dataLabels: {
                    total: {
                        enabled: true,
                        offsetX: 0,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900
                        }
                    }
                }
            },
        },
        xaxis: {
            categories: xaxisCategory,
            axisBorder: {
                show: true,
                color: '#000080',
                offsetX: 0,
                offsetY: 0
            },
        },
        title: {
            text: chartTitle,
            align: 'center',
            style: {
                fontSize:  '20px',
                fontWeight:  'bold',
                fontFamily:  undefined,
                color:  '#263238'
            },
        },
        yaxis: {
            title: {
                text: yaxisTitle
            },
            style: {
                color: undefined,
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-yaxis-title',
            },
            axisBorder: {
                show: true,
                color: '#00008B',
                offsetX: 0,
                offsetY: 0
            },
            axisTicks: {
                show: true,
                borderType: 'solid',
                color: '#78909C',
                width: 12,
                offsetX: 0,
                offsetY: 0
            },
        },
        dataLabels: {
            style: {
                colors: ['#F44336', '#E91E63', '#9C27B0']
            },
            enabled: true
        },
        markers: {
            colors: ['#F44336', '#E91E63', '#9C27B0']
        },
        grid: {
            row: {
                colors: ['#87CEEB']
            }
        },
        colors: colors

    };
    return chartOptionsMultiple;
}


export function getDonutChart (series, labels, title) {
    const options = {
        theme: {
            monochrome: {
                enabled: true,
                color: '#228B22',
                shadeTo: 'light',
                shadeIntensity: 0.89
            }
        },
        series: series,
        labels: labels,

        chart: {
            type: 'donut',
        },
        title: {
            text: title,
            align: 'center',
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#263238'
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,

                    },
                    total: {
                        show: true,
                        showAlways: true,
                        fontSize: 30,
                        color: '#f90000'
                    },
                    colors: ['#E0FFFF', "#FFBF00", "#FFA07A"],
                }
            }
        },
        fill: {colors: ["#FFA07A", "#228b22", "#FFBF00", "#40e0d0", "#355e3b", "#808000"]},
        dataLabels: {
            enabled: true,
        },
        inverseOrder: false,
        legend: {
            show: false,
            position: 'bottom',
            labels: {
                colors: ["#FFA07A", "#228b22", "#FFBF00", "#40e0d0", "#355e3b", "#808000"],
                useSeriesColors: false
            },
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }
    return options;
}