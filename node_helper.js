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
// ROTATION
sense.clear();
sense.setRotation(270);
sense.lowLight = true;
//COLORS
const RR = [255, 0, 0];
const GG = [0, 255, 0];
const BB = [0, 0, 255];
const OO = [0, 0, 0];
//
module.exports = NodeHelper.create({

	start: function() {

	},
//
	socketNotificationReceived: function (notification, payload) {
		//
		if (notification == "MMM_MySenseHat_LoadingTxt"){
			sense.flashMessage("MAGIC", 0.5);
			sense.sleep(0.7);
			sense.clear();
		}
		//
		if (notification == "MMM_MySenseHat_ReadSensors"){
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
		const monster_01 = [
		OO, OO, RR, RR, RR, RR, OO, OO,
		OO, RR, RR, RR, RR, RR, RR, OO,
		RR, RR, OO, RR, RR, OO, RR, RR,
		RR, RR, RR, RR, RR, RR, RR, RR,
		RR, RR, RR, RR, RR, RR, RR, RR,
		OO, RR, RR, OO, OO, RR, RR, OO,
		OO, RR, RR, OO, OO, RR, RR, OO,
		OO, RR, OO, OO, OO, OO, RR, OO
		];
		sense.setPixels(monster_01);
		sense.sleep(5);
		sense.clear();
		}//#end if SlidePixel
	}//#end socketNotificationReceived
	
});
