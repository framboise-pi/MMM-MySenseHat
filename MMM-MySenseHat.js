/* global Module */

/*	Magic Mirror
 *	Module: MMM-MySenseHat
 *	https://github.com/framboise-pi/MMM-MySenseHat
 *	Copyright(C) 2020 Cedric Camille Lafontaine http://www.framboise-pi.fr,
 *	version 0.0.1
 */

Module.register("MMM-MySenseHat",{
	// CONFIG
	defaults: {
		read_interval: 500,//ms
		slide_interval: 10000,//ms
		slide_display: 5000,//ms

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
	// CSS
	getStyles: function () {
		return ["MMM-MySenseHat.css", "font-awesome.css"];
	},
	//
	start: function() {
		this.sendSocketNotification("MMM_MySenseHat_LoadingTxt");
		this.askdata();
		this.pixelslide();
	},
	//ASK FOR SENSORS DATA
	askdata: function () {
		var self = this;
		setInterval(function() {
			self.sendSocketNotification("MMM_MySenseHat_ReadSensors");
			self.updateDom();
			}, self.config.read_interval);
	},
	//SLIDESHOW LED
	pixelslide: function () {
		var self = this;
		setInterval(function() {
			self.sendSocketNotification("MMM_MySenseHat_PixelSlide");
			}, self.config.slide_interval);
	},
	//
	socketNotificationReceived: function (notification, payload) {
		if (notification = "MMM_MySenseHat_SensorsData"){
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
		var wrapper = document.createElement("div");
		ihtml =  "<div class='container'>"
		ihtml += "<div class='line'><sup> humidité </sup> <i class=\"fa fa-tint\" style=\"color:#50FCFF\"></i> " + this.SensorsData.humi + " %</div>"
		ihtml += "<div class='line'><sup> température </sup> <i class=\"fa fa-thermometer-empty\" style=\"color:#FF8A50\"></i> " + this.SensorsData.temp + " °C</div>"
		ihtml += "<div class='line'><sup> pression </sup> <i class=\"fa fa-cloud\" style=\"color:#EFEFEF\"></i> " + this.SensorsData.press + " mbar</div>"
		ihtml += "<div class='line'><sup> compas </sup> <i class=\"fa fa-compass\" style=\"color:#CD1C00\"></i>  " + this.SensorsData.compx + "<sup>X</sup> | " + this.SensorsData.compy + "<sup>Y</sup> | " + this.SensorsData.compz + "<sup>Z</sup> µT</div>"
		//ihtml += "<div class='line'><sup> fusion </sup> <i class=\"fa fa-compass\" style=\"color:#CD1C00\"></i>  " + this.SensorsData.fusix + "<sup>X</sup> | " + this.SensorsData.fusiy + "<sup>Y</sup> | " + this.SensorsData.fusiz + "<sup>Z</sup></div>"
		ihtml += "<div class='line'><sup> gyroscope </sup> <i class=\"fa fa-arrows-alt\" style=\"color:#FAFF8E\"></i>  " + this.SensorsData.gyrox + "<sup>X</sup> | " + this.SensorsData.gyroy + "<sup>Y</sup> | " + this.SensorsData.gyroz + "<sup>Z</sup> rad/sec</div>"
		ihtml += "<div class='line'><sup> accélération </sup> <i class=\"fa fa-dashboard\" style=\"color:#A6FF8E\"></i>  " + this.SensorsData.accex + "<sup>X</sup> | " + this.SensorsData.accey + "<sup>Y</sup> | " + this.SensorsData.accez + "<sup>Z</sup> G</div>"
		ihtml += "</div>"
		wrapper.innerHTML = ihtml
		return wrapper
	},
});
