(function ($, $document) {
    "use strict";
    
    $(document).on("click", ".cq-dialog-submit", function (e) {
        var regexSelector = $('[data-regex]').not(".richtext-container>input.coral-Form-field");
        var error = false;
        var invalidTabs = [];
        var errorMsg = "";
        var regModelHeading = $("[data-regex-model-heading]").attr("data-regex-model-heading");
        var regContentHeading = $("[data-regex-content-heading]").attr("data-regex-content-heading");
        
        if (regModelHeading === null || typeof regModelHeading === "undefined") {
            regModelHeading = "Dialog cannot be submitted";
        }

        if (regContentHeading === null || typeof regContentHeading === "undefined") {
            regContentHeading = "Following Fields are invalid";
        }
        
        // remove existing error flag, error tooltip and error model
        $(".regex-error").remove();
        $("coral-tab").removeClass('is-invalid');
        $("#regexDialogId").remove();
        
        // checking fields for validation
        $(regexSelector).each(function (i) {
            var $this = $(this);
            var regex = $this.data("regex");
            var regexText = $this.data("regextext");
            var regexMode = $this.data("regexmode");
            var value = $this.val();
            var dialogMode = 0;
            
            if (regexMode === 'floating') {
                dialogMode = 1;
            } else if (regexMode === 'auto') {
                dialogMode = 2;
            }
            
            if (!(regex == "" || typeof regex === 'undefined')) {
                errorMsg = errorMsg + validateField($this, value, regex, regexText, dialogMode);
            }
        });
        
        if (error) {
            invalidTabs.forEach(function (tab) {
                if (!tab.hasClass("is-invalid"))
                    tab.addClass("is-invalid");
            });
            if (errorMsg !== "") {
                var dialog = getDialog(errorMsg);
                document.body.appendChild(dialog);
                dialog.show();
            }
            return false;
        }
        
        
        // function to validate and get field regexText error message
        function validateField($this, value, regex, regexText, dialogMode) {
            var newVal = getValue(regex, value, $this);
            regex = newVal[0];
            value = newVal[1];
            var errMsg = "";
            
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
                } else if ($this.hasClass('coral3-NumberInput')) {
                    $this.find("input.coral3-Textfield").addClass("is-invalid").addClass("regex-invalid");
                    $this.addClass("is-invalid");
                } else {
                    $this.addClass("is-invalid").addClass("regex-invalid");
                }
                
                if ($this.parents().hasClass("coral3-Accordion-item")) {
                    $this.closest("coral-accordion-item").attr("selected", true);
                }
                
                if (dialogMode != 1) {
                    if ($this.parent().hasClass("richtext-container")) {
                        $this.addClass("regex-invalid");
                        $this.parent().siblings(".coral-Form-fieldinfo").addClass("hide");
                    } else {
                        $this.siblings(".coral-Form-fieldinfo").addClass("hide");
                    }
                }
                
                var tabId = $this.parents('coral-panel').attr('id');
                var curTab = $this.parents('coral-tabview').find('coral-tab[aria-controls="' + tabId + '"]');
                if (typeof curTab !== 'undefined' || typeof curTab !== null) {
                    invalidTabs.push(curTab);
                }
                if (dialogMode != 1) {
                    insertErrToolTip($this, regexText);
                }
                if (dialogMode != 0) {
                    errMsg = getErrMsg($this, regexText, curTab.find("coral-tab-label"));
                }
            } else {
                $this.removeClass("regex-invalid").find(".regex-invalid").removeClass("regex-invalid");
                if ($this.hasClass('coral-PathBrowser') || $this.hasClass('coral3-ColorInput') || $this.prop('tagName').toLowerCase() === "coral-datepicker" || $this.prop('tagName').toLowerCase() === "foundation-autocomplete") {
                    $this.find("input.coral3-Textfield").removeClass("is-invalid").removeClass("regex-invalid");
                } else if ($this.hasClass('coral3-NumberInput')) {
                    $this.find("input.coral3-Textfield").removeClass("is-invalid").removeClass("regex-invalid");
                    $this.removeClass("is-invalid");
                } else {
                    $this.removeClass("is-invalid");
                }
                
                if ($this.parent().hasClass("richtext-container")) {
                    $this.parent().siblings(".coral-Form-fieldinfo").removeClass("hide");
                } else {
                    $this.siblings(".coral-Form-fieldinfo").removeClass("hide");
                }
                
                if ($this.parents().hasClass("coral3-Accordion-item")) {
                    $this.closest("coral-accordion-item").removeAttr("selected");
                }
            }
            return errMsg;
        }
        
        
        // function to get error message string for a field
        function getErrMsg(field, regexText, curTab) {
            var $eleLabel = field.siblings('label.coral-Form-fieldlabel');
            var eleLabel = "";
            var errMsg = "";
            var pos = "";
            var tab = "";
            
            if (typeof $eleLabel !== undefined) {
                if ($eleLabel.parents('coral-multifield-item').length) {
                    pos = "[" + parseInt($eleLabel.parents('coral-multifield-item').index() + 1) + "]";
                }
                
                if ($eleLabel.length == 1) {
                    eleLabel = $eleLabel.text();
                } else if ($eleLabel.length == 0 && field.parent().hasClass("richtext-container")) {
                    eleLabel = field.closest(".richtext-container").siblings('label.coral-Form-fieldlabel').text();
                } else if ($eleLabel.length == 0 && field.closest(".coral-Form-fieldset").find(".coral-Form-fieldset-legend").length > 0) {
                    eleLabel = field.closest(".coral-Form-fieldset").find(".coral-Form-fieldset-legend").text();
                } else if ($eleLabel.length == 0 && field.hasClass("coral3-Checkbox")) {
                    eleLabel = field.find('coral-checkbox-label').text();
                } else if ($eleLabel.length == 0 && field.hasClass("coral3-FileUpload")) {
                    eleLabel = "File Upload";
                }
            }
            
            if (typeof curTab !== 'undefined') {
                tab = curTab.text();
            }
            
            if (tab !== "" && eleLabel !== "") {
                errMsg = '<p><span class="errTab">' + tab + '</span><span class="err-separator">-></span><span class="errLabel"> ' + eleLabel + pos + '</span><span class="err-separator">:</span>' + regexText + '</p>';
            } else if (tab === "" && eleLabel !== "") {
                errMsg = '<p><span class="errLabel"> ' + eleLabel + pos + '</span><span class="err-separator">:</span>' + regexText + '</p>';
            } else if (tab !== "" && eleLabel === "") {
                errMsg = '<p><span class="errTab">' + tab + '</span><span class="err-separator">-></span>' + regexText + '</p>';
            } else {
                errMsg = '<p>' + regexText + '</p>';
            }
            return errMsg;
        }
        
        // function to get error message dailog model
        function getDialog(errorMsg) {
            var dialog = new Coral.Dialog();
            dialog.id = 'regexDialogId';
            dialog.header.innerHTML = '<coral-alert-header>' + regModelHeading + '</coral-alert-header>';
            dialog.content.innerHTML = '<coral-alert-content><div class="heading">'+regContentHeading+'</div><div class="content">' + errorMsg + '</div></coral-alert-content>';
            dialog.footer.innerHTML = '<button is="coral-button" variant="primary" coral-close id="regex-dialog-ok"><coral-button-label>Ok</coral-button-label></button>';
            dialog.variant = "error";
            return dialog;
        }
        
        // function to insert error tooltip for a field
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
            } else {
                field.after(error, tooltip);
            }
        }
        
        // function to get value from non text input fields 
        function getValue(regex, value, $inputEle) {
            if ($inputEle.hasClass('coral3-NumberInput')) {
                value = $inputEle.find("input.coral3-Textfield").attr("aria-valuenow");
            } else if ($inputEle.hasClass('coral-PathBrowser') || $inputEle.prop('tagName').toLowerCase() === "foundation-autocomplete") {
                value = $inputEle.find("input.coral3-Textfield").val();
            } else if ($inputEle.hasClass('coral3-FileUpload')) {
                var fileValue = $inputEle.find('input[data-cq-fileupload-parameter="filename"]').val();
                var filereference = $inputEle.find('input[data-cq-fileupload-parameter="filereference"]').val();
                var fileImage = $inputEle.find('div.cq-FileUpload-thumbnail-img img');
                
                if ((fileValue !== undefined && fileValue !== "false" && fileValue !== "") || (fileImage.length > 0 && fileValue == "" && filereference == "")) {
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
            } else if (regex === "multifield") {
                var min = $inputEle.data("min");
                var max = $inputEle.data("max");
                var multiFieldItem = $inputEle.find("coral-multifield-item").size();
                
                if (typeof min !== 'number')
                    min = 0;
                if (typeof max !== 'number')
                    max = 99999;
                if (multiFieldItem < min || multiFieldItem > max) {
                    value = "";
                } else {
                    value = "true";
                }
                regex = "required";
            }
            return [regex, value];
        }
        
    });
    
})($, $(document));
