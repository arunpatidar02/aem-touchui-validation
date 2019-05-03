# AEM - Touch UI Component Dialog Custom Validation

Hi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.


## Solution

StackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**

## Supports

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

## Properties

All your files are listed in the file explorer. You can switch from one to another by clicking a file in the list.

## Error mode

You can rename the current file by clicking the file name in the navigation bar or by clicking the **Rename** button in the file explorer.

## Advantages

You can delete the current file by clicking the **Remove** button in the file explorer. The file will be moved into the **Trash** folder and automatically deleted after 7 days of inactivity.

## Limitations

You can export the current file by clicking **Export to disk** in the menu. You can choose to export the file as plain Markdown, as HTML using a Handlebars template or as a PDF.

There are two types of synchronization and they can complement each other:

- The workspace synchronization will sync all your files, folders and settings automatically. This will allow you to fetch your workspace on any other device.
	> To start syncing your workspace, just sign in with Google in the menu.

- The file synchronization will keep one file of the workspace synced with one or multiple files in **Google Drive**, **Dropbox** or **GitHub**.
	> Before starting to sync files, you must link an account in the **Synchronize** sub-menu.

Publishing in StackEdit makes it simple for you to publish online your files. Once you're happy with a file, you can publish it to different hosting platforms like **Blogger**, **Dropbox**, **Gist**, **GitHub**, **Google Drive**, **WordPress** and **Zendesk**. With [Handlebars templates](http://handlebarsjs.com/), you have full control over what you export.

## SmartyPants

SmartyPants converts ASCII punctuation characters into "smart" typographic punctuation HTML entities. For example:

|                |ASCII                          |HTML                         |
|----------------|-------------------------------|-----------------------------|
|Single backticks|`'Isn't this fun?'`            |'Isn't this fun?'            |
|Quotes          |`"Isn't this fun?"`            |"Isn't this fun?"            |
|Dashes          |`-- is en-dash, --- is em-dash`|-- is en-dash, --- is em-dash|







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



