# MMM-MySenseHat
Magic Mirror Raspberry Pi Sense Hat Module
<br>Thank you for your eventual Star on this passionated handmade script ! It's really appreciated in this dark moments :p

# Installation
<i>Please check <a href="https://github.com/framboise-pi/MMM-MySenseHat/wiki">Wiki</a> first for any questions, or error you experience.</i>

## I. First Step
<p>Run these commands at your Magic Mirror root directory.</p>

<div>
 <code><p>cd ~/MagicMirror/modules</p>
<p> git clone https://github.com/framboise-pi/MMM-MySenseHat.git</p></code>
</div>
<div>
 <p>This command with MMM-MySenseHat folder (this will install dependencies)</p>
<code>npm install</code>
</div>

## II. Second Step
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
To update MMM-MySenseHat, go to the MMM-MotionEye folder:

cd ~/MagicMirror/modules/MMM-MySenseHat
git pull
pm2 restart mm

# What ?
I didn't find any sensehat module for the wonderful MagicMirror so I'm trying to make one.
Using java librairies. <i>I started a MagicMirror in python in parallel : MPMM (My Pi Magic Mirror), to use only python with sensehat and else, with the aim of making it working on a raspberry zero (Cause it don't work fine PiZero/MagicMirror).</i>

## Modes on 8x8 LED (on interval with true/false options)
At start of MagicMirror a message will display (by default : "MAGIC")
* 8x8 pixels little monsters (4 for the moment) -- color is random each time
* 8x8 clock (hours and minutes colors are random)
* 8x8 random PixelArt -- every pixel is random
* 8x8 random PixelArt -- vertical symmetry left/right
* temperature sensor value with 2 random colors scale
* cpu average load - red dot line
* ram usage - green dot line


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

# And ?
<p>My MagicMirror has been made with a display undersized, so it leaves areas to place the SenseHat in a corner, for exemple.</p>
<p>Placed behind the mirror, it could be used to only add a colored light between the mirror and the wall, and with the MagicMirror module to display sensors info.</p>
But I'm makin this module with the idea of a SenseHat in a front corner of the mirror.

# Screenshots
<p>VNC screenshot</p>
<a href="https://ibb.co/JcQVydY"><img src="https://i.ibb.co/x2HWfsn/MMM-My-Sense-Hat-01.png" alt="MMM-My-Sense-Hat-01" border="0"></a>

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
