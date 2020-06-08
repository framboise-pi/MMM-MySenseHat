# MMM-MySenseHat
Magic Mirror Raspberry Pi Sense Hat Module

# Installation
Check <a href="https://github.com/framboise-pi/MMM-MySenseHat/wiki">Wiki</a>

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
   <span class="pl-c">fontsize</span>: <span class="pl-s">"normal"//small | normal | large | xlarge</span><span class="pl-kos"></span> 
  <span class="pl-kos">}</span>
 <span class="pl-kos">}</span>
<span class="pl-kos">]</span>
</pre></div>
----------------------------------------------------

# What ?
I didn't find any sensehat module for the wonderful MagicMirror so I'm trying to make one.
Using java librairies. <i>And I started a MagicMirror in python in parallel, to use only python with sensehat and else.</i>

## On 8x8 LED
* at start of MagicMirror a message displayed on SenseHat LED (by default : "MAGIC")
* 8x8 pixels little monsters (3 for the moment) -- color is random each time
* a 8x8 clock (hours and minutes colors are random)
* on interval, random PixelArt on sensehat LED -- every pixel is random (in next version 0.0.2)

## On MagicMirror
* Sensors values displayed on a Magic Mirror module
 ** humidity, temp, pression - or all 6 sensors

## NOT IMPLEMENTED YET
* 8x8 pixels animations
* all LEDs on a color base on SenseHat temperature sensor
* Use of joystick and sensors to interact with other modules. Or else.
* Notifications - icons (gmail etc.)

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

# Thanks
To all Magic Mirror community and to MichMich.
This is how all mirrors should work in 2020.

-------------------------------------
### Give support ! ( a chocolat viennois break | help me get sensors and Raspberry hardware)
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=E79JA29LBLTAE&source=url)
------------------------------------------------
