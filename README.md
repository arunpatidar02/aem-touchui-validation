
# AEM - Touch UI Component Dialog Custom Validation

You already know the use of Granite UI widget's **required** property - Indicates if the field is mandatory to be filled and shows ***Please fill out this field*** if field is empty. But there are cases where the dialog fields are required custom validation with custom error message.

## Solution

The custom validations for touch UI dialog fields are very common, which required writing client side javascript/jquery scrips but end up writing too much code. 

I inspired with classic UI widget **regex** and **regexText** properties, which allow widget(field) value checked against **regex** property value and shows custom error message, set in **regexText** property . 
The solution for Touch UI is same, which allows custom validation for Granite(Coral3) fileds.



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

## Properties

To allow custom validation A **granite:data** node of type nt:unstructured will be created as the field's sibling node and has the following properties:
 - regex 
 - regexText
 - regexMode
 - min
 - max
> Note : **regexText** *and* **regexMode** *properties are optional.* **min** *and* **max** properties are also optional and required for multifield validation.


||||
|--- |--- |--- |
|**Name**|**Type**|**Description**|
|regex|String|This property specify the type of validation based on values. Possible values are ***Regular Expression***, `required` and `multifield`.|
|regexText|String|Message to display in case of field input is not valid. `Invalid input` is default. |
|regexMode|String|Indicates how to display error messages. Possible values are `inline`, `floating` and `auto`. `inline` is default.|
|min|String|Define Minimum items required for the Multifield.|
|max|String|Define Maximum items allowed for the Multifield.|

> Note : `min` and `max` both are optional and required in `regex` property set to ***multifield***



#### Configuring *regex* property
|||
|--- |--- |
|**Value**|**Description**|
|Regular Expression|If value is set to regular expression, field will be validated against specified regEx string.e.g. `^#([A-Fa-f0-9]{3}){1,2}$`|
|required|if the field is mandatory to be filled. |
|multifield|if the multifield is mandatory to be have minimum or/and maximum items. In this case `min` and/or `max` properties should be set.|

#### Configuring *regexMode* property
|||
|--- |--- |
|**Value**|**Description**|
|inline|The error message will be displayed alongside field in the component dailog. similar to OOTB `required` property validation error.|
|floating|To display error message in model(popup) window |
|auto|Error message will be shown in both the mode, i.e. inline as well as popup.|

## Other Properties

In case of `regexMode`  property value is *floating* , setup to show error message in popup window. The popup dialog Header and content Header can be set using the following properties added in the child node of  `cq:dialog` node:
||||
|--- |--- |--- |
|**Name**|**Type**|**Description**|
|regex-model-heading|String|This property specify the Header text of model(popup). `Dialog cannot be submitted` is default|
|regex-content-heading|String|Popup dialog content header. `Following Fields are invalid` is default. |



## Pros and Cons

 - Solution is based on javascript, no need to do any server side changes or
   resource overlay.
 - easy to plug-in to existing aem dialog clientlibs.
 - Easy to use.
 - Supports latest versions of AEM i.e. AEM 6.3 and above
 #### Limitations
 - Doesn't support coral2 type resource type.
 - Only support Granite Resources(Mentioned in the [Supports][] section)
 - The popup message only display invalid items rows in below format 
	 - `Tab--> FieldLabel : RegexText`. 
	 - And for multifield `Tab--> FieldLabel[index] : RegexText`. 
	 - But does not show complete nested structure(breadcrumb).
 - Avoid using both OOTB `required` property and `regex`  property validations together. This can results in conflicts.
 - In case of inline error mode , if `fieldLabel`  property is missing then error tooltip may be shown in next line.(OOTB behaviour)








## Limitations


In case of inline error mode , if fieldLabel are missing the error tooltip may be shown in next line.

Publishing in StackEdit makes it simple for you to publish online your files. Once you're happy with a file, you can publish it to different hosting platforms like **Blogger**, **Dropbox**, **Gist**, **GitHub**, **Google Drive**, **WordPress** and **Zendesk**. With [Handlebars templates](http://handlebarsjs.com/), you have full control over what you export.

## SmartyPants

SmartyPants converts ASCII punctuation characters into "smart" typographic punctuation HTML entities. For example:

|                |ASCII                          |HTML                         |
|----------------|-------------------------------|-----------------------------|
|Single backticks|`'Isn't this fun?'`            |'Isn't this fun?'            |
|Quotes          |`"Isn't this fun?"`            |"Isn't this fun?"            |
|Dashes          |`-- is en-dash, --- is em-dash`|-- is en-dash, --- is em-dash|







| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the 
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3
```


Touch ui - regex validation


You already know the use of Granite UI widget's required property to add non empty field contrains and if you forget to fill out required field a error tooltip will show the 'Please fill out this field' and dialog will not be submitted. This field gives you to add quick validation for Coral/Granite fields. But there are cases where the dialog fields are not restricted to just have non-empty values, there are cases where values should be in perticular format -
1. Date
2. Color Codes
3. Assets from specific subfolder and formates

There are cases where you need different error tooltip message rather then 'Please fill out this field'.

Solution -
The custom validations for touch UI dialog fields are very common, which required writing front end javascript/jquery scrips.

But what if you have more do custom validation for more fields, you would eneded writing code and code. What If you just need to add few properties to the field and validation wozuld be done without writing a single line of code.

I inspired with classic UI widget regex and regexText property, which bind widget(field) with regex validation and shows custom error message. I've wriiten below utility to do same for Granite(Coral3) fileds.




regex and regexText property
The component can be linked to validate using regex validation. The granite:data node will be added as a sibling to a field and regex, regexText, regexMode and min and max properties can be added based on type of validation and how to show validation errors

regex property (String) : defines the validation type. The following values are available:
Property Value  Description
<Regular Expression>    The field value is validated against this regular expression.
required  : The field is checked for empty or non-empty constrains, similar to required(Boolean)=true, but this will provide custome error meaage e.g. Header can't be empty.
multifield    The multifield will be validate to check min or/and max items. min and max property will be added to specify min and max allowed field for multifild item


Screenshots




The field can be linked to choose how to display error. The regexMode property (String) defines how the error will be shown. The following values are available:
Property Value  Description
floating    The error will be display only in Popup (another Coral dialog).
inline  (default value). The error will be display alongside field in the componnet dailog. similar to required property validation errors
auto    Error will be shown in both the mode, inline and well as popup.


Other properties -
In case of Popup mode of error display. The popup Header and content Header can be set using following properties in the content/other top dialog nodes:
regex-content-heading(String) : Popup dialog Header 
regex-model-heading(String) : Popup dialog content header

screeshots

It works for dialog and design dialog for following resources
ResourceType :
granite/ui/components/coral/foundation/form/textfield
granite/ui/components/coral/foundation/form/numberfield
granite/ui/components/coral/foundation/form/textarea
cq/gui/components/authoring/dialog/richtext
granite/ui/components/coral/foundation/form/select
granite/ui/components/coral/foundation/form/checkbox
granite/ui/components/coral/foundation/form/radiogroup
granite/ui/components/coral/foundation/form/fieldset
granite/ui/components/coral/foundation/form/pathfield
granite/ui/components/coral/foundation/form/pathbrowser
cq/gui/components/authoring/dialog/fileupload
granite/ui/components/coral/foundation/form/colorfield
granite/ui/components/coral/foundation/form/datepicker
granite/ui/components/coral/foundation/form/multifield

for cq/gui/components/authoring/dialog/richtext add regex and regexText properties in the same node, no need to create sibling data:granite node.
screenshot

for creating checkbox list and validate any one of them should be checked use granite/ui/components/coral/foundation/form/fieldset and item checkbox item under this node and put validation to select anyof them 
screenshot

In case of inline the fieldDescription is replaced with Error message and Tabs is highlighed in red color.

If there is no RegexText Provided, the defualt regex text i.e. 'Invalid input' would be display.



Advantages:
1. Client side library, no need to do any server side changes or resource ocerlay
2. Easy to plug-in play and use.


Limitation:
Supports AEM 6.3 and above
It doesn't support Coral2 resourcetype.
Only support Granite Resources(Mentioned in Resource section)
for nested field may not check all scenario
The popup message only display invalid items rows in below format Tab--> FieldLabel : RegexText. and for multifield Tab--> FieldLabel[index] : RegexText. But doesn't show complete nested structure.
In case of inline error mode , if fieldLabel are missing the error tooltip may be shown in next line.
Avoid using OOTB reuired field and this regex validation together.



