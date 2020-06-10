//===========================
//	Magic Mirror
//	Module: MMM-MySenseHat
//	https://github.com/framboise-pi/MMM-MySenseHat
//	Copyright(C) 2020 Cedric Camille Lafontaine http://www.framboise-pi.fr,
//	version 0.0.2
//===========================
var NodeHelper = require("node_helper");
const request = require('request');
const sense = require('sense-hat-led').sync;
const imu = require('node-sense-hat').Imu;
const IMU = new imu.IMU();
var Random = require('java-random');
const si = require('systeminformation');

// ORIENTATION
sense.clear();
sense.setRotation(270);
sense.lowLight = true;

color1 = [255,0,0];
color2 = [0,255,0,0];
//


module.exports = NodeHelper.create({

	start: function() {

	},
//
//
	clockclock: function(payload){
		var self = this;

		num_a = parseInt(payload[0]);
		num_b = parseInt(payload[1]);
		num_c = parseInt(payload[2]);
		num_d = parseInt(payload[3]);
		
		
		num_1 = this.getdigit(num_a,1);
		num_2 = this.getdigit(num_b,2);
		num_3 = this.getdigit(num_c,3);
		num_4 = this.getdigit(num_d,4);
		
		rowz_1a = num_1[0];
		rowz_1b = num_1[1];
		rowz_1c = num_1[2];
		rowz_1d = num_1[3];

		rowz_2a = num_2[0];
		rowz_2b = num_2[1];
		rowz_2c = num_2[2];
		rowz_2d = num_2[3];

		rowz_3a = num_3[0];
		rowz_3b = num_3[1];
		rowz_3c = num_3[2];
		rowz_3d = num_3[3];

		rowz_4a = num_4[0];
		rowz_4b = num_4[1];
		rowz_4c = num_4[2];
		rowz_4d = num_4[3];
		
		zeclock = [
			rowz_1a[0],rowz_1a[1],rowz_1a[2],rowz_1a[3],rowz_2a[0],rowz_2a[1],rowz_2a[2],rowz_2a[3],
			rowz_1b[0],rowz_1b[1],rowz_1b[2],rowz_1b[3],rowz_2b[0],rowz_2b[1],rowz_2b[2],rowz_2b[3],
			rowz_1c[0],rowz_1c[1],rowz_1c[2],rowz_1c[3],rowz_2c[0],rowz_2c[1],rowz_2c[2],rowz_2c[3],
			rowz_1d[0],rowz_1d[1],rowz_1d[2],rowz_1d[3],rowz_2d[0],rowz_2d[1],rowz_2d[2],rowz_2d[3],
			rowz_3a[0],rowz_3a[1],rowz_3a[2],rowz_3a[3],rowz_4a[0],rowz_4a[1],rowz_4a[2],rowz_4a[3],
			rowz_3b[0],rowz_3b[1],rowz_3b[2],rowz_3b[3],rowz_4b[0],rowz_4b[1],rowz_4b[2],rowz_4b[3],
			rowz_3c[0],rowz_3c[1],rowz_3c[2],rowz_3c[3],rowz_4c[0],rowz_4c[1],rowz_4c[2],rowz_4c[3],
			rowz_3d[0],rowz_3d[1],rowz_3d[2],rowz_3d[3],rowz_4d[0],rowz_4d[1],rowz_4d[2],rowz_4d[3],
		]
		
		sense.setPixels(zeclock);
		
	},
//
	getdigit: function(num, place){

		var self = this;
		if (place <= 2) { o = self.color1;}
		if (place >= 3)	{ o = self.color2;}
		x = [0, 0, 0];//light off
		digits = [
			[[x,x,x,x],[x,o,o,o],[x,o,x,o],[x,o,o,o],],
			[[x,o,o,x],[x,x,o,x],[x,x,o,x],[x,x,o,x],],
			[[x,o,o,x],[x,x,x,o],[x,x,o,x],[x,o,o,o],],
			[[x,o,o,o],[x,x,x,o],[x,x,o,o],[x,o,o,o],],
			[[x,x,x,o],[x,o,x,o],[x,o,o,o],[x,x,x,o],],
			[[x,o,o,o],[x,o,o,x],[x,x,x,o],[x,o,o,x],],
			[[x,o,x,x],[x,o,o,x],[x,o,x,o],[x,x,o,x],],
			[[x,o,o,o],[x,x,x,o],[x,x,o,x],[x,x,o,x],],
			[[x,x,o,x],[x,o,o,o],[x,o,o,o],[x,x,o,x],],
			[[x,x,o,x],[x,o,x,o],[x,x,o,o],[x,x,x,o],]
		]
		return digits[num];
	},
//	
	clock: function(){
    let time_now = Date.now();
    date_now = new Date(time_now);
    now_minutes = date_now.getMinutes();
	now_hours = date_now.getHours();
	this.color1 = this.ColorRandom();
	this.color2 = this.ColorRandom();
	ab = "" + now_hours;
	cd = "" + now_minutes;
	if (parseInt(ab) <= 10) ab = "0" + now_hours;
	if (parseInt(cd) <= 10) cd = "0" + now_minutes;
	now_array = [
		ab.slice(0,1),
		ab.slice(1,2),
		cd.slice(0,1),
		cd.slice(1,2),
		]
	this.clockclock(now_array);
	},
//
	ColorRandom: function(payload){
		ra = new Random();
		randomeda = ra.nextInt(256);
		rb = new Random();
		randomedb = rb.nextInt(256);
		rc = new Random();
		randomedc = rc.nextInt(256);
		randomed = [randomeda,randomedb,randomedc];
		return randomed;
	},
//
	PixelTemp: function(value_temp){
		// maintain red for temp
		var self = this;
		colora = this.ColorRandom();
		if (colora[0] >= 51) { colora[0] = 50 } 
		colorb = this.ColorRandom();
		colorb[0] = 255;
		array_pixel = [];
		array_case = -1;
		value_int = parseInt(value_temp);
		if (value_int > 64) { 
			self.PixelExclamation();
			return;
			}
		value_int = 64 - value_int;
		for(var i = 0; i < 64;i++){
			colori = colora;
			if (i >= value_int) { colori = colorb; }
			array_case = array_case + 1;
			array_pixel[array_case] = colori;
			
		}
		sense.setPixels(array_pixel);
		
	},
//
	PixelExclamation: function(){
		RR = this.ColorRandom();
		OO = [0,0,0];
		const exclamation = [
			OO, OO, OO, RR, RR, OO, OO, OO,
			OO, OO, OO, RR, RR, OO, OO, OO,
			OO, OO, OO, RR, RR, OO, OO, OO,
			OO, OO, OO, RR, RR, OO, OO, OO,
			OO, OO, OO, RR, RR, OO, OO, OO,
			OO, OO, OO, OO, OO, OO, OO, OO,
			OO, OO, OO, RR, RR, OO, OO, OO,
			OO, OO, OO, OO, OO, OO, OO, OO
			];
			
		sense.setPixels(exclamation);
		
	},
//
//
	MakeRandomPixelArt: function(){
		array_pixel = [];
		array_case = -1;
		for(var i = 0; i < 64;i++){
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			
		}
		sense.setPixels(array_pixel);
		
	},
//
	PixelCpu: function(){
		sense.clear();
		cpu_load = null;

		red = [255,0,0];
		x = -1;
		y = 0;
		timerCpu = setInterval(function() {
			si.currentLoad(data => {
			  cpu_load = data.currentload;
			});
			if (!cpu_load) return;
			x = x+1;
			percent = cpu_load;
			percent = Math.round(percent*100)/100
			if (percent <= 12) { y = 7;  red[0] = 100;}
			if (percent > 12 && percent <= 25) { y = 6; red[0] = 120;}
			if (percent > 25 && percent <= 37) { y = 5; red[0] = 140;}
			if (percent > 37 && percent <= 40) { y = 4; red[0] = 160;}
			if (percent > 40 && percent <= 52) { y = 3; red[0] = 180;}
			if (percent > 52 && percent <= 65) { y = 2; red[0] = 200;}
			if (percent > 65 && percent <= 77) { y = 1; red[0] = 220;}
			if (percent > 77 && percent <= 100) { y = 0;}
			//sense.showMessage(percent.toString(), 0.2);
			sense.setPixel(x,y,red);
				if (x >= 7) {x = -1; sense.clear();}
		}, 1000);
		setTimeout(function() {
			clearInterval(timerCpu);
		}, 28000);
		
	},
//
//
	PixelRam: function(){
		sense.clear();
		ram_total = 0;
		ram_free = 0;

		green = [0,255,0];
		x = -1;
		y = 0;
		timerRam = setInterval(function() {
			si.mem(data => {
			  ram_free = data.available;// closest to lxtask values
			  ram_total = data.total;
			});
			percent = (ram_free * 100) / ram_total;
			percent = Math.round(percent*100)/100
			if (!percent) return;
			x = x+1;
			if (percent <= 12) { y = 0; }
			if (percent > 12 && percent <= 25) { y = 1; green[1] = 220;}
			if (percent > 25 && percent <= 37) { y = 2; green[1] = 200;}
			if (percent > 37 && percent <= 40) { y = 3; green[1] = 180;}
			if (percent > 40 && percent <= 52) { y = 4; green[1] = 160;}
			if (percent > 52 && percent <= 65) { y = 5; green[1] = 140;}
			if (percent > 65 && percent <= 77) { y = 6; green[1] = 120;}
			if (percent > 77 && percent <= 100) { y = 7; green[1] = 100;}
			//sense.showMessage(percent.toString(), 0.2);
			sense.setPixel(x,y,green);
				if (x >= 7) {x = -1; sense.clear();}
		}, 1000);
		setTimeout(function() {
			clearInterval(timerRam);
		}, 28000);
		
	},
//
	MakeRandomPixelArtV: function(){
		array_pixel = [];
		array_case = -1;
		
		for(var i=0; i < 4;i++){//0to7
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[7-array_case] = array_pixel[array_case];
		}
		array_case = 7;
		for(var i=0; i < 4;i++){//8to15
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[23-array_case] = array_pixel[array_case];
		}
		array_case = 15;
		for(var i=0; i < 4;i++){//16to23
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[39-array_case] = array_pixel[array_case];
		}	
		array_case = 23;
		for(var i=0; i < 4;i++){//24to31
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[55-array_case] = array_pixel[array_case];
		}		
		array_case = 31;
		for(var i=0; i < 4;i++){//32to39
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[71-array_case] = array_pixel[array_case];
		}			
		array_case = 39;
		for(var i=0; i < 4;i++){//40to47
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[87-array_case] = array_pixel[array_case];
		}			
		array_case = 47;
		for(var i=0; i < 4;i++){//48to55
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[103-array_case] = array_pixel[array_case];
		}		
		array_case = 55;
		for(var i=0; i < 4;i++){//56to63
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[119-array_case] = array_pixel[array_case];
		}				

		sense.setPixels(array_pixel);
	},
//
	socketNotificationReceived: function (notification, payload) {
		//
		var self = this;
		if (notification === "MMM_MySenseHat_PixelCpu"){
			self.PixelCpu();
		}
		if (notification === "MMM_MySenseHat_PixelRam"){
			self.PixelRam();
		}
		if (notification === "MMM_MySenseHat_LoadingTxt"){
			sense.flashMessage("MAGIC", 0.5);
			sense.sleep(0.7);
			sense.clear();
		}
		//
		if (notification === "MMM_MySenseHat_Clock"){
			self.clock();
		}
		//PixelTemp
		if (notification === "MMM_MySenseHat_PixelTemp"){
			self.PixelTemp(payload);
		}
		//
		if (notification === "MMM_MySenseHat_Random1x1"){
			self.MakeRandomPixelArt();
		}
		//
		if (notification === "MMM_MySenseHat_RandomV"){
			self.MakeRandomPixelArtV();
		}
		//
		if (notification === "MMM_MySenseHat_ReadSensors"){
			IMU.getValue((err, data) => {
				if (err !== null) {
				return;
				}
				//JSON-string
				accejson = JSON.stringify(data.accel, null, "  ");
				gyrojson = JSON.stringify(data.gyro, null, "  ");
				compjson = JSON.stringify(data.compass, null, "  ");
				//ACCEL separate 3 informations
				accejson = accejson.replace(new RegExp(':','g'),"");
				accejson = accejson.replace(new RegExp('{','g'),"");
				accejson = accejson.replace(new RegExp('}','g'),"");
				acceList = accejson.split(",");
				acce_x = acceList[0].substring(6);
				acce_y = acceList[1].substring(6);
				acce_z = acceList[2].substring(6);
				//GYROSCOPE separate 3 informations
				gyrojson = gyrojson.replace(new RegExp(':','g'),"");
				gyrojson = gyrojson.replace(new RegExp('{','g'),"");
				gyrojson = gyrojson.replace(new RegExp('}','g'),"");
				gyroList = gyrojson.split(",");
				gyro_x = gyroList[0].substring(6);
				gyro_y = gyroList[1].substring(6);
				gyro_z = gyroList[2].substring(6);
				//COMPASS separate 3 informations
				compjson = compjson.replace(new RegExp(':','g'),"");
				compjson = compjson.replace(new RegExp('{','g'),"");
				compjson = compjson.replace(new RegExp('}','g'),"");
				compList = compjson.split(",");
				comp_x = compList[0].substring(6);
				comp_y = compList[1].substring(6);
				comp_z = compList[2].substring(6);
			  //
			  payload= {
				  temp: data.temperature,
				  humi: data.humidity,
				  press: data.pressure,
				  accex: acce_x,
				  accey: acce_y,
				  accez: acce_z,
				  gyrox: gyro_x,
				  gyroy: gyro_y,
				  gyroz: gyro_z,
				  compx: comp_x,
				  compy: comp_y,
				  compz: comp_z
				}//#end payload
				this.sendSocketNotification('MMM_MySenseHat_SensorsData',payload);
			});
		}//#end if SensorsData
		//
		if (notification == "MMM_MySenseHat_PixelSlide"){
			RR = this.ColorRandom();
			OO = [0, 0, 0];//light off,
			const monsters = [
				[//1
				OO, OO, RR, RR, RR, RR, OO, OO,
				OO, RR, RR, RR, RR, RR, RR, OO,
				RR, RR, OO, RR, RR, OO, RR, RR,
				RR, RR, RR, RR, RR, RR, RR, RR,
				RR, RR, RR, RR, RR, RR, RR, RR,
				OO, RR, RR, OO, OO, RR, RR, OO,
				OO, RR, RR, OO, OO, RR, RR, OO,
				OO, RR, OO, OO, OO, OO, RR, OO
				],
				[//2
				OO, OO, OO, OO, OO, OO, OO, OO,
				OO, RR, RR, RR, RR, RR, RR, OO,
				OO, RR, OO, OO, OO, OO, RR, OO,
				OO, RR, RR, OO, OO, RR, RR, OO,
				OO, RR, OO, OO, OO, OO, RR, OO,
				OO, RR, RR, RR, RR, RR, RR, OO,
				RR, RR, OO, OO, OO, OO, RR, RR,
				OO, RR, OO, OO, OO, OO, RR, OO
				],
				[//3
				OO, OO, RR, OO, OO, OO, RR, OO,
				OO, OO, RR, RR, RR, RR, RR, OO,
				OO, OO, RR, OO, RR, OO, RR, OO,
				OO, OO, RR, RR, RR, RR, RR, OO,
				OO, OO, RR, RR, RR, RR, RR, OO,
				OO, OO, RR, RR, RR, RR, RR, OO,
				OO, RR, OO, RR, OO, RR, OO, OO,
				RR, OO, RR, OO, RR, OO, RR, OO
				],
				[//4
				RR, OO, OO, OO, OO, OO, OO, RR,
				RR, RR, RR, RR, RR, RR, RR, RR,
				RR, OO, RR, OO, OO, RR, OO, RR,
				RR, OO, OO, OO, OO, OO, OO, RR,
				RR, RR, RR, RR, RR, RR, RR, RR,
				OO, OO, OO, RR, RR, OO, OO, OO,
				OO, OO, RR, RR, RR, RR, OO, OO,
				OO, RR, OO, OO, OO, OO, RR, OO
				],
				[//5
				OO, RR, OO, OO, OO, OO, RR, OO,
				OO, OO, RR, OO, OO, RR, OO, OO,
				OO, RR, OO, RR, RR, OO, RR, OO,
				OO, RR, RR, RR, RR, RR, RR, OO,
				OO, OO, OO, RR, RR, RR, RR, OO,
				OO, OO, RR, OO, OO, RR, OO, OO,
				OO, OO, RR, RR, RR, RR, OO, OO,
				OO, OO, OO, RR, RR, OO, OO, OO
				],
				[//6
				RR, OO, OO, OO, OO, OO, OO, RR,
				OO, RR, OO, OO, OO, OO, RR, OO,
				RR, OO, RR, OO, OO, RR, OO, RR,
				OO, RR, OO, RR, RR, OO, RR, OO,
				OO, OO, RR, OO, OO, RR, OO, OO,
				OO, RR, OO, OO, OO, OO, RR, OO,
				RR, RR, OO, OO, OO, OO, RR, RR,
				OO, RR, OO, RR, RR, OO, RR, OO
				]
			]

		r = new Random();
		randomed = r.nextInt(monsters.length);
		sense.setPixels(monsters[randomed]);
		}//#end if SlidePixel
	}//#end socketNotificationReceived
	
});
