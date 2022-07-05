/* Component Name   :   aHFC_aboutUsPreLogin
 * @Description      :   LWC for pre login about us page
 * Modification Log  :
 * --------------------------------------------------------------------------------------------------- 
 * Developer                          Date                    Description
 * ---------------------------------------------------------------------------------------------------
 * Sagar Ghadigaonkar                 Aug 23 2021            LWC for pre login about us page
 *******************************************************************************************************/

import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import { fireAdobeEvent } from "c/aHFC_adobeServices";
import { fireEvent } from 'c/pubsub';
export default class AHFC_aboutUs extends NavigationMixin(LightningElement) {

    back() {
        window.history.back();
        return false;

    }
    connectedCallback() {
        let adobedata = {
            "Page.page_name": "About Us",
            "Page.site_section": "About Us",
            "Page.referrer_url": document.referrer,
            "Page.brand_name": sessionStorage.getItem('domainBrand') ? sessionStorage.getItem('domainBrand') : ''
        };
        fireAdobeEvent(adobedata, 'PageLoadReady');
    }
    @wire(CurrentPageReference) pageRef;
    renderedCallback() {

        let firstClass = this.template.querySelector(".main-content");

        fireEvent(this.pageRef, 'MainContent', firstClass.getAttribute('id'));

    }
}