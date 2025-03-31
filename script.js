const ctx1 = document.getElementById("lineChart").getContext("2d");
const ctx2 = document.getElementById("barChart").getContext("2d");
const ctx3 = document.getElementById("pieChart").getContext("2d");

// Sample data (Replace this with real data from an API)
const labels = [];
const pageViews = [];
const uniqueVisitors = [];
const bounceRates = [];

const startDate = new Date(2000, 2, 20); // March 20, 2000
const totalDays = 100;

for (let i = 0; i < totalDays; i++) {
    let currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    labels.push(currentDate.toISOString().split('T')[0]); // YYYY-MM-DD format
    pageViews.push(Math.floor(Math.random() * 2000) + 800); // Random page views (800 - 2800)
    uniqueVisitors.push(Math.floor(pageViews[i] * (0.6 + Math.random() * 0.2))); // 60-80% of page views
    bounceRates.push(Math.floor(Math.random() * 30) + 30); // Bounce rate between 30-60%
}

console.log({ labels, pageViews, uniqueVisitors, bounceRates });



// Line Chart - Page Views Over Time
new Chart(ctx1, {
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: "Page Views",
            data: pageViews,
            borderColor: "blue",
            fill: false,
        }]
    }
});

// Bar Chart - Unique Visitors
new Chart(ctx2, {
    type: "bar",
    data: {
        labels: labels,
        datasets: [{
            label: "Unique Visitors",
            data: uniqueVisitors,
            backgroundColor: "green"
        }]
    }
});

// Pie Chart - Bounce Rate Distribution
new Chart(ctx3, {
    type: "pie",
    data: {
        labels: labels,
        datasets: [{
            data: bounceRates,
            backgroundColor: ["red", "blue", "yellow", "orange", "purple"]
        }]
    }
});

function downloadChart(chartId, filename) {
    const canvas = document.getElementById(chartId);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = filename;
    link.click();
};

function downloadCSV() {
    let csvContent = "Date,Page Views,Unique Visitors,Bounce Rate\n";
    
    for (let i = 0; i < labels.length; i++) {
        csvContent += `${labels[i]},${pageViews[i]},${uniqueVisitors[i]},${bounceRates[i]}\n`;
    }

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Website_Traffic_Data.csv";
    link.click();
};

