# MMM-MySenseHat
Magic Mirror Raspberry Pi Sense Hat Module
<br>Please support open source coders ! It's really appreciated in this dark moments :p

# Installation
<i>Please check <a href="https://github.com/framboise-pi/MMM-MySenseHat/wiki">Wiki</a> first for any questions, or error you experience.</i>

## I. Prerequisites

**Important:** This module requires a Raspberry Pi with a Sense HAT attached.

### Python Dependencies
This module uses the official Raspberry Pi Sense HAT Python library. Install it first:

```bash
sudo apt-get update
sudo apt-get install -y sense-hat python3-sense-hat
```

**Note:** The `python3-sense-hat` package is only available on Raspberry Pi OS. If the Python library is not installed, the sensor script will generate random mock data instead of real sensor readings (useful for development/testing without hardware).

## II. Install Module

Run these commands at your Magic Mirror root directory:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/framboise-pi/MMM-MySenseHat.git
cd MMM-MySenseHat
npm install
```

**No native Node.js modules required!** This version uses:
- Python `sense_hat` library for sensors (official Raspberry Pi library)
- JavaScript `sense-hat-led` for LED matrix control (pure JavaScript, no compilation needed)

✅ No `electron-rebuild` necessary  
✅ No C++ compilation  
✅ Works out of the box after `npm install`

## III. Configuration
<p>edit your config.js file from MagicMirror config folder</p>
<div class="highlight highlight-source-js"><pre>  
//////////////////////
// MY SENSE HAT
//////////////////////
modules: <span class="pl-kos">[</span>
<span class="pl-kos">{</span>
 <span class="pl-c1">disabled</span>: <span class="pl-s">false</span><span class="pl-kos">,</span>
 <span class="pl-c1">module</span>: <span class="pl-s">"MMM-MySenseHat"</span><span class="pl-kos">,</span>
 <span class="pl-c1">position</span>: <span class="pl-s">"middle_center"</span><span class="pl-kos">,</span>  
  <span class="pl-c1">config</span>: <span class="pl-kos">{</span>
   <span class="pl-c">read_interval</span>: <span class="pl-s">2000</span><span class="pl-kos">,</span>
   <span class="pl-c">display_start_LED</span>: <span class="pl-s">true</span><span class="pl-kos">,</span>
   <span class="pl-c">use_SenseHat_LED</span>: <span class="pl-s">true</span><span class="pl-kos">,</span>
   <span class="pl-c">show_all_sensors</span>: <span class="pl-s">false</span><span class="pl-kos">,</span>
   <span class="pl-c">mode_monster</span>: <span class="pl-s">true</span><span class="pl-kos">,</span> 
   <span class="pl-c">mode_clock</span>: <span class="pl-s">true</span><span class="pl-kos">,</span> 
   <span class="pl-c">mode_pixel1</span>: <span class="pl-s">true</span><span class="pl-kos">,</span> 
   <span class="pl-c">mode_pixelv</span>: <span class="pl-s">true</span><span class="pl-kos">,</span> 
   <span class="pl-c">mode_temp</span>: <span class="pl-s">true</span><span class="pl-kos">,</span> 
   <span class="pl-c">cpu_load</span>: <span class="pl-s">true</span><span class="pl-kos">,</span> 
   <span class="pl-c">ram_used</span>: <span class="pl-s">true</span><span class="pl-kos">,</span> 
   <span class="pl-c">fontsize</span>: <span class="pl-s">"normal"//small | normal | large | xlarge</span><span class="pl-kos"></span> 
  <span class="pl-kos">}</span>
 <span class="pl-kos">}</span>
<span class="pl-kos">]</span>
</pre></div>
----------------------------------------------------

# Update
To update MMM-MySenseHat, go to the MMM-MySenseHat folder:

```bash
cd ~/MagicMirror/modules/MMM-MySenseHat
git pull
npm install
pm2 restart mm
```

# Testing

Test the Python sensor script directly:

```bash
cd ~/MagicMirror/modules/MMM-MySenseHat
python3 read_sensors.py
```

This should output sensor data as JSON. If you're not on a Raspberry Pi with Sense HAT, it will output mock data for development.

# Technical Details

This module has been modernized to eliminate native Node.js modules:

- **Sensors**: Uses official Python `sense_hat` library via `child_process`
- **LED Matrix**: Uses `sense-hat-led` (pure JavaScript, direct framebuffer access)
- **No Compilation**: No `electron-rebuild` or C++ compilation required
- **Easy Updates**: Just `git pull && npm install`

# What ?
I didn't find any sensehat module for the wonderful MagicMirror so I'm trying to make one.

<i>This version has been updated to use the official Python sense_hat library instead of deprecated native Node.js modules.</i>

## V0.0.3 Modes on 8x8 LED (on interval with true/false options)
At start of MagicMirror a message will display (by default : "MAGIC")
* check online  : github version of this module. Displayed : current version | installed | info "UP TO DATE" or "UPDATE AVAILABLE" or "DEV VERSION"
* 8x8 pixels little monsters (10 for the moment) -- color is random each time
* 8x8 clock (hours and minutes colors are random)
* 8x8 random PixelArt -- every pixel is random
* 8x8 random PixelArt -- vertical symmetry left/right
* temperature sensor value with 2 random colors scale
* cpu average load - refreshed red dot line
* ram usage - refreshed green dot line


## Modes on MagicMirror
 Sensors values displayed on a Magic Mirror module
* humidity, temp, pression
* or all 6 sensors

## NOT IMPLEMENTED YET
* 8x8 pixels animations
* all LEDs on a color base on SenseHat temperature sensor
* Use of joystick and sensors to interact with other modules. Or else.
* Notifications - icons (gmail etc.)
* cpu temp compared to 64°C ?
* cpu speed compared to max ?

<div>Check <a href="https://github.com/framboise-pi/MMM-MySenseHat/issues">issues</a>, I write there the ideas I will implement in future.</div>

<p><sup>Started in May 2020.</sup></p>

# License
MMM-MySenseHat is published under the GNU Affero 3.0 because I believe in open development. It comes with both rights and obligations. Whether you use this for your open or closed-source product, you must keep it open, and you must provide your compatible source code to end users upon request. The most straightforward way to comply with the license is to make a fork of this project on Github, perform your modifications, and direct users to your modified fork.

While we can't prevent the use of this code in products that are closed source or crippled by a patent, we would prefer that you choose another code or, better yet, make your own.

# And ?
<p>My MagicMirror has been made with a display undersized, so it leaves areas to place the SenseHat in a corner, for exemple.</p>
<p>Placed behind the mirror, it could be used to only add a colored light between the mirror and the wall, and with the MagicMirror module to display sensors info.</p>
But I'm makin this module with the idea of a SenseHat in a front corner of the mirror.

# Screenshots
<p>VNC screenshot - Magic Mirror Module display</p>
<a href="https://ibb.co/JcQVydY"><img src="https://i.ibb.co/x2HWfsn/MMM-My-Sense-Hat-01.png" alt="MMM-My-Sense-Hat-01" border="0"></a>

<p>VNC screenshot - Magic Mirror Module display v0.0.3 and option all sensors off</p>
<a href="https://ibb.co/W5mYYFn"><img src="https://i.ibb.co/V9fPPDV/My-Sense-Hat-module-notallsensors.png" alt="My-Sense-Hat-module-notallsensors" border="0"></a>

<p> clock example 1</p>
<a href="https://ibb.co/jDfFqZn"><img src="https://i.ibb.co/vkq8fv0/My-Sense-Hat-clock-01.jpg" alt="My-Sense-Hat-clock-01" border="0"></a>

<p> clock example 2</p>
<a href="https://ibb.co/19PZj1X"><img src="https://i.ibb.co/wKPyjVQ/My-Sense-Hat-clock-02.jpg" alt="My-Sense-Hat-clock-02" border="0"></a>

<p> clock example 3</p>
<a href="https://ibb.co/ydCtzkZ"><img src="https://i.ibb.co/xXbWngB/My-Sense-Hat-clock-03.jpg" alt="My-Sense-Hat-clock-03" border="0"></a>

<p> clock example 4</p>
<a href="https://ibb.co/Gt87m7b"><img src="https://i.ibb.co/nnYrpr5/My-Sense-Hat-clock-04.jpg" alt="My-Sense-Hat-clock-04" border="0"></a>

<p> sensor temp example 1</p>
<a href="https://ibb.co/MDsYhfg"><img src="https://i.ibb.co/tM47hzH/My-Sense-Hat-sensortemp-01.jpg" alt="My-Sense-Hat-sensortemp-01" border="0"></a>

<p> pixelart mirror mode example 1</p>
<a href="https://ibb.co/7rHSNmB"><img src="https://i.ibb.co/SV267CH/My-Sense-Hat-mirror-01.jpg" alt="My-Sense-Hat-mirror-01" border="0"></a>

<p> pixelart mirror mode example 2</p>
<a href="https://ibb.co/dmxV44f"><img src="https://i.ibb.co/1zjPGG0/My-Sense-Hat-mirror-02.jpg" alt="My-Sense-Hat-mirror-02" border="0"></a>

<p> pixelart mirror mode example 3</p>
<a href="https://ibb.co/NsKwcjF"><img src="https://i.ibb.co/t4DyVsH/My-Sense-Hat-mirror-03.jpg" alt="My-Sense-Hat-mirror-03" border="0"></a>

<p> pixelart mirror mode example 4</p>
<a href="https://ibb.co/8cW14QP"><img src="https://i.ibb.co/X8hckGF/My-Sense-Hat-mirror-04.jpg" alt="My-Sense-Hat-mirror-04" border="0"></a>

<p> pixelart mirror mode example 5</p>
<a href="https://ibb.co/CmNMVmB"><img src="https://i.ibb.co/ydGYgd0/My-Sense-Hat-mirror-05.jpg" alt="My-Sense-Hat-mirror-05" border="0"></a>

<p> pixelart mirror mode example 6</p>
<a href="https://ibb.co/Y2RGq3F"><img src="https://i.ibb.co/gyjCB3L/My-Sense-Hat-mirror-06.jpg" alt="My-Sense-Hat-mirror-06" border="0"></a>

<p> pixelart mirror mode example 7</p>
<a href="https://ibb.co/hRTbjPY"><img src="https://i.ibb.co/5WJmyNK/My-Sense-Hat-mirror-07.jpg" alt="My-Sense-Hat-mirror-07" border="0"></a>

<p> pixelart monster mode example 1</p>
<a href="https://ibb.co/DM8TjPr"><img src="https://i.ibb.co/kD9vPVm/My-Sense-Hat-monster-01.jpg" alt="My-Sense-Hat-monster-01" border="0"></a>

<p> pixelart monster mode example 2</p>
<a href="https://ibb.co/3B1YkDK"><img src="https://i.ibb.co/5BTx2NZ/My-Sense-Hat-monster-02.jpg" alt="My-Sense-Hat-monster-02" border="0"></a>

<p> pixelart monster mode example 3</p>
<a href="https://ibb.co/gzqHKjB"><img src="https://i.ibb.co/V2nr4jP/My-Sense-Hat-monster-03.jpg" alt="My-Sense-Hat-monster-03" border="0"></a>

<p> pixelart monster mode example 4</p>
<a href="https://ibb.co/rdr3w0K"><img src="https://i.ibb.co/Hh8CH4L/My-Sense-Hat-monster-04.jpg" alt="My-Sense-Hat-monster-04" border="0"></a>

<p> pixelart monster mode example 5</p>
<a href="https://ibb.co/S7xd4sw"><img src="https://i.ibb.co/wrLwF0h/My-Sense-Hat-monster-05.jpg" alt="My-Sense-Hat-monster-05" border="0"></a>

<p> pixelart monster mode example 6</p>
<a href="https://ibb.co/YPdVKQr"><img src="https://i.ibb.co/LYgsqRG/My-Sense-Hat-monster-06.jpg" alt="My-Sense-Hat-monster-06" border="0"></a>

<p> pixelart monster mode example 7</p>
<a href="https://ibb.co/2vT3WNs"><img src="https://i.ibb.co/T4sMYLb/My-Sense-Hat-monster-07.jpg" alt="My-Sense-Hat-monster-07" border="0"></a>

<p> pixelart monster mode example 8</p>
<a href="https://ibb.co/qMnWsXr"><img src="https://i.ibb.co/zh57Rj4/My-Sense-Hat-monster-08.jpg" alt="My-Sense-Hat-monster-08" border="0"></a>

<p> cpu dotline mode example 1</p>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/zS3gmc0/My-Sense-Hat-reddot-01.jpg" alt="My-Sense-Hat-reddot-01" border="0"></a>

<p> cpu dotline mode example 2</p>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/ygfvVwC/My-Sense-Hat-reddot-02.jpg" alt="My-Sense-Hat-reddot-02" border="0"></a>

<p> pixelart random mode example 1</p>
<a href="https://ibb.co/gzzhwPT"><img src="https://i.ibb.co/722LVRW/My-Sense-Hat-rnd-01.jpg" alt="My-Sense-Hat-rnd-01" border="0"></a>

<p> pixelart random mode example 2</p>
<a href="https://ibb.co/g3yL51s"><img src="https://i.ibb.co/Qf932Bs/My-Sense-Hat-rnd-02.jpg" alt="My-Sense-Hat-rnd-02" border="0"></a>

<p> pixelart random mode example 3</p>
<a href="https://ibb.co/X8q9gBt"><img src="https://i.ibb.co/ySrD1Tq/My-Sense-Hat-rnd-03.jpg" alt="My-Sense-Hat-rnd-03" border="0"></a>

<p> pixelart random mode example 4</p>
<a href="https://ibb.co/9bNpVK3"><img src="https://i.ibb.co/Yc3NynT/My-Sense-Hat-rnd-04.jpg" alt="My-Sense-Hat-rnd-04" border="0"></a>

<p> pixelart random mode example 5</p>
<a href="https://ibb.co/5Gm9MzD"><img src="https://i.ibb.co/zQp5nLc/My-Sense-Hat-rnd-05.jpg" alt="My-Sense-Hat-rnd-05" border="0"></a>

<p> pixelart random mode example 6</p>
<a href="https://ibb.co/qm7x9Wp"><img src="https://i.ibb.co/XFjVp3t/My-Sense-Hat-rnd-06.jpg" alt="My-Sense-Hat-rnd-06" border="0"></a>

<p> pixelart random mode example 7</p>
<a href="https://ibb.co/NT6PCHR"><img src="https://i.ibb.co/bbgZm8t/My-Sense-Hat-rnd-07.jpg" alt="My-Sense-Hat-rnd-07" border="0"></a>

<p> pixelart random mode example 8</p>
<a href="https://ibb.co/F0Q1ZwR"><img src="https://i.ibb.co/Hxcywz5/My-Sense-Hat-rnd-08.jpg" alt="My-Sense-Hat-rnd-08" border="0"></a>

<p>Hello World ! - module at 'middle_center' position</p>
<a href="https://ibb.co/8YZgypY"><img src="https://i.ibb.co/Dr2fByr/MMM-My-Sense-Hat-02.png" alt="MMM-My-Sense-Hat-02" border="0"></a>

# Now
This is maintained (more precisely, its in dev. Some functionnalities are not yet implemented and some will be improved in future)
* share your monster in pixel art, to add it in next version

# Thanks
To all Magic Mirror community and to MichMich.
This is how all mirrors should work in 2020.

-------------------------------------
### Give support ! ( a chocolat viennois break | help me get sensors and Raspberry hardware)
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=E79JA29LBLTAE&source=url)
------------------------------------------------
