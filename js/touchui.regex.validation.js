(function ($, $document) {
    "use strict";
    
    $(document).on("click", ".cq-dialog-submit", function (e) {
        var regexSelector = $('[data-regex]');
        var error = false;
        var invalidTabs = [];
        
        // remove existing error flag and error tooltip
        $(".regex-error").remove();
        $("coral-tab").removeClass('is-invalid');
        
        // check all the fields for validation
        $(regexSelector).each(function (i) {
            var $this = $(this);
            var regex = $this.data("regex");
            var regexText = $this.data("regextext");
            var value = $this.val();
            
            if (!(regex == "" || typeof regex === 'undefined' || regex == "multifield")) {
                validateField($this, value, regex, regexText);
            } else if (regex == "multifield") {
                validateMultiField($this, value, regexText);
            }
            
        });
        
        if (error) {
            invalidTabs.forEach(function (tab) {
                if (!tab.hasClass("is-invalid"))
                    tab.addClass("is-invalid");
            });
            return false;
        }
        
        
        // function to validate fields
        function validateField($this, value, regex, regexText) {
            value = getValue(regex, value, $this);
            if (regexText == "" || typeof regexText == 'undefined') {
                regexText = Granite.I18n.get("Invalid input");
            } else {
                regexText = Granite.I18n.get(regexText);
            }
            
            if ((!(new RegExp(regex).test(value)) && regex != "required") || (regex === "required" && value.length == 0)) {
                error = true;
                
                if ($this.hasClass('coral-PathBrowser') || $this.hasClass('coral3-ColorInput') || $this.prop('tagName').toLowerCase() === "coral-datepicker" || $this.prop('tagName').toLowerCase() === "foundation-autocomplete") {
                    $this.find("input.coral3-Textfield").addClass("is-invalid").addClass("regex-invalid");
                } else if ($this.hasClass("coral3-FileUpload")) {
                    $this.find(".cq-FileUpload-thumbnail").addClass("regex-invalid");
                } else if($this.hasClass('coral3-NumberInput')){
                    $this.find("input.coral3-Textfield").addClass("is-invalid").addClass("regex-invalid");
                    $this.addClass("is-invalid");
                }else {
                    $this.addClass("is-invalid").addClass("regex-invalid");
                }
                
                if ($this.parents().hasClass("coral3-Accordion-item")) {
                    $this.closest("coral-accordion-item").attr("selected", true);
                }
                
                if ($this.parent().hasClass("richtext-container")) {
                    $this.addClass("regex-invalid");
                    $this.parent().siblings(".coral-Form-fieldinfo").addClass("hide");
                } else {
                    $this.siblings(".coral-Form-fieldinfo").addClass("hide");
                }
                
                insertErrToolTip($this, regexText);
                
                var tabId = $this.parents('coral-panel').attr('id');
                var curTab = $this.parents('coral-tabview').children('coral-tablist').children('coral-tab[aria-controls="' + tabId + '"]');
                if (typeof curTab !== 'undefined' || typeof curTab !== null) {
                    invalidTabs.push(curTab);
                }
                
            } else {
                $this.find(".regex-invalid").removeClass("regex-invalid");
                if ($this.hasClass('coral-PathBrowser') || $this.hasClass('coral3-ColorInput') || $this.prop('tagName').toLowerCase() === "coral-datepicker" || $this.prop('tagName').toLowerCase() === "foundation-autocomplete") {
                    $this.find("input.coral3-Textfield").removeClass("is-invalid").removeClass("regex-invalid");
                } else if($this.hasClass('coral3-NumberInput')){
                    $this.find("input.coral3-Textfield").removeClass("is-invalid").removeClass("regex-invalid");
                    $this.removeClass("is-invalid");
                }else {
                    $this.removeClass("is-invalid").removeClass("regex-invalid");
                }
                
                if ($this.parent().hasClass("richtext-container")) {
                    $this.parent().siblings(".coral-Form-fieldinfo").removeClass("hide");
                    $this.removeClass("regex-invalid");
                } else {
                    $this.siblings(".coral-Form-fieldinfo").removeClass("hide");
                }
                
                if ($this.parents().hasClass("coral3-Accordion-item")) {
                    $this.closest("coral-accordion-item").removeAttr("selected");
                }
            }
        }
        
        // function to validate multifield min and max count
        function validateMultiField($this, value, regexText) {
            var min = $this.data("min");
            var max = $this.data("max");
            
            if (typeof min !== 'number') {
                min = 0;
            }
            if (typeof max !== 'number') {
                max = 99999;
            }
            
            var multiFieldItem = $this.find("coral-multifield-item").size();
            if (multiFieldItem < min || multiFieldItem > max) {
                error = true;
                $this.addClass("regex-invalid");
                $this.siblings(".coral-Form-fieldinfo").addClass("hide");
                insertErrToolTip($this, regexText);
            } else {
                $this.removeClass("regex-invalid");
                $this.siblings(".coral-Form-fieldinfo").removeClass("hide");
            }
        }
        
        // function to insert tooltip
        function insertErrToolTip(field, regexText) {
            var error = new Coral.Icon();
            error.icon = "alert";
            error.size = "S";
            error.classList.add("coral-Form-fielderror", "regex-error");
            
            var tooltip = new Coral.Tooltip();
            tooltip.variant = "error";
            tooltip.classList.add("regex-error");
            tooltip.placement = field.closest(".coral-Form").hasClass("coral-Form--vertical") ? "left" : "bottom";
            tooltip.target = error;
            tooltip.content.innerHTML = regexText;
            tooltip.id = Coral.commons.getUID();
            
            $(error).data("foundation-validation.internal.error.tooltip", tooltip);
            error.setAttribute("aria-labelledby", tooltip.id);
            error.setAttribute("tabindex", 0);
            field.data("foundation-validation.internal.error", error);
            
            if (field.parent().hasClass("richtext-container")) {
                field.parent().after(error, tooltip);
            } else if (field.hasClass("coral3-FileUpload")) {
                field.find(".cq-FileUpload-thumbnail").prepend(error, tooltip);
            } else
                field.after(error, tooltip);
        }
        
        // function to get value from non text input fields 
        function getValue(regex, value, $inputEle) {
            if ($inputEle.hasClass('coral3-NumberInput')) {
                value = $inputEle.find("input.coral3-Textfield").attr("aria-valuenow");
            } else if ($inputEle.hasClass('coral-PathBrowser') || $inputEle.prop('tagName').toLowerCase() === "foundation-autocomplete") {
                value = $inputEle.find("input.coral3-Textfield").val();
            } else if ($inputEle.hasClass('coral3-FileUpload')) {
                var fileValue = $inputEle.find('input[data-cq-fileupload-parameter="filemovefrom"]').val();
                var filereference = $inputEle.find('input[data-cq-fileupload-parameter="filereference"]').val();
                if (fileValue !== undefined && fileValue !== "false" && fileValue !== "") {
                    value = "true";
                    regex = "required";
                } else if (filereference !== undefined && filereference !== "false" && filereference !== "") {
                    value = filereference;
                } else {
                    value = "";
                }
            } else if ($inputEle.hasClass('coral3-Select')) {
                value = $inputEle.find('input[handle="input"]').val();
            } else if ($inputEle.hasClass("coral3-Checkbox")) {
                if ($inputEle.prop('checked'))
                    value = "true";
                else
                    value = "";
            } else if ($inputEle.hasClass('coral-RadioGroup')) {
                if ($inputEle.find("coral-radio").prop('checked'))
                    value = "true";
                else
                    value = "";
            } else if ($inputEle.hasClass('coral-Form-fieldset')) {
                if ($inputEle.find("coral-checkbox").prop('checked'))
                    value = "true";
                else
                    value = "";
            } else if ($inputEle.hasClass('coral-RichText-editable')) {
                value = $inputEle.text();
            }
            
            return value;
        }
        
    });
    
})($, $(document));