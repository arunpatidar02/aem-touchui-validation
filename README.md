
# AEM - Touch UI Component Dialog Field Regex/Custom Validation

You already know the use of Granite UI widget's **required** property - Indicates if the field is mandatory to be filled and shows ***Please fill out this field*** if the field is empty. But there are cases where the dialog fields are required custom validation with the custom error message.

## Solution

The custom validations for touch UI dialog fields are very common, which required writing client side javascript/jquery scrips but end up writing too much code. 

I created a solution, inspired by classic UI widget **regex** and **regexText** properties, which allow widget(field) value checked against **regex** property value and shows custom error message, set in **regexText** property . 
The solution for Touch UI is same, which allows custom validation for Granite(Coral3) fields.



## Properties

To allow custom validation A **granite:data** node of type nt:unstructured will be created as the field's sibling node and has the following properties:
 - regex 
 - regexText
 - regexMode
 - min
 - max



|**Name**|**Type**|**Description**|
|--- |--- |--- |
|regex|String|This is mandatory property, specify the type of validation based on values. Values can be ***Regular Expression***, `required` or `multifield`.|
|regexText|String|Optional property to specify message to be displayed in case of field input is not valid. `Invalid input` is default. |
|regexMode|String|Optional property, indicates how to display error messages. Values can be `inline`, `floating` or `auto`. `inline` is default.|
|min|String|Define Minimum items required for the Multifield.|
|max|String|Define Maximum items allowed for the Multifield.|

> **Note :** Only `regex` property is mandatory, Others are optional properties.
> `min` and `max` both are optional and required if `regex` property value is ***multifield***



#### Configuring *regex* property
|**Value**|**Description**|
|--- |--- |
|Regular Expression|If value is set to regular expression, field will be validated against specified regular Expression string (*.e.g.* `^#([A-Fa-f0-9]{3}){1,2}$`).|
|required|if the field is mandatory to be filled. |
|multifield|if the multifield is mandatory to be have minimum or/and maximum items. In this case `min` and/or `max` properties should be set.|

> **Note :** For AEM 6.3, If regular expression contains `\`, regex property value should have `\\`.(Not required in AEM 6.4+)   
> **Note :** Since AEM removes the backslash(if not escape) as soon as property is saved, to avoid that in AEM 6.3, use `\\\\` and for 6.4+ use `\\`  while creating regex property value.

#### Tips
For *Regular Expression :* `\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$` , use below values for `regex` property before save.
> AEM 6.3 --> `^\\\\w+([\\\\.-]?\\\\w+)*@\\\\w+([\\\\.-]?\\\\w+)*(\\\\.\\\\w{2,3})+$`
> AEM 6.4 and above --> `^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$`

As soon as you save the property AEM will remove the extra `\` and after refreshing **granite:data** node, `regex` property value should be look like below:
> AEM 6.3 --> `^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$`
> AEM 6.4 and above --> `\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$`

To make sure, `regex` property value is correct, regular expression can be varified from fields HTML DOM.
For above regular expression (*either 6.3 or 6.4 syntax*), the value of `data-regex` attribute of fields HTML DOM should render the regular expression without escaping `\` i.e. `\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$`.
i.e.`data-regex="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"`

````HTML
<input class="coral-Form-field coral3-Textfield" data-regexmode="auto" data-regextext="Invalid email address" data-regex="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" type="text" name="./email" labelledby="label_c9fe8014-e6fe-40c0-91a4-f14b88980b99 description_c9fe8014-e6fe-40c0-91a4-f14b88980b99" value="" data-foundation-validation="" data-validation="" is="coral-textfield" id="coral-id-2300" aria-labelledby="label_c9fe8014-e6fe-40c0-91a4-f14b88980b99 description_c9fe8014-e6fe-40c0-91a4-f14b88980b99" aria-invalid="false">
````


#### Configuring *regexMode* property
|**Value**|**Description**|
|--- |--- |
|inline|The error message will be displayed alongside field in the component dialog. similar to OOTB `required` property validation error.|
|floating|To display error message in modal(popup) window |
|auto|Error message will be shown in both the mode, i.e. inline as well as popup.|

## Other Properties

In case of `regexMode`  property value is *floating* , setup to show error message in popup window. The popup dialog Header and content Header can be set using the following properties added in the child node of  `cq:dialog` node.

|**Name**|**Type**|**Description**|
|--- |--- |--- |
|regex-modal-heading|String|This property specify the Header text of modal(popup). `Dialog cannot be submitted` is default|
|regex-content-heading|String|Popup dialog content header. `Following Fields are invalid` is default. |

## Getting Started
### Prerequisites
To setup this a clienlibs of category `cq.authoring.dialog` needs to be created from crxde. 

 - Copy `touchui.regex.validation.css` css file from [css](https://github.com/arunpatidar02/aem-touchui-validation/tree/master/touchui-regex-validation/css) folder
 - Copy `touchui.regex.validation.js` js  file from [js](https://github.com/arunpatidar02/aem-touchui-validation/tree/master/touchui-regex-validation/js) folder
 - Update `js.txt` and `css.txt` 
> Note : Above all files are available at [touchui-regex-validation](https://github.com/arunpatidar02/aem-touchui-validation/tree/master/touchui-regex-validation)

### Create Properties

 - Create `granite:data` node parallel(sibling) to item node
 - Add `regex` and other properties
  
>    **Note :** No need to create `granite:data` node for RTE(*cq/gui/components/authoring/dialog/richtext*) field.
>    `regex` and other properties can be added directly to RTE field node.

>   For checkboxList validation(atleast one should be checked) add properties to granite/ui/components/coral/foundation/form/fieldset node.

## Supports

This solution is mainly targeted for new version on AEM and most used granite input type resources. Below is the list of supported AEM version and Resource types.

#### AEM Version
 - AEM 6.3 and above

#### Granite(Coral3) Resource type
 - granite/ui/components/coral/foundation/form/textfield
 - granite/ui/components/coral/foundation/form/numberfield
 - granite/ui/components/coral/foundation/form/textarea
 - cq/gui/components/authoring/dialog/richtext
 - granite/ui/components/coral/foundation/form/select
 - granite/ui/components/coral/foundation/form/checkbox
 - granite/ui/components/coral/foundation/form/radiogroup
 - granite/ui/components/coral/foundation/form/fieldset
 - granite/ui/components/coral/foundation/form/pathfield
 - granite/ui/components/coral/foundation/form/pathbrowser
 - cq/gui/components/authoring/dialog/fileupload
 - granite/ui/components/coral/foundation/form/colorfield
 - granite/ui/components/coral/foundation/form/datepicker
 - granite/ui/components/coral/foundation/form/multifield

## Features

 - Solution is based on javascript, no need to do any server side changes or
   resource overlay.
 - easy to plug-in to existing aem dialog clientlibs.
 - Easy to use.
 - Supports latest versions of AEM i.e. AEM 6.3, 6.4 and 6.5.
 - Supports most commonly used Granite(Coral3) resources type fields.
 - Supports with design dialog/policy(static and dynamic templates).
 #### Limitations
 - Doesn't support coral2 type resource type.
 - Only support Granite resources(mentioned in the [Supports](#granitecoral3-resource-type) section)
 - The popup message only displays invalid items rows in below format 
	 - `Tab--> FieldLabel : RegexText`. 
	 - And for multifield `Tab--> FieldLabel[index] : RegexText`. 
	 - But does not show complete nested structure(breadcrumb).
 - Avoid using both OOTB `required` property and `regex`  property for field validation. This can result in conflicts and dialog would not be submitted. However both properties can be used together for different fields for same dialog.
 - In case of inline error mode , if `fieldLabel`  property is missing then error tooltip may be shown in next line(OOTB behaviour).


## Reference
#### Sample Package
 Sample package contains clientlibs and sample component dialog with all above fields property setup
 
 [aem-touchui-regexvalidation-sample-1.zip](https://github.com/arunpatidar02/aem-touchui-validation/blob/master/aem-touchui-regexvalidation-sample-1.zip)
 
 #### More Info
 More details with screenshots is availble at [https://aemlab.blogspot.com/2019/05/aem-touch-ui-component-dialog-field.html](https://aemlab.blogspot.com/2019/05/aem-touch-ui-component-dialog-field.html) 

