$(function() {
    "use strict";

     // chart 1
	 
		  var ctx = document.getElementById('chart1').getContext('2d');
		
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
					datasets: [{
						label: 'Sản phẩm 3 sao',
						data: [3, 3, 8, 5, 7, 4, 6, 4, 6, 3],
						backgroundColor: 'rgba(255, 255, 255, 0.6)', //trắng
						// backgroundColor: "rgba(255, 255, 255, 0.25)", //tối màu
						// backgroundColor: "rgba(44, 214, 153, 0.5)", //xanh
						borderColor: "transparent",
						pointRadius :"0",
						borderWidth: 3
					}, {
						label: 'Sản phẩm 4 sao',
						data: [7, 5, 14, 7, 12, 6, 10, 6, 11, 5],
						// backgroundColor: "rgba(255, 255, 255, 0.25)", //tối màu
						// backgroundColor: 'rgba(255, 255, 255, 0.6)', //trắng
						backgroundColor: "rgba(44, 214, 153, 0.5)", //xanh
						borderColor: "transparent",
						pointRadius :"0",
						borderWidth: 1
					}, {
						label: 'Sản phẩm 5 sao',
						data: [7, 9, 3, 14, 2, 3, 15, 6, 3, 9],
						// backgroundColor: "rgba(44, 214, 153, 0.5)", //xanh
						// backgroundColor: 'rgba(255, 255, 255, 0.6)',  //trắng
						backgroundColor: "rgba(255, 255, 255, 0.25)", //tối màu
						borderColor: "transparent",
						pointRadius :"0",
						borderWidth: 1
					}]
				},
			options: {
				maintainAspectRatio: false,
				legend: {
				  display: false,
				  labels: {
					fontColor: '#ddd',  
					boxWidth:40
				  }
				},
				tooltips: {
				  displayColors:false
				},	
			  scales: {
				  xAxes: [{
					ticks: {
						beginAtZero:true,
						fontColor: '#ddd'
					},
					gridLines: {
					  display: true ,
					  color: "rgba(221, 221, 221, 0.08)"
					},
				  }],
				   yAxes: [{
					ticks: {
						beginAtZero:true,
						fontColor: '#ddd'
					},
					gridLines: {
					  display: true ,
					  color: "rgba(221, 221, 221, 0.08)"
					},
				  }]
				 }

			 }
			});  
		
		
    // chart 2

		var ctx = document.getElementById("chart2").getContext('2d');
			var myChart = new Chart(ctx, {
				type: 'doughnut',
				data: {
					labels: ["Thành phố Thái Bình", "Huyện Vũ Thư", "Huyện Quỳnh Phụ", "Huyện Hưng Hà", "Huyện Đông Hưng", "Huyện Thái Thuỵ", "Huyện Tiền Hải", "Huyện Kiến Xương"],
					datasets: [{
						backgroundColor: [
							"#ffffff", //thành phố
							"rgba(255, 255, 255, 0.70)", //vũ thư
							"rgba(255, 255, 255, 0.50)", //quỳnh phụ
							"rgba(255, 255, 255, 0.20)", //hưng hà
							"rgba(255, 255, 255, 0.80)", //đông hưng
							"rgba(80, 193, 255, 0.7)", //thái thuỵ
							"rgba(255, 0, 40, 0.6)", //tiền hải
							"rgba(44, 214, 153, 0.8)", //kiến xương
						],
						data: [5856, 2602, 1802, 1105, 1105, 1105, 1105, 1105],
						borderWidth: [0, 0, 0, 0]
					}]
				},
			options: {
				maintainAspectRatio: false,
			   legend: {
				 position :"bottom",	
				 display: false,
				    labels: {
					  fontColor: '#ddd',  
					  boxWidth:15
				   }
				}
				,
				tooltips: {
				  displayColors:false
				}
			   }
			});
		

		
		
   });	 
   