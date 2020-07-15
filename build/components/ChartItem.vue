<template>
    <div>
        <canvas id="chart-skills" width="200" height="200"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js"

export default {
    data () {
        return {
            ctx: "",
        }
    },
    computed: {
        stats () {
            return this.$store.state.players.playerToShow.skills
        },
        data () {
            return {
                chart: {},
                labels: ["ACC", "INT", "AST", "FOR", "MAR", "PS"],
                datasets: [{
                    label: 'Basado en _ votaciones',
                    data: [this.stats.accuracy, this.stats.assist, this.stats.intercepter, this.stats.fortitude, this.stats.mark, this.stats.powerShot],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        },
        options () {
            return {
                scale: {
                    angleLines: {
                        display: true
                    },
                    ticks: {
                        suggestedMin: 2,
                        suggestedMax: 10
                    }
                }
            }
        }
    },
    created () {
        window.eventBus.$on("updateChart", this.updateChart)
    },
    mounted () {
        this.ctx = document.getElementById("chart-skills")
        this.chart = new Chart(this.ctx, {
            type: 'radar',
            data: this.data,
            options: this.options
        })
    },
    methods: {
        updateChart () {
            this.chart.config.data.datasets = this.data.datasets
            this.chart.update()
        }
    }

}
</script>