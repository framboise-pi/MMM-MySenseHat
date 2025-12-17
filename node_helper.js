//===========================
//	Magic Mirror
//	Module: MMM-MySenseHat
//	https://github.com/framboise-pi/MMM-MySenseHat
//	Copyright(C) 2021 Cedric Camille Lafontaine http://www.framboise-pi.fr,
//	version 0.0.4
//===========================
const NodeHelper = require("node_helper");
const sense = require('sense-hat-led').sync;
const SenseHatSensors = require('./sensehat-sensors');
const si = require('systeminformation');
const compareVersions = require('compare-versions');

// ORIENTATION
sense.clear();
sense.setRotation(90);
sense.lowLight = true;


module.exports = NodeHelper.create({

	start: function() {
		// Initialize sensor instance
		this.sensors = new SenseHatSensors();
		this.sensorsInitialized = false;
		this.color1 = [255, 0, 0];
		this.color2 = [0, 255, 0];
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
		let o;
		if (place <= 2) { o = this.color1;}
		if (place >= 3)	{ o = this.color2;}
		const x = [0, 0, 0];//light off
		const digits = [
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
		const time_now = Date.now();
		const date_now = new Date(time_now);
		const now_minutes = date_now.getMinutes();
		const now_hours = date_now.getHours();
		this.color1 = this.ColorRandom();
		this.color2 = this.ColorRandom();
		let ab = "" + now_hours;
		let cd = "" + now_minutes;
		if (parseInt(ab) <= 10) ab = "0" + now_hours;
		if (parseInt(cd) <= 10) cd = "0" + now_minutes;
		const now_array = [
			ab.slice(0,1),
			ab.slice(1,2),
			cd.slice(0,1),
			cd.slice(1,2),
		]
		this.clockclock(now_array);
	},
//
	ColorRandom: function(payload){
		const randomeda = Math.floor(Math.random() * 256);
		const randomedb = Math.floor(Math.random() * 256);
		const randomedc = Math.floor(Math.random() * 256);
		return [randomeda, randomedb, randomedc];
	},
//
	PixelTemp: function(value_temp){
		// maintain red for temp
		const colora = this.ColorRandom();
		if (colora[0] >= 51) { colora[0] = 50 } 
		const colorb = this.ColorRandom();
		colorb[0] = 255;
		const array_pixel = [];
		let array_case = -1;
		let value_int = parseInt(value_temp);
		if (value_int > 64) { 
			this.PixelExclamation();
			return;
		}
		value_int = 64 - value_int;
		for(let i = 0; i < 64; i++){
		let colori = colora;
			if (i >= value_int) { colori = colorb; }
			array_case = array_case + 1;
			array_pixel[array_case] = colori;
			
		}
		sense.setPixels(array_pixel);
		
	},
//
	PixelExclamation: function(){
		const RR = this.ColorRandom();
		const OO = [0,0,0];
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
		const array_pixel = [];
		let array_case = -1;
		for(let i = 0; i < 64; i++){
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			
		}
		sense.setPixels(array_pixel);
		
	},
//
	PixelCpu: function(){
		sense.clear();
		let cpu_load = null;

		const red = [255,0,0];
		let x = -1;
		let y = 0;
		const timerCpu = setInterval(function() {
			si.currentLoad(data => {
			  cpu_load = data.currentload;
			});
			if (!cpu_load) return;
			x = x+1;
			let percent = cpu_load;
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
		let ram_total = 0;
		let ram_free = 0;

		const green = [0,255,0];
		let x = -1;
		let y = 0;
		const timerRam = setInterval(function() {
			si.mem(data => {
			  ram_free = data.available;// closest to lxtask values
			  ram_total = data.total;
			});
			let percent = (ram_free * 100) / ram_total;
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
		const array_pixel = [];
		let array_case = -1;
		
		for(let i=0; i < 4; i++){//0to7
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[7-array_case] = array_pixel[array_case];
		}
		array_case = 7;
		for(let i=0; i < 4; i++){//8to15
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[23-array_case] = array_pixel[array_case];
		}
		array_case = 15;
		for(let i=0; i < 4; i++){//16to23
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[39-array_case] = array_pixel[array_case];
		}	
		array_case = 23;
		for(let i=0; i < 4; i++){//24to31
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[55-array_case] = array_pixel[array_case];
		}		
		array_case = 31;
		for(let i=0; i < 4; i++){//32to39
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[71-array_case] = array_pixel[array_case];
		}			
		array_case = 39;
		for(let i=0; i < 4; i++){//40to47
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[87-array_case] = array_pixel[array_case];
		}			
		array_case = 47;
		for(let i=0; i < 4; i++){//48to55
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[103-array_case] = array_pixel[array_case];
		}		
		array_case = 55;
		for(let i=0; i < 4; i++){//56to63
			array_case = array_case + 1;
			array_pixel[array_case] = this.ColorRandom();
			array_pixel[119-array_case] = array_pixel[array_case];
		}				

		sense.setPixels(array_pixel);
	},
//

	sendlatestversion: function(payload){
		this.sendSocketNotification("MMM_MySenseHat_Latest_Version",payload);
	},
//
	socketNotificationReceived: function (notification, payload) {
		const self = this;

		if (notification === "MMM_MySenseHat_Version"){
			const https = require('https');
			
			https.get('https://raw.githubusercontent.com/framboise-pi/MMM-MySenseHat/master/package.json', (res) => {
				let data = '';
				
				res.on('data', (chunk) => {
					data += chunk;
				});
				
				res.on('end', () => {
					try {
						const pkg = JSON.parse(data);
						const version = pkg.version;
						const current = require('./package.json');
						
						// Return 1: new available / 0: same as github / -1: dev version
						const versionreturn = compareVersions(version, current.version);
						const payload = {
							last_version: version,
							installed: current.version,
							versionreturn: versionreturn
						};
						self.sendlatestversion(payload);
					} catch (err) {
						console.error('Failed to check version:', err);
					}
				});
			}).on('error', (err) => {
				console.error('Failed to fetch version from GitHub:', err);
			});
		}
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
			// Initialize sensors if not already done
			if (!this.sensorsInitialized) {
				this.sensors.init().then(() => {
					this.sensorsInitialized = true;
					this.readSensorData();
				}).catch((err) => {
					console.error('Failed to initialize sensors:', err);
				});
			} else {
				this.readSensorData();
			}
		}//#end if SensorsData
		//
		if (notification == "MMM_MySenseHat_PixelSlide"){
			const RR = this.ColorRandom();
			const EE = this.ColorRandom();//for eyes
			const OO = [0, 0, 0];//light off,
			const monsters = [
				[//1
				OO, OO, RR, RR, RR, RR, OO, OO,
				OO, RR, RR, RR, RR, RR, RR, OO,
				RR, RR, EE, RR, RR, EE, RR, RR,
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
				OO, RR, EE, OO, OO, EE, RR, OO,
				OO, RR, OO, OO, OO, OO, RR, OO,
				OO, RR, RR, RR, RR, RR, RR, OO,
				RR, RR, OO, OO, OO, OO, RR, RR,
				OO, RR, OO, OO, OO, OO, RR, OO
				],
				[//3
				OO, OO, RR, OO, OO, OO, RR, OO,
				OO, OO, RR, RR, RR, RR, RR, OO,
				OO, OO, RR, EE, RR, EE, RR, OO,
				OO, OO, RR, RR, RR, RR, RR, OO,
				OO, OO, RR, RR, RR, RR, RR, OO,
				OO, OO, RR, RR, RR, RR, RR, OO,
				OO, RR, OO, RR, OO, RR, OO, OO,
				RR, OO, RR, OO, RR, OO, RR, OO
				],
				[//4
				RR, OO, OO, OO, OO, OO, OO, RR,
				RR, RR, RR, RR, RR, RR, RR, RR,
				RR, OO, EE, OO, OO, EE, OO, RR,
				RR, OO, OO, OO, OO, OO, OO, RR,
				RR, RR, RR, RR, RR, RR, RR, RR,
				OO, OO, OO, RR, RR, OO, OO, OO,
				OO, OO, RR, RR, RR, RR, OO, OO,
				OO, RR, OO, OO, OO, OO, RR, OO
				],
				[//5
				OO, RR, OO, OO, OO, OO, RR, OO,
				OO, OO, RR, OO, OO, RR, OO, OO,
				OO, RR, EE, RR, RR, EE, RR, OO,
				OO, RR, RR, RR, RR, RR, RR, OO,
				OO, RR, OO, RR, RR, OO, RR, OO,
				OO, OO, RR, OO, OO, RR, OO, OO,
				OO, OO, RR, RR, RR, RR, OO, OO,
				OO, OO, OO, RR, RR, OO, OO, OO
				],
				[//6
				RR, OO, OO, OO, OO, OO, OO, RR,
				OO, RR, OO, OO, OO, OO, RR, OO,
				RR, OO, RR, OO, OO, RR, OO, RR,
				OO, RR, EE, RR, RR, EE, RR, OO,
				OO, OO, RR, OO, OO, RR, OO, OO,
				OO, RR, OO, OO, OO, OO, RR, OO,
				RR, RR, OO, OO, OO, OO, RR, RR,
				OO, RR, OO, RR, RR, OO, RR, OO
				],
				[//7
				OO, RR, RR, RR, RR, RR, RR, OO,
				OO, RR, EE, RR, RR, EE, RR, OO,
				OO, RR, RR, RR, RR, RR, RR, OO,
				OO, RR, OO, RR, RR, OO, RR, OO,
				RR, OO, OO, RR, RR, OO, OO, RR,
				OO, OO, OO, RR, RR, OO, OO, OO,
				OO, OO, OO, RR, RR, OO, OO, OO,
				OO, OO, RR, OO, OO, RR, OO, OO
				],
				[//8
				OO, RR, RR, RR, RR, RR, RR, OO,
				OO, OO, EE, RR, RR, EE, OO, OO,
				OO, OO, OO, RR, RR, RR, OO, OO,
				OO, RR, OO, RR, RR, OO, RR, OO,
				RR, OO, OO, OO, OO, OO, OO, RR,
				OO, OO, OO, OO, OO, OO, OO, OO,
				OO, OO, OO, RR, RR, OO, OO, OO,
				OO, OO, RR, OO, OO, RR, OO, OO
				],
				[//9
				OO, RR, RR, OO, OO, RR, RR, OO,
				OO, RR, EE, OO, OO, EE, RR, OO,
				OO, OO, RR, OO, OO, RR, OO, OO,
				OO, OO, RR, OO, OO, RR, OO, OO,
				OO, RR, RR, RR, RR, RR, RR, OO,
				RR, OO, RR, OO, OO, RR, OO, RR,
				OO, OO, OO, RR, RR, OO, OO, OO,
				OO, OO, RR, OO, OO, RR, OO, OO
				],
				[//10
				OO, OO, OO, OO, OO, OO, OO, OO,
				RR, RR, RR, OO, OO, RR, RR, RR,
				OO, OO, RR, OO, OO, RR, OO, OO,
				RR, RR, RR, RR, RR, RR, RR, RR,
				OO, RR, EE, RR, RR, EE, RR, OO,
				OO, RR, RR, OO, OO, RR, RR, OO,
				OO, RR, OO, OO, OO, OO, RR, OO,
				RR, RR, OO, OO, OO, OO, RR, RR
				]				
			]

			const randomed = Math.floor(Math.random() * monsters.length);
			sense.setPixels(monsters[randomed]);
		}//#end if SlidePixel
	},//#end socketNotificationReceived

	readSensorData: function() {
		this.sensors.getValue().then((data) => {
			const payload = {
				temp: data.temperature,
				humi: data.humidity,
				press: data.pressure,
				accex: data.accel.x.toFixed(4),
				accey: data.accel.y.toFixed(4),
				accez: data.accel.z.toFixed(4),
				gyrox: data.gyro.x.toFixed(4),
				gyroy: data.gyro.y.toFixed(4),
				gyroz: data.gyro.z.toFixed(4),
				compx: data.compass.x.toFixed(4),
				compy: data.compass.y.toFixed(4),
				compz: data.compass.z.toFixed(4)
			};
			this.sendSocketNotification('MMM_MySenseHat_SensorsData', payload);
		}).catch((err) => {
			console.error('Failed to read sensor data:', err);
		});
	}
	
});
