/*
 * Premium Select v0.1 Beta
 * 
 * @Author Jocko MacGregor
 * @Version 0.1.2b
 * 
 * A jQuery plugin for custom styling your select drop downs.
 * 
 * This code is based on the code presented in a tutorial by Martin Angelov
 * for tutorialzine.com.  To read the tutorial visit:
 * 
 * http://tutorialzine.com/2010/11/better-select-jquery-css3/
 */

var console = console||{info:function(){}};

$.fn.premiumSelect = function(){
    var selects = $(this).filter('select');
    selects.each(function(){
       $.premiumselect.init($(this));
    });
};


$.premiumselect = {
    init: function(select){
        $.premiumselect.buildInterface(select);
    },

    buildInterface: function(select){
        // Build some DOM elements to represent the select drop-down.
        var id;
        var has_icon = (select.data('has-icon') === 1);
        var select_width = select.data('select-width');
        var list_width = select.data('list-width');
        console.info(select.data('has-icon'));
        console.info(has_icon);
        var theme = select.data('theme');

        var container = $('<div>');
        container.attr('width', select.outerWidth());
        container.attr('id', (id=select.attr('id')) ? id : null);
        container.addClass('premiumSelect');
        if (theme){ container.addClass(theme); }
        if (select_width){ container.attr('style', 'min-width: ' + select_width); }
        container.html('<div class="selectBox"></div>');

        var dropDown = $('<ul>');
        dropDown.addClass('dropDown');
        if (list_width){ dropDown.attr('style', 'width: ' + list_width); }

        var selectBox = container.find('.selectBox');

        select.find('option').each(function(i){
            var option = $(this);

            if(i===select.attr('selectedIndex')){
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
                        '<img src="' + icon + '" />' : '';
            }

            line = 1;
            lineText = (lt=option.data('line-' + line)) ? lt : null;
            while (lineText) {
                iconClass = has_icon ? " has-icon" : '';
                html += '<span class="line-' + line + iconClass + '">' + lineText + '</span>';
                line++;
                lineText = (lt=option.data('line-' + line)) ? lt : null;
            }

            // Check to see if we found any lines, if not, apply the option text
            // as a default line 1.
            if (!lineText && line === 1){
                iconClass = has_icon ? " has-icon" : '';
                html += '<span class="line-' + line + iconClass + '">' + option.text() + '</span>';
            }

            // Creating a dropdown item according to the
            // data-icon and data-html-text HTML5 attributes:
            var dto = option[0];
            var dtf = select.find('option[data-skip!=1]')[0];
            var dtl = select.find('option[data-skip!=1]:last')[0];
            var liClass = dto === dtf ? 'first' :
                            (dto === dtl ? 'last' : null);
            var liActive = option.attr('selected') ? ' active' : null;

            var li = $('<li>',{
                html        : html,
                className   : liClass + liActive
            });

            // Store some references in the LI for use in the click event. This
            // will allow the click event function to operate independently of
            // the rest of this function declaration.
            li.data('select', select);
            li.data('option', option);

            // Wireup the LI click event.
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
        return el.closest('.premiumSelect').find('.dropDown');
    }
};

// Automatically wire up any Select box with the .premiumSelect class
$(document).ready(function(){
	$('select.premiumSelect').premiumSelect();
});