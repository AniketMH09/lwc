/* Component Name   :    aHFC_protectionProductsPreLogin
 * @Description      :    LWC for sub menu protection products  for pre login page
 * Modification Log  :
 * ------------------------------------------------------------------------------------------------------------------ 
 * Developer                          Date                    Description
 * ------------------------------------------------------------------------------------------------------------------
 * Sagar Ghadigaonkar                 Aug 23 2021             LWC for sub menu protection products  for pre login page
 
 ********************************************************************************************************************/

import { LightningElement, track, wire } from 'lwc';
import { loadStyle } from "lightning/platformResourceLoader";
import hondaHeadLogo from "@salesforce/resourceUrl/AHFC_Honda_Header_Logo";
import hondaVehImg from "@salesforce/resourceUrl/AHFC_Honda_Header_Car";
import ahfctheme from "@salesforce/resourceUrl/AHFC_Theme";
import { NavigationMixin } from 'lightning/navigation';
import bannerDesktop from "@salesforce/resourceUrl/AHFC_Protection_Products_Banner_Desktop";
import bannerMobile from "@salesforce/resourceUrl/AHFC_Protection_Products_Banner_Mobile";
import vscDesktop from "@salesforce/resourceUrl/AHFC_Protection_Products_VSC_Desktop";
import vscMobile from "@salesforce/resourceUrl/AHFC_Protection_Products_VSC_Mobile";
import gapDesktop from "@salesforce/resourceUrl/AHFC_Protection_Products_GAP_Desktop";
import gapMobile from "@salesforce/resourceUrl/AHFC_Protection_Products_GAP_Mobile";
import maintenanceDesktop from "@salesforce/resourceUrl/AHFC_Protection_Products_Maintenance_Desktop";
import maintenanceMobile from "@salesforce/resourceUrl/AHFC_Protection_Products_Maintenance_Mobile";
import sentinelDesktop from "@salesforce/resourceUrl/AHFC_Protection_Products_Sentinel_Desktop";
import sentinelMobile from "@salesforce/resourceUrl/AHFC_Protection_Products_Sentinel_Mobile";
import phoneDesktop from "@salesforce/resourceUrl/AHFC_Protection_Products_Phone_Desktop";
import phoneMobile from "@salesforce/resourceUrl/AHFC_Protection_Products_Phone_Mobile";
import protectionProductsBrochuresFirst from "@salesforce/resourceUrl/AHFC_Protection_Products_Brochures_First";
import protectionProductsBrochuresSecond from "@salesforce/resourceUrl/AHFC_Protection_Products_Brochures_Second";
import protectionProductsBrochuresThird from "@salesforce/resourceUrl/AHFC_Protection_Products_Brochures_Third";
import { fireAdobeEvent } from "c/aHFC_adobeServices";
import {
    CurrentPageReference
} from "lightning/navigation";
import {
    fireEvent
} from 'c/pubsub';

export default class AHFC_protectionProducts extends NavigationMixin(LightningElement) {

    @wire(CurrentPageReference) pageRef;
    @track PPAccord1 = {
        id: "A1",
        class: "",
        contentClass: "slds-accordion__content",
        pdf1: "",
        pdf2: "",
        pdf3: "",
        pdf4: "",
        isOpened: false
    };
    @track PPAccord2 = {
        id: "A2",
        class: "",
        contentClass: "slds-accordion__content",
        pdf1: "",
        pdf2: "",
        pdf3: "",
        isOpened: false
    };
    @track PPAccord3 = {
        id: "A3",
        class: "",
        contentClass: "slds-accordion__content",
        pdf1: "",
        pdf2: "",
        isOpened: false
    };
    @track PPAccord4 = {
        id: "A4",
        class: "",
        contentClass: "slds-accordion__content",
        pdf1: "",
        pdf2: "",
        pdf3: "",
        isOpened: false
    };
    @track FAQAc1 = {
        id: "faq1", 
        name: "FAQAc1",
        class: "",
        isOpened: false
    };
    @track FAQAc2 = {
        id: "faq2",
        name: "FAQAc2",
        class: "",
        isOpened: false
    };
    @track FAQAc3 = {
        id: "faq3",
        name: "FAQAc3",
        class: "",
        isOpened: false
    };
    get bannerDesktopUrl() {
        return bannerDesktop;
    }
    get bannerMobilepUrl() {
        return bannerMobile;
    }
    get vscDesktopUrl() {
        return vscDesktop;
    }
    get vscMobileUrl() {
        return vscMobile;
    }
    get gapDesktopUrl() {
        return gapDesktop;
    }
    get gapMobileUrl() {
        return gapMobile;
    }
    get maintenanceDesktopUrl() {
        return maintenanceDesktop;
    }
    get maintenanceMobileUrl() {
        return maintenanceMobile;
    }
    get sentinelDesktopUrl() {
        return sentinelDesktop;
    }
    get sentinelMobileUrl() {
        return sentinelMobile;
    }
    get phoneDesktopUrl() {
        return phoneDesktop;
    }
    get phoneMobileUrl() {
        return phoneMobile;
    }
    get hondaheadLogoUrl() {
        return hondaHeadLogo;
    }
    get hondaVehImgUrl() {
        return hondaVehImg;
    }
    onMobileSectionsClick(event) {
        const open = "slds-is-open";
        const close = "";
        if (event.currentTarget.dataset.keyno) {
            let keyId = event.currentTarget.dataset.keyno;
            let keyName = '';
            if (keyId === "A1") {
                keyName = "PPAccord1";
            }
            if (keyId === "A2") {
                keyName = "PPAccord2";
            }
            if (keyId === "A3") {
                keyName = "PPAccord3";
            }
            if (keyId === "A4") {
                keyName = "PPAccord4";
            }
            this[keyName].isOpened = !this[keyName].isOpened;
            this[keyName].class = this[keyName].class === open ? close : open;
        }
    }
    faqClick(event) {
        const open = "slds-is-open";
        const close = "";
        let faqName = event.currentTarget.dataset.name;
        if (event.currentTarget.dataset.keyno) {
            this[faqName].isOpened = !this[faqName].isOpened;
            this[faqName].class = this[faqName].class === open ? close : open;
        }
    }
    connectedCallback() {

        let adobedata = {
            "Page.site_section": "Protection Products",
            "Page.page_name": "Protection Products",
            "Page.referrer_url": document.referrer,
            "Page.brand_name": sessionStorage.getItem('domainBrand') ? sessionStorage.getItem('domainBrand') : ''
        };
        fireAdobeEvent(adobedata, 'PageLoadReady');
        loadStyle(this, ahfctheme + "/theme.css").then(() => { });
        this.PPAccord1.pdf1 = protectionProductsBrochuresFirst + '/2021_Honda_Care_Honda_Vehicles_Coverage_eBrochure.pdf';
        this.PPAccord1.pdf2 = protectionProductsBrochuresFirst + '/2021_Honda_Care_Non-Honda_Coverage_eBrochure.pdf';
        this.PPAccord1.pdf3 = protectionProductsBrochuresFirst + '/2021_Acura_Care_Acura_Vehicles_Coverage_eBrochure.pdf';
        this.PPAccord1.pdf4 = protectionProductsBrochuresFirst + '/2021_Acura_Care_Non-Acura_Coverage_eBrochure.pdf';


        this.PPAccord2.pdf1 = protectionProductsBrochuresThird + '/2022_Honda_Care_Sentinel_Services_Coverage_eBrochure.pdf';
        this.PPAccord2.pdf2 = protectionProductsBrochuresThird + '/2021_Honda_Care_Sentinel_Plus_Coverage_eBrochure.pdf';
        this.PPAccord2.pdf3 = protectionProductsBrochuresThird + '/2022_Acura_Care_Sentinel_Services_Coverage_eBrochure.pdf';


        this.PPAccord3.pdf1 = protectionProductsBrochuresSecond + '/2022_Honda_Care_Maintenance_eBrochure.pdf';
        this.PPAccord3.pdf2 = protectionProductsBrochuresSecond + '/2022_Acura_Care_Maintenance_eBrochure.pdf';


        this.PPAccord4.pdf1 = protectionProductsBrochuresSecond + '/2021_HFS_GAP_eBrochure.pdf';
        this.PPAccord4.pdf2 = protectionProductsBrochuresSecond + '/2021_AFS_GAP_eBrochure.pdf';
        this.PPAccord4.pdf3 = protectionProductsBrochuresSecond + '/2021_PS_GAP_eBrochure.pdf';
    }



    returnToDashBoard() {
        this[NavigationMixin.Navigate]({
            type: "comm__namedPage",
            attributes: {
                pageName: "dashboard"
            },
        });
    }

    tagging1() {
        let adobedata = {
            'Event_Metadata.action_type': 'Download',
            "Event_Metadata.action_label": "Protection:Download:Honda Care-Honda",
            "Event_Metadata.action_category": "Vehicle Service Contracts",
            "Page.page_name": "Protection Products",
            "Page.brand_name": sessionStorage.getItem('domainBrand') ? sessionStorage.getItem('domainBrand') : ''
        };
        fireAdobeEvent(adobedata, 'click-event');
    }
    tagging2() {
        let adobedata = {
            'Event_Metadata.action_type': 'Download',
            "Event_Metadata.action_label": "Protection:Download:Honda Care-Non Honda",
            "Event_Metadata.action_category": "Vehicle Service Contracts",
            "Page.page_name": "Protection Products",
            "Page.brand_name": sessionStorage.getItem('domainBrand') ? sessionStorage.getItem('domainBrand') : ''
        };
        fireAdobeEvent(adobedata, 'click-event');
    }
    tagging3() {
        let adobedata = {
            'Event_Metadata.action_type': 'Download',
            "Event_Metadata.action_label": "Protection:Download:Acura Care-Acura",
            "Event_Metadata.action_category": "Vehicle Service Contracts",
            "Page.page_name": "Protection Products",
            "Page.brand_name": sessionStorage.getItem('domainBrand') ? sessionStorage.getItem('domainBrand') : ''
        };
        fireAdobeEvent(adobedata, 'click-event');
    }
    tagging4() {
        let adobedata = {
            'Event_Metadata.action_type': 'Download',
            "Event_Metadata.action_label": "Protection:Download:Acura Care-Non Acura",
            "Event_Metadata.action_category": "Vehicle Service Contracts",
            "Page.page_name": "Protection Products",
            "Page.brand_name": sessionStorage.getItem('domainBrand') ? sessionStorage.getItem('domainBrand') : ''
        };
        fireAdobeEvent(adobedata, 'click-event');
    }
    tagging5() {
        let adobedata = {
            'Event_Metadata.action_type': 'Download',
            "Event_Metadata.action_label": "Protection:Download:Honda Care Sentinel",
            "Event_Metadata.action_category": "Sentinel Services & Sentinel Plus",
            "Page.page_name": "Protection Products",
            "Page.brand_name": sessionStorage.getItem('domainBrand') ? sessionStorage.getItem('domainBrand') : ''
        };
        fireAdobeEvent(adobedata, 'click-event');
    }
    tagging6() {
        let adobedata = {
            'Event_Metadata.action_type': 'Download',
            "Event_Metadata.action_label": "Protection:Download:Honda Care Sentinel Plus",
            "Event_Metadata.action_category": "Sentinel Services & Sentinel Plus",
            "Page.page_name": "Protection Products",
            "Page.brand_name": sessionStorage.getItem('domainBrand') ? sessionStorage.getItem('domainBrand') : ''
        };
        fireAdobeEvent(adobedata, 'click-event');
    }
    tagging7() {
        let adobedata = {
            'Event_Metadata.action_type': 'Download',
            "Event_Metadata.action_label": "Protection:Download:Acura Care Sentinel",
            "Event_Metadata.action_category": "Sentinel Services & Sentinel Plus",
            "Page.page_name": "Protection Products",
            "Page.brand_name": sessionStorage.getItem('domainBrand') ? sessionStorage.getItem('domainBrand') : ''
        };
        fireAdobeEvent(adobedata, 'click-event');
    }
    tagging8() {
        let adobedata = {
            'Event_Metadata.action_type': 'Download',
            "Event_Metadata.action_label": "Protection:Download:Honda Care Maintenance",
            "Event_Metadata.action_category": "Maintenance Program",
            "Page.page_name": "Protection Products",
            "Page.brand_name": sessionStorage.getItem('domainBrand') ? sessionStorage.getItem('domainBrand') : ''
        };
        fireAdobeEvent(adobedata, 'click-event');
    }
    tagging9() {
        let adobedata = {
            'Event_Metadata.action_type': 'Download',
            "Event_Metadata.action_label": "Protection:Download:Acura Care Maintenance",
            "Event_Metadata.action_category": "Maintenance Program",
            "Page.page_name": "Protection Products",
            "Page.brand_name": sessionStorage.getItem('domainBrand') ? sessionStorage.getItem('domainBrand') : ''
        };
        fireAdobeEvent(adobedata, 'click-event');
    }
    tagging10() {
        let adobedata = {
            'Event_Metadata.action_type': 'Download',
            "Event_Metadata.action_label": "Protection:Download:Honda Care GAP",
            "Event_Metadata.action_category": "Guaranteed Asset Protection",
            "Page.page_name": "Protection Products",
            "Page.brand_name": sessionStorage.getItem('domainBrand') ? sessionStorage.getItem('domainBrand') : ''
        };
        fireAdobeEvent(adobedata, 'click-event');
    }
    tagging11() {
        let adobedata = {
            'Event_Metadata.action_type': 'Download',
            "Event_Metadata.action_label": "Protection:Download:Acura Care GAP",
            "Event_Metadata.action_category": "Guaranteed Asset Protection",
            "Page.page_name": "Protection Products",
            "Page.brand_name": sessionStorage.getItem('domainBrand') ? sessionStorage.getItem('domainBrand') : ''
        };
        fireAdobeEvent(adobedata, 'click-event');
    }
    tagging12() {
        let adobedata = {
            'Event_Metadata.action_type': 'Download',
            "Event_Metadata.action_label": "Protection:Download:Powersports Care GAP",
            "Event_Metadata.action_category": "Guaranteed Asset Protection",
            "Page.page_name": "Protection Products",
            "Page.brand_name": sessionStorage.getItem('domainBrand') ? sessionStorage.getItem('domainBrand') : ''
        };
        fireAdobeEvent(adobedata, 'click-event');
    }
    renderedCallback() {
        let firstClass = this.template.querySelector(".main-content");
        fireEvent(this.pageRef, 'MainContent', firstClass.getAttribute('id'));
    }
}