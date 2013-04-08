Premium Select
==============

A jQuery plugin for custom styling your select drop downs.

Authors and Attributions
========================
Premium Select was written by Jocko MacGregor for [Ballantine Digital Media](http://blog.buzztown.com/).

This code is based on the code presented in a tutorial by Martin Angelov
for tutorialzine.com.  [Read the tutorial](http://tutorialzine.com/2010/11/better-select-jquery-css3/).

License
=======
This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License</a>.

<a rel="license" href="http://creativecommons.org/licenses/by/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/3.0/88x31.png" /></a>

Usage
=====
Sorry if this isn't a fully detailed yet, I'm building it for a work project, 
but hopefully I will get back to documenting it a little more fully.  In the 
mean time here's some basics.

All references below are assuming you're using the sample.html file included in
the repository.  If you are using your own code please adjust your paths
accordingly.

Basic Requirements
------------------
You will need jQuery 1.4.3+ in order to run the plugin properly because it
depends on some HTML5 requirements for the data parameters.

You must also include the Premium Select javascript and CSS files for the selects
to render out and function properly.

Remember to set your paths to match your environment.

<pre>
// Javascript files (jQuery 1.4.3 or higher is required)
&lt;script src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;js/premium-select-0.1b.js&quot;&gt;&lt;/script&gt;

// CSS File
&lt;link rel=&quot;stylesheet&quot; href=&quot;css/premium-select.css&quot; /&gt;
</pre>

Simplest Approach
-----------------
The plugin is setup to automatically initialize any select object with the class
'premiumSelect'.  This gives you an immediate path to initialization without 
having to do any actual javascript code.

No special DOM structures are required, just setup your select list, and give
it the right class name, and voila, its ready to go:

<pre>
&lt;select class=&quot;premiumSelect&quot;&gt;
    &lt;option value=&quot;0&quot; selected=&quot;selected&quot;&gt;Choose an Option&lt;/option&gt;
    &lt;option value=&quot;1&quot;&gt;Option 1&lt;/option&gt;
    &lt;option value=&quot;2&quot;&gt;Option 2&lt;/option&gt;
    &lt;option value=&quot;3&quot;&gt;Option 3&lt;/option&gt;
    &lt;option value=&quot;4&quot;&gt;Option 4&lt;/option&gt;
&lt;/select&gt;
</pre>


Hide an Option
--------------
If you have a default option that you want hidden from the list of options, then
you can remove it from the final display by adding the 'skip' data parameter to
the option you want hidden.

Read more about the 'skip' data parameter in the 'Data Parameters' section 
below.

<pre>
&lt;select class=&quot;premiumSelect&quot;&gt;
    &lt;option value=&quot;0&quot; selected=&quot;selected&quot; data-skip=&quot;1&quot;&gt;Choose an Option&lt;/option&gt;
    &lt;option value=&quot;1&quot;&gt;Option 1&lt;/option&gt;
    &lt;option value=&quot;2&quot;&gt;Option 2&lt;/option&gt;
    &lt;option value=&quot;3&quot;&gt;Option 3&lt;/option&gt;
    &lt;option value=&quot;4&quot;&gt;Option 4&lt;/option&gt;
&lt;/select&gt;
</pre>


Icons Included
--------------
You can display icons in your list by adding the 'has-icon' data parameter to
the select tag, and then adding the 'icon' data parameter to the options that
need to have icons.

Read more about the 'has-icon' and 'icon' data parameters in the 'Data
Parameters' section below.

```html
&lt;select class=&quot;premiumSelect&quot; data-has-icon=&quot;1&quot;&gt;
    &lt;option value=&quot;0&quot; selected=&quot;selected&quot; data-skip=&quot;1&quot;&gt;Choose Your Product&lt;/option&gt;
    &lt;option value=&quot;1&quot; data-icon=&quot;img/products/iphone.png&quot;&gt;iPhone 4&lt;/option&gt;
    &lt;option value=&quot;2&quot; data-icon=&quot;img/products/ipod.png&quot;&gt;iPod&lt;/option&gt;
    &lt;option value=&quot;3&quot; data-icon=&quot;img/products/air.png&quot;&gt;MacBook Air&lt;/option&gt;
    &lt;option value=&quot;4&quot; data-icon=&quot;img/products/imac.png&quot;&gt;iMac&lt;/option&gt;
&lt;/select&gt;
```

Data Parameters
---------------
Data parameters are parameters that are added to the tags in the select object,
and modify how the final select list is rendered.  Data parameters can be added
to the select tag, or the option tags and modify each respectively.

*Select Tag Data Parameters*:


*data-has-icon*
Turns on the icons in the drop down list, and provides the necessary CSS
class structure to indent the option text to accommodate for the icon.  This
parameter works in conjuction with the *data-icon* parameter which is used
in the option tags. 
*Value:* 1

*data-select-width*
Sets the width of the select box in the final display.
*Value:* a standard CSS measurement so must be appended with 'px', 'em', or 
any proper CSS measurement unit.

*data-list-width*
Sets the width of the select list in the final display.
*Value:* a standard CSS measurement so must be appended with 'px', 'em', or 
any proper CSS measurement unit.

*data-theme*
Sets the theme to use for the select lists final display.
*Value:* A string containing the name of the theme that coordinates with any
predefined theme names defined in the CSS file.

*Option Tag Data Parameters*:
    
*data-skip*
Instructs the renderer not to include the option in the final display.
*Value:* 1

*data-icon*
Identifies the path of the icon image file that will be rendered in the
final display.  The *data-has-icon* option must be set on the Select tag
in order for the icon to be display.
*Value:* A string containing the path to the icon image.

*data-line-n*
There can be as many of these parameters as are handled by the specified 
theme (The default theme handles 2).  The n value should be replaced with
the line number (1,2,3, etc.), and the parameters should be sequential
without skipping any numbers.  Each line in rendered in order in the final
display, with a class identifying the line included.
*Value:* A string containing the value for the line number given.