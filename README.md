Premium Select
==============

A jQuery plugin for custom styling your select drop downs.

# Authors and Attributions
Premium Select was written by Jocko MacGregor for [Ballantine Digital Media](http://blog.buzztown.com/).

This code is based on the code presented in a tutorial by Martin Angelov
for tutorialzine.com.  [Read the tutorial](http://tutorialzine.com/2010/11/better-select-jquery-css3/).

# License
This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License</a>.

<a rel="license" href="http://creativecommons.org/licenses/by/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/3.0/88x31.png" /></a>

# Usage
Sorry if this isn't a fully detailed yet, I'm building it for a work project, 
but hopefully I will get back to documenting it a little more fully.  In the 
mean time here's some basics.

All references below are assuming you're using the sample.html file included in
the repository.  If you are using your own code please adjust your paths
accordingly.

### Basic Requirements
You will need jQuery 1.4.3+ in order to run the plugin properly because it
depends on some HTML5 requirements for the data attributes.

You must also include the Premium Select javascript and CSS files for the selects
to render out and function properly.

Remember to set your paths to match your environment.

```html
<!-- Javascript files (jQuery 1.4.3 or higher is required) -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>;
<script type="text/javascript" src=&quot;js/premium-select-0.1b.js"></script>;

<!-- CSS File -->
<link rel="stylesheet" href="css/premium-select.css" >;
```

### Simplest Approach
The plugin is setup to automatically initialize any select object with the class
'premiumSelect'.  This gives you an immediate path to initialization without 
having to do any actual javascript code.

No special DOM structures are required, just setup your select list, and give
it the right class name, and voila, its ready to go:

```html
<select class="premiumSelect">
    <option value="0" selected="selected">Choose an Option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
</select>
```


### Hide an Option
If you have a default option that you want hidden from the list of options, then
you can remove it from the final display by adding the 'skip' data attribute to
the option you want hidden.

Read more about the 'skip' data attribute in the 'Data Attributes' section 
below.

```html
<select class="premiumSelect">
    <option value="0" selected="selected" data-skip="1">Choose an Option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
</select>  
```


### Icons Included
You can display icons in your list by adding the 'has-icon' data attribute to
the select tag, and then adding the 'icon' data attribute to the options that
need to have icons.

Read more about the 'has-icon' and 'icon' data attributes in the 'Data
Parameters' section below.

```html
<select class="premiumSelect" data-has-icon="1">
    <option value="0" selected="selected" data-skip="1">Choose Your Product</option>
    <option value="1" data-icon="img/products/iphone.png">iPhone 4</option>
    <option value="2" data-icon="img/products/ipod.png">iPod</option>
    <option value="3" data-icon="img/products/air.png">MacBook Air</option>
    <option value="4" data-icon="img/products/imac.png">iMac</option>
</select>
```


### Data Attributes
Data attributes are used to control the display and behavior of the final 
display.  A full list of data-attributes are listed in the Data Attributes
section below.

This example uses the data attributes to set the width of the select box
(data-select-width), use a different width for the drop down list
(data-list-width), turn on the icons feature (data-has-icon), assign an icon
to each list item (data-icon), and setup two lines of content for each of the
list items (data-line-1, data-line-2).

```html
<select class="premiumSelect" data-has-icon="1" data-select-width="250px" data-list-width="300px">
    <option value="0" selected="selected" data-skip="1">Choose Your Product</option>
    <option value="1" data-icon="img/products/iphone.png" data-line-1="iPhone 5" data-line-2="Loving it is easy!">iPhone 4</option>
    <option value="2" data-icon="img/products/ipod.png" data-line-1="iPod" data-line-2="Play music and more!">iPod</option>
    <option value="3" data-icon="img/products/air.png" data-line-1="Macbook Air (out of stock)" data-line-2="Thin, fast, powerful!">MacBook Air</option>
    <option value="4" data-icon="img/products/imac.png" data-line-1="iMac" data-line-2="Performance and design at the edge.">iMac</option>
</select>
```

### Use a theme
The style and display of the Premium Select drop down can be fully customized
using a CSS theme.  To activate a theme you only need to provide the 'theme'
data attribute to the select tag.  The value you provide should be the name of
a properly configured theme in the Premium Select CSS file or add-on theme
file.  See the section 'Creating a Theme' for more information on how to
customize and create your own themes.

```html
<select class="premiumSelect" data-theme="olive" data-select-width="140px" data-list-width="250px">
    <option value="0" data-line-1="All Locations" selected="selected">All Locations</option>
    <option value="1" data-line-1="A really long named item for testing" data-line-2="10254 Coors Blvd Byp NW">A really long named item for testing</option>
    <option value="2" data-line-1="Starbucks" data-line-2="5501 Montgomery Blvd NE">Starbucks #2</option>
    <option value="3" data-line-1="Starbucks" data-line-2="201 La Posada Rd">Starbucks #3</option>
    <option value="4" data-line-1="Starbucks" data-line-2="9821 Montgomery Blvd NE">Starbucks #4</option>
</select>
```  

# Custom Styles
Classes (with the exception of the premiumSelect class) are passed through from 
the originating DOM elements to the finally rendered elements so that you can 
offer your own styling and identification to the interface.

The classes are mapped so that, any classes set in the select tag will be passed 
on to the selectBox object, and any classes set in the option tags will be
passed on to their dropDown list items respectively.


# Data Attributes
Data attributes are parameters that are added to the tags in the select object,
and modify how the final select list is rendered.  Data attributes can be added
to the select tag, or the option tags and modify each respectively.

### Select Tag Data Attributes:

##### data-has-icon
Turns on the icons in the drop down list, and provides the necessary CSS
class structure to indent the option text to accommodate for the icon.  This
parameter works in conjuction with the *data-icon* parameter which is used
in the option tags. 
*Value:* 1

##### data-select-width
Sets the width of the select box in the final display.
*Value:* a standard CSS measurement so must be appended with 'px', 'em', or 
any proper CSS measurement unit.

##### data-list-width
Sets the width of the select list in the final display.
*Value:* a standard CSS measurement so must be appended with 'px', 'em', or 
any proper CSS measurement unit.

##### data-theme
Sets the theme to use for the select lists final display.
*Value:* A string containing the name of the theme that coordinates with any
predefined theme names defined in the CSS file.

### Option Tag Data Attributes:
    
##### data-skip
Instructs the renderer not to include the option in the final display.
*Value:* 1

##### data-disabled
Instructs the renderer to deactivate all click events, and to assign the
disabled class to the drop down option.
*Value*: 1

##### data-prevent-click
Instructs the renderer to deactivate all click events, no additional classes are
assigned to the element.
*Value*: 1

##### data-icon
Identifies the path of the icon image file that will be rendered in the
final display.  The *data-has-icon* option must be set on the Select tag
in order for the icon to be display.
*Value:* A string containing the path to the icon image.

##### data-line-n
There can be as many of these parameters as are handled by the specified 
theme (The default theme handles 2).  The n value should be replaced with
the line number (1,2,3, etc.), and the parameters should be sequential
without skipping any numbers.  Each line in rendered in order in the final
display, with a class identifying the line included.
*Value:* A string containing the value for the line number given.

# Creating a Theme
Coming soon, not quite there yet.