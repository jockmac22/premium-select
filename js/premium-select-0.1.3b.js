/*
 * Premium Select v0.1.3 Beta
 * 
 * @Author Jocko MacGregor for Ballantine Digital Media (http://www.bdmedia.com)
 * @Version 0.1.3b
 * 
 * A jQuery plugin for custom styling your select drop downs.
 * 
 * This code is based on the code presented in a tutorial by Martin Angelov
 * for tutorialzine.com.  To read the tutorial visit:
 * 
 * http://tutorialzine.com/2010/11/better-select-jquery-css3/
 */

var console = console||{info:function(){}};

$.fn.premiumSelect = function(input){
    var selects = $(this).filter('select');
    selects.each(function(){
        if (typeof(input) === 'string'){
            $.premiumselect.execute($(this), input);
        }else{
            $.premiumselect.init($(this), input);
        }
    });
};


$.premiumselect = {
    init: function(select, opts){
        var defaultOpts = {
            has_icon: false,
            select_width: null,
            list_width: null,
            theme: null,
            hover_activated: false
        };

        var dataOpts = $.premiumselect.extractDataAttributes(select);
        opts = $.extend({}, defaultOpts, opts, dataOpts);

        // Remove any existing interfaces
        select.next().filter('div.premiumSelect').remove();

        $.premiumselect.buildInterface(select, opts);
    },

    execute: function(select, command){
        var dd = $.premiumselect.getDropDown(select);
        switch(command){
            case 'show':
                dd.trigger('show');
                break;
            case 'hide':
                dd.trigger('hide');
                break;
            case 'toggle':
                dd.trigger('toggle');
                break;
            case 'destroy':
                break;
        }
    },

    // Create a JSON object containing the values extracted from the data
    // attributes assigned in the DOM.   Values not present are not included
    // in the object.
    extractDataAttributes: function(select){
        var data = {};
        if (select.data('has-icon')){
            data.has_icon = (select.data('has-icon') === 1);
        }
        if (select.data('select-width')){
            data.select_width = select.data('select-width');
        }
        if (select.data('list-width')){
            data.list_width = select.data('list-width');
        }
        if (select.data('theme')){
            data.theme = select.data('theme');
        }
        if (select.data('hover-activated')){
            data.hover_activated = (select.data('hover-activated') === 1);
        }

        return data;
    },

    // Generate the HTML interface for the select box and drop down list.
    buildInterface: function(select, opts){
        // Build some DOM elements to represent the select drop-down.
        var id = select.attr('id') ? select.attr('id') : "ps" + parseInt(Math.random() * 1000000, 10);
        var has_icon = opts.has_icon;
        var select_width = opts.select_width;
        var list_width = opts.list_width;
        var theme = opts.theme;

        var container = $('<div>');
        container.attr('width', select.outerWidth());
        container.attr('id', id);
        container.addClass('premiumSelect');
        if (theme){ container.addClass(theme); }
        if (select_width){ container.attr('style', 'min-width: ' + select_width); }
        container.html('<div id="' + id + '_selectBox" class="selectBox"></div>');

        var dropDown = $('<ul id="' + id + '_list">');
        dropDown.addClass('dropDown');
        if (list_width){ dropDown.attr('style', 'width: ' + list_width); }

        var selectBox = container.find('.selectBox');
        selectBox.attr('class', 'selectBox ' + select.attr('class'));
        selectBox.removeClass('premiumSelect');

        select.find('option').each(function(idx){
            var option = $(this);
            var option_id = id + '_option_' + idx;
            var disabled = (option.data('disabled') === 1);
            var clickable = option.data('prevent-click') !== 1;

            if(select.val() === option.val()){
                selectBox.html(option.text());
            }

            // As of jQuery 1.4.3 we can access HTML5 
            // data attributes with the data() method.
            if(option.data('skip')){
                return true;
            }

            // Build the HTML content for the select option.
            var html="",icon,line=1,lineText,lt,iconClass;

            if (has_icon){
                html += (icon=option.data('icon')) ?
                        '<img id="' + id + '_icon" src="' + icon + '" />' : '';
            }

            line = 1;
            lineText = (lt=option.data('line-' + line)) ? lt : null;
            var line_id = '';
            while (lineText) {
                iconClass = has_icon ? " has-icon" : '';
                line_id = option_id + "_option_line_" + line;
                html += '<span id="' + line_id + '" class="line-' + line + iconClass + '">' + lineText + '</span>';
                line++;
                lineText = (lt=option.data('line-' + line)) ? lt : null;
            }

            // Check to see if we found any lines, if not, apply the option text
            // as a default line 1.
            if (!lineText && line === 1){
                iconClass = has_icon ? " has-icon" : '';
                line_id = option_id + "_option_line_" + line;
                html += '<span id="' + line_id + '" class="line-' + line + iconClass + '">' + option.text() + '</span>';
            }

            // Creating a dropdown item according to the
            // data-icon and data-html-text HTML5 attributes:
            var dto = option[0];
            var dtf = select.find('option[data-skip!=1]')[0];
            var dtl = select.find('option[data-skip!=1]:last')[0];
            var liFirstLast = dto === dtf ? ' first' :
                            (dto === dtl ? ' last' : '');
            var liActive = option.attr('selected') ? ' active' : '';
            var liDisabled = disabled ? ' disabled' : '';
            var liClass = option.attr('class') + ' ' + liFirstLast + liActive +
                    liDisabled;

            var li = $('<li id="' + option_id + '">');
            li.attr('class', liClass);
            li.removeClass('premiumSelect');
            li.html(html);

            // Store some references in the LI for use in the click event. This
            // will allow the click event function to operate independently of
            // the rest of this function declaration.
            li.data('select', select);
            li.data('option', option);

            // Wireup the LI click event, if the item is not disabled and clicks
            // aren't prevented.
            if (!disabled && clickable){
                li.click(function(evt){
                    evt.preventDefault();

                    var $this = $(this);
                    var selectBox = $.premiumselect.getSelectBox($this);
                    var select = $this.data('select');
                    var option = $this.data('option');
                    var dropDown = $.premiumselect.getDropDown($this);

                    selectBox.html(option.text());
                    dropDown.trigger('hide');

                    // When a click occurs, we are also reflecting
                    // the change on the original select element:
                    select.val(option.val());

                    var ul = $this.closest('ul');
                    var oVal = ul.data('val');

                    // Adjust the selected item in the list.
                    ul.children().removeClass('active');
                    $this.addClass('active');

                    // Update the current value.
                    ul.data('val', option.val());

                    // Fire the click event
                    select.trigger('click');
                    // Fire the change event if this is a changed value.
                    if (oVal !== option.val()){ select.trigger('change'); }

                    return false;
                });
            }

            // Add the LI to the dropDown list.
            dropDown.append(li);
        });

        // Add the elements to the DOM
        container.append(dropDown.hide());
        select.hide().after(container);

        // Binding custom show and hide events on the dropDown:
        dropDown.bind('show',function(){
            var $this = $(this);

            if($this.is(':animated')){
                return false;
            }

            var selectBox = $.premiumselect.getSelectBox($this);
            selectBox.addClass('expanded');

            $this.slideDown();

        }).bind('hide',function(){
            var $this = $(this);

            if($this.is(':animated')){
                return false;
            }

            var selectBox = $.premiumselect.getSelectBox($this);
            selectBox.removeClass('expanded');

            $this.slideUp();

        }).bind('toggle',function(){
            var $this = $(this);
            var selectBox = $.premiumselect.getSelectBox($this);

            if(selectBox.hasClass('expanded')){
                $this.trigger('hide');
            }
            else { $this.trigger('show'); }
        });

        selectBox.click(function(){
            var dropDown = $.premiumselect.getDropDown($(this));
            dropDown.trigger('toggle');
            return false;
        });

        // If we click anywhere on the page, while the
        // dropdown is shown, it is going to be hidden:

        if (opts.hover_activated){
            container
                .mouseover(function(){
                    var $this = $(this);
                    var dd = $.premiumselect.getDropDown($this);
                    dd.trigger('show');
                })
                .mouseleave(function(){
                    var $this = $(this);
                    var dd = $.premiumselect.getDropDown($this);
                    dd.trigger('hide');
                });
        }

        $(document).click(function(){
            $('.dropDown').trigger('hide');
        });
    },

    // Get the select box element of the current .premiumSelect DOM object. Can
    // take any element (el) within the .premiumSelect DOM container as a param.
    getSelectBox: function(el){
        return el.closest('.premiumSelect').find('.selectBox');
    },

    // Get the drop down element of the current .premiumSelect DOM object. Can
    // take any element (el) within the .premiumSelect DOM container as a param.
    getDropDown: function(el){
        if (el.filter('select').size() > 0){
            el = el.next('.premiumSelect');
        }

        return el.closest('.premiumSelect').find('.dropDown');
    }
};

// Automatically wire up any Select box with the .premiumSelect class
$(document).ready(function(){
	$('select.premiumSelect').premiumSelect();
});