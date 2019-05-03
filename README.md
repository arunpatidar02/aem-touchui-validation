
# AEM - Touch UI Component Dialog Custom Validation

You already know the use of Granite UI widget's **required** property - Indicates if the field is mandatory to be filled and shows ***Please fill out this field*** if field is empty. But there are cases where the dialog fields are required custom validation with custom error message.

## Solution

The custom validations for touch UI dialog fields are very common, which required writing client side javascript/jquery scrips but end up writing too much code. 

I inspired with classic UI widget **regex** and **regexText** properties, which allow widget(field) value checked against **regex** property value and shows custom error message, set in **regexText** property . 
The solution for Touch UI is same, which allows custom validation for Granite(Coral3) fileds.



## Properties

To allow custom validation A **granite:data** node of type nt:unstructured will be created as the field's sibling node and has the following properties:
 - regex 
 - regexText
 - regexMode
 - min
 - max
> Note : **regexText** *and* **regexMode** *properties are optional.* **min** *and* **max** properties are also optional and required for multifield validation.


|**Name**|**Type**|**Description**|
|--- |--- |--- |
|regex|String|This property specify the type of validation based on values. Possible values are ***Regular Expression***, `required` and `multifield`.|
|regexText|String|Message to display in case of field input is not valid. `Invalid input` is default. |
|regexMode|String|Indicates how to display error messages. Possible values are `inline`, `floating` and `auto`. `inline` is default.|
|min|String|Define Minimum items required for the Multifield.|
|max|String|Define Maximum items allowed for the Multifield.|

> Note : `min` and `max` both are optional and required in `regex` property set to ***multifield***



#### Configuring *regex* property
|**Value**|**Description**|
|--- |--- |
|Regular Expression|If value is set to regular expression, field will be validated against specified regEx string.e.g. `^#([A-Fa-f0-9]{3}){1,2}$`|
|required|if the field is mandatory to be filled. |
|multifield|if the multifield is mandatory to be have minimum or/and maximum items. In this case `min` and/or `max` properties should be set.|

#### Configuring *regexMode* property
|**Value**|**Description**|
|--- |--- |
|inline|The error message will be displayed alongside field in the component dailog. similar to OOTB `required` property validation error.|
|floating|To display error message in model(popup) window |
|auto|Error message will be shown in both the mode, i.e. inline as well as popup.|

## Other Properties

In case of `regexMode`  property value is *floating* , setup to show error message in popup window. The popup dialog Header and content Header can be set using the following properties added in the child node of  `cq:dialog` node.

|**Name**|**Type**|**Description**|
|--- |--- |--- |
|regex-model-heading|String|This property specify the Header text of model(popup). `Dialog cannot be submitted` is default|
|regex-content-heading|String|Popup dialog content header. `Following Fields are invalid` is default. |

## Setup

This solution is mainly targeted for new version on AEM and most used granite input type resources. Below is the list of supported AEM version and Resource types.

## Supports

This solution is mainly targeted for new version on AEM and most used granite input type resources. Below is the list of supported AEM version and Resource types.

#### AEM Version
 - AEM 6.3 AEM 
 - 6.4 and above

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



## Pros and Cons

 - Solution is based on javascript, no need to do any server side changes or
   resource overlay.
 - easy to plug-in to existing aem dialog clientlibs.
 - Easy to use.
 - Supports latest versions of AEM i.e. AEM 6.3 and above
 #### Limitations
 - Doesn't support coral2 type resource type.
 - Only support Granite Resources(Mentioned in the [Supports](https://github.com/arunpatidar02/aem-touchui-validation/blob/master/README.md#granitecoral3-resource-type) section)
 - The popup message only display invalid items rows in below format 
	 - `Tab--> FieldLabel : RegexText`. 
	 - And for multifield `Tab--> FieldLabel[index] : RegexText`. 
	 - But does not show complete nested structure(breadcrumb).
 - Avoid using both OOTB `required` property and `regex`  property validations together. This can results in conflicts.
 - In case of inline error mode , if `fieldLabel`  property is missing then error tooltip may be shown in next line.(OOTB behaviour).
