//===========================
//	Magic Mirror
//	Module: MMM-MySenseHat
//	https://github.com/framboise-pi/MMM-MySenseHat
//	Copyright(C) 2020 Cedric Camille Lafontaine http://www.framboise-pi.fr,
//	version 0.0.1
//===========================
var NodeHelper = require("node_helper");
const request = require('request');
const sense = require('sense-hat-led').sync;
const imu = require('node-sense-hat').Imu;
const IMU = new imu.IMU();
var Random = require('java-random');
//var fs = require('fs');
// ORIENTATION
sense.clear();
sense.setRotation(270);
sense.lowLight = true;

color1 = [255,0,0];
color2 = [0,255,0,0];
//

//
module.exports = NodeHelper.create({

	start: function() {

	},
//
	clockclock: function(payload){
		var self = this;

		num_a = parseInt(payload[0]);
		num_b = parseInt(payload[1]);
		num_c = parseInt(payload[2]);
		num_d = parseInt(payload[3]);
		
		if (!num_b) { num_b = num_a; num_a = 0; }
		if (!num_d) { num_d = num_c; num_c = 0; }
			
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
	if (now_hours.length == 1) ab = "0" + now_hours;
	if (now_minutes.length == 1) cd = "0" + now_minutes;
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
	socketNotificationReceived: function (notification, payload) {
		//
		var self = this;
		if (notification === "MMM_MySenseHat_LoadingTxt"){
			sense.flashMessage("MAGIC", 0.5);
			sense.sleep(0.7);
			sense.clear();
		}
		//
		if (notification === "MMM_MySenseHat_Clock"){
			self.clock();
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
				[
				OO, OO, RR, RR, RR, RR, OO, OO,
				OO, RR, RR, RR, RR, RR, RR, OO,
				RR, RR, OO, RR, RR, OO, RR, RR,
				RR, RR, RR, RR, RR, RR, RR, RR,
				RR, RR, RR, RR, RR, RR, RR, RR,
				OO, RR, RR, OO, OO, RR, RR, OO,
				OO, RR, RR, OO, OO, RR, RR, OO,
				OO, RR, OO, OO, OO, OO, RR, OO
				],
				[
				OO, OO, OO, OO, OO, OO, OO, OO,
				OO, RR, RR, RR, RR, RR, RR, OO,
				OO, RR, OO, OO, OO, OO, RR, OO,
				OO, RR, RR, OO, OO, RR, RR, OO,
				OO, RR, OO, OO, OO, OO, RR, OO,
				OO, RR, RR, RR, RR, RR, RR, OO,
				RR, RR, OO, OO, OO, OO, RR, RR,
				OO, RR, OO, OO, OO, OO, RR, OO
				],
				[
				OO, OO, RR, OO, OO, OO, RR, OO,
				OO, OO, RR, RR, RR, RR, RR, OO,
				OO, OO, RR, OO, RR, OO, RR, OO,
				OO, OO, RR, RR, RR, RR, RR, OO,
				OO, OO, RR, RR, RR, RR, RR, OO,
				OO, OO, RR, RR, RR, RR, RR, OO,
				OO, RR, OO, RR, OO, RR, OO, OO,
				RR, OO, RR, OO, RR, OO, RR, OO
				]
			]

		r = new Random();
		randomed = r.nextInt(monsters.length);
		sense.setPixels(monsters[randomed]);
		}//#end if SlidePixel
	}//#end socketNotificationReceived
	
});
