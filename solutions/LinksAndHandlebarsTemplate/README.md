---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  createdDate: 10/1/2017 12:00:00 AM
---
# Hub and Link Web Parts

## Summary

This solution contains the following web parts:

### Hub Links

A list of links that can either be set within the properties of the web part or in a SharePoint List

Icon Layout:

![Hub Links Icons Layout](./assets/hub_links_icon.png "Hub Links Icons Layout")

List Layout:

![Hub Links List Layout](./assets/hub_links_list.png "Hub Links List Layout")

Grouped Layout:

![Hub Links Group Layout](./assets/hub_links_grouped.png "Hub Links Group Layout")

### Featured Content

Tile links that enable users to show links with images stored within the web part or in a SharePoint list

Default Layout:

![Featured Content Default Layout](./assets/featured_content.png "Featured Content Default Layout")

Default Layout Small Column:

![Featured Content Single Column Layout](./assets/featured_content_small_column.png "Featured Content Single Column Layout")

Stacked Layout:

![Featured Content Stacked Layout](./assets/featured_content_stacked.png "Featured Content Stacked Layout")

### Box Button

Button links that can be stored within the web part or in a SharePoint list

![Box Button](./assets/box_button.png "Box Button")

### Hub Template

A handlebars template web part that enables highly customized UI code to be applied to SharePoint list items. 

> The Hub Template web part allow users to add JavaScript into the page.  Carefully consider the implications of this capability, and restrict creation and updating of this part to specific site collections and audiences. The Hub Template is the only web part in the group that allows script injection

![Hub Template](./assets/hub_template.png "Hub Template")

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-1.4.1-green.svg)

## Applies to

* [SharePoint Framework](https://dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Prerequisites
 
Note that you will need to download and host a CAMLJS javascript library (https://github.com/andrei-markeev/camljs/blob/master/CamlJs/camljs.js).


## Version history

Version  | Date               | Comments
-------- | ------------------ | --------
1.0      | September 27, 2017 | Initial release
1.1      | April 12, 2018 | Updated to use CDN and to use SPFx v1.4.1

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- (Optional) Configure the web part usage logging - /src/utilities/webpartlogger
- (Optional) Configure the approved image tab for the link picker - /src/components/LinkPickerPanel
- in the command line run:
  - `npm install`
  - `gulp serve`

<img src="https://telemetry.sharepointpnp.com/sp-dev-solutions/solutions/linksandhandlebarstemplate" />