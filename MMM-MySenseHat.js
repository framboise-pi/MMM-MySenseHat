/* global Module */

/*	Magic Mirror
 *	Module: MMM-MySenseHat
 *	https://github.com/framboise-pi/MMM-MySenseHat
 *	Copyright(C) 2021 Cedric Camille Lafontaine http://www.framboise-pi.fr,
 *	version 0.0.4
 */

	
Module.register("MMM-MySenseHat",{
	// CONFIG
	defaults: {
		slide_interval: 30000,//ms as it refreshes clock/time : try keep <30 seconds)
			/*config: {
				read_interval : 20000,
				display_start_LED: false,
				use_SenseHat_LED: true,
				show_all_sensors: false,
				mode_monster: true,
				mode_clock: true,
				mode_pixel1: false,
				mode_pixelv: true,
				mode_temp: true,
				cpu_load: true,
				ram_used: true,
				fontsize: "normal"//small | normal | large | xlarge
				}*/

	},
	// DATA DISPLAY STARTUP VALUE
	SensorsData: {
		temp: "<sup>-N/A-</sup>",
		humi: "<sup>-N/A-</sup>",
		press: "<sup>-N/A-</sup>",
		accex: "<sup>-N/A-</sup>",
		accey: "<sup>-N/A-</sup>",
		accez: "<sup>-N/A-</sup>",
		gyrox: "<sup>-N/A-</sup>",
		gyroy: "<sup>-N/A-</sup>",
		gyroz: "<sup>-N/A-</sup>",
		compx: "<sup>-N/A-</sup>",
		compy: "<sup>-N/A-</sup>",
		compz: "<sup>-N/A-</sup>"
	},
	//VARIABLES USED
	round: 0,//pixelart|clock|temp value|weather|...
	last_version: null,
	installed: null,
	versiontimer: true,
	versionreturn: null,

	// CSS
	getStyles: function () {
		return ["MMM-MySenseHat.css", "font-awesome.css"];
	},
	//
	start: function() {
		const self = this;
		if (this.config.display_start_LED == true) this.sendSocketNotification("MMM_MySenseHat_LoadingTxt");
		this.askdata();
		if (this.config.use_SenseHat_LED == true) self.autochangemode();
		this.checkversion();
	},
    //
    checkversion: function(){
		const self = this;
		setTimeout(function() {
			self.sendSocketNotification("MMM_MySenseHat_Version");
		}, 5000);
		/* OPTION to hide versions tags after 2min timeout
		setTimeout(function(){
			self.versiontimer = false;
			
		}, 120 * 1000);*/
		
	},
	//AUTO CHANGE MODE
	autochangemode: function () {
		const self = this;
		setInterval(function() {
			
			self.zeloop();
		}, self.config.slide_interval);
		
	},
	// LOOP WITHIN MODES
	zeloop: function (){
		const self = this;
		self.round = self.round + 1;
			if (self.round == 1)
			{
				if (self.config.mode_monster) { self.pixelslide(); }
				else self.round = 2;
			}
			if (self.round == 2 )
			{
				if (self.config.mode_clock) { 
					self.sendSocketNotification("MMM_MySenseHat_Clock"); }
				else self.round = 3;
			}
			if (self.round == 3 )
			{
				if (self.config.mode_pixel1) { 
					self.sendSocketNotification("MMM_MySenseHat_Random1x1"); }
				else self.round = 4;
			}
			if (self.round == 4 )
			{
				if (self.config.mode_pixelv) { 
					self.sendSocketNotification("MMM_MySenseHat_RandomV"); }
				else self.round = 5;
			}
			if (self.round == 5 )
			{
				if (self.config.mode_temp) { 
					self.sendSocketNotification("MMM_MySenseHat_PixelTemp", self.SensorsData.temp); }
				else self.round = 6;
			}
			if (self.round == 6 )
			{
				if (self.config.cpu_load) { 
					self.sendSocketNotification("MMM_MySenseHat_PixelCpu"); }
				else self.round = 7;
			}
			if (self.round == 7 )
			{
				if (self.config.ram_used) { 
					self.sendSocketNotification("MMM_MySenseHat_PixelRam"); }
				else {
					self.round = 0;
					self.zeloop();
				}
			}
		
	},
	//ASK FOR SENSORS DATA
	askdata: function () {
		const self = this;
		setInterval(function() {
			self.sendSocketNotification("MMM_MySenseHat_ReadSensors");
			self.updateDom();
			}, self.config.read_interval);
	},
	//SLIDESHOW LED
	pixelslide: function () {
		this.sendSocketNotification("MMM_MySenseHat_PixelSlide");
	},
	//
	socketNotificationReceived: function (notification, payload) {
		if (notification === "MMM_MySenseHat_Latest_Version"){
			//var self = this;
			this.last_version = payload.last_version
			this.installed = payload.installed
			this.versionreturn = payload.versionreturn
		}
		if (notification === "MMM_MySenseHat_SensorsData"){
		//TEMP-HUMIDITY-PRESSION
			this.SensorsData.temp = Math.round(payload.temp*100)/100
			this.SensorsData.humi = Math.round(payload.humi*100)/100
			this.SensorsData.press = Math.round(payload.press*100)/100
		//ACCELERATOR XYZ
			this.SensorsData.accex = Math.round(payload.accex*100)/100
			this.SensorsData.accey = Math.round(payload.accey*100)/100
			this.SensorsData.accez = Math.round(payload.accez*100)/100
		//GYYROSCOPE XYZ
			this.SensorsData.gyrox = Math.round(payload.gyrox*100)/100
			this.SensorsData.gyroy = Math.round(payload.gyroy*100)/100
			this.SensorsData.gyroz = Math.round(payload.gyroz*100)/100
		//COMPASS XYZ
			this.SensorsData.compx = Math.round(payload.compx*100)/100
			this.SensorsData.compy = Math.round(payload.compy*100)/100
			this.SensorsData.compz = Math.round(payload.compz*100)/100
		}
	},
	//#end socketNotif SensorsData
	getDom: function() {
		const self = this;
		const wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "thin " + this.config.fontsize + " bright pre-line";
	  let ihtml =  "<div class='container'>"
		ihtml += "<div class='line'><sup> humidité </sup> <i class=\"fa fa-tint\" style=\"color:#50FCFF\"></i> " + this.SensorsData.humi + " %</div>"
		ihtml += "<div class='line'><sup> température </sup> <i class=\"fa fa-thermometer-empty\" style=\"color:#FF8A50\"></i> " + this.SensorsData.temp + " °C</div>"
		ihtml += "<div class='line'><sup> pression </sup> <i class=\"fa fa-cloud\" style=\"color:#EFEFEF\"></i> " + this.SensorsData.press + " mbar</div>"
		if (this.config.show_all_sensors) {
		ihtml += "<div class='line'><sup> compas </sup> <i class=\"fa fa-compass\" style=\"color:#CD1C00\"></i>  " + this.SensorsData.compx + "<sup>X</sup> | " + this.SensorsData.compy + "<sup>Y</sup> | " + this.SensorsData.compz + "<sup>Z</sup> µT</div>"
		//ihtml += "<div class='line'><sup> fusion </sup> <i class=\"fa fa-compass\" style=\"color:#CD1C00\"></i>  " + this.SensorsData.fusix + "<sup>X</sup> | " + this.SensorsData.fusiy + "<sup>Y</sup> | " + this.SensorsData.fusiz + "<sup>Z</sup></div>"
		ihtml += "<div class='line'><sup> gyroscope </sup> <i class=\"fa fa-arrows-alt\" style=\"color:#FAFF8E\"></i>  " + this.SensorsData.gyrox + "<sup>X</sup> | " + this.SensorsData.gyroy + "<sup>Y</sup> | " + this.SensorsData.gyroz + "<sup>Z</sup> rad/sec</div>"
		ihtml += "<div class='line'><sup> accélération </sup> <i class=\"fa fa-dashboard\" style=\"color:#A6FF8E\"></i>  " + this.SensorsData.accex + "<sup>X</sup> | " + this.SensorsData.accey + "<sup>Y</sup> | " + this.SensorsData.accez + "<sup>Z</sup> G</div>"
		}
		if (this.versiontimer && this.last_version != null)
		{
			ihtml += "<div class='leftline'><sup> <i class=\"fa fa-github\" style=\"color:#A6FF8E\"></i>  " + self.last_version + "</sup></div>"
			ihtml += "<div class='leftline'><sup> <i class=\"fa fa-files-o\" style=\"color:#A6FF8E\"></i>  " + self.installed + "</sup></div>"
			if (self.versionreturn == 0){
				ihtml += "<div class='leftline'><sup> <i class=\"fa fa-check-circle\" style=\"color:#A6FF8E\"></i> UP TO DATE </sup> </div>"
			}
			if (self.versionreturn == 1){
				ihtml += "<div class='leftline'><sup> <i class=\"fa fa-plus-circle\" style=\"color:#A6FF8E\"></i> NEW version available </sup>  </div>"				
			}
			if (self.versionreturn == -1){
				ihtml += "<div class='leftline'><sup> <i class=\"fa fa-user-secret\" style=\"color:#A6FF8E\"></i> DEV version ! </sup>  </div>"				
			}
		}
		ihtml += "</div>"
		wrapper.innerHTML = ihtml
		return wrapper
	},
});
