/* Component Name   :    aHFC_printableFormsPreLogin
 * @Description      :    LWC for sub menu printable forms for pre login page
 * Modification Log  :
 * ------------------------------------------------------------------------------------------------------------------ 
 * Developer                          Date                    Description
 * ------------------------------------------------------------------------------------------------------------------
 * Sagar Ghadigaonkar                 Aug 23 2021             LWC for sub menu printable forms for pre login page
  
 ********************************************************************************************************************/

import {
    wire,
    LightningElement,
    track
} from 'lwc';
import {
    loadStyle
} from "lightning/platformResourceLoader";
import hondaHeadLogo from "@salesforce/resourceUrl/AHFC_Honda_Header_Logo";
import loadPrintableForm from "@salesforce/resourceUrl/AHFC_printable_forms";
import loadUpdatedPrintableForm from "@salesforce/resourceUrl/AHFC_updated_printable_forms";
import hondaVehImg from "@salesforce/resourceUrl/AHFC_Honda_Header_Car";
import ahfctheme from "@salesforce/resourceUrl/AHFC_Theme";
import adobeLogo from "@salesforce/resourceUrl/Adobe_Logo";
import {
    NavigationMixin
} from 'lightning/navigation';
import { fireAdobeEvent } from "c/aHFC_adobeServices";
import globalAlertMessage from "@salesforce/apex/AHFC_globalAlert.globalAlertMessage";
import {CurrentPageReference} from "lightning/navigation";
import {fireEvent} from 'c/pubsub';



export default class AHFC_printableForms extends NavigationMixin(LightningElement) {
    @track printForm = "";
    @track form1 = "";
    @track form2 = "";
    @track form3 = "";
    @track form4 = "";
    @track form5 = "";
    @track form6 = "";
    @track form7 = "";
    @track form8 = "";
    @track form9 = "";
    @track form10 = "";
    @track form11 = "";
    @track form13 = "";
    @track domainBrand ='';
    @track isHonda;
    @track pdfData;

    @wire(CurrentPageReference) pageRef;

    get hondaheadLogoUrl() {
        return hondaHeadLogo;
    }
    get hondaVehImgUrl() {
        return hondaVehImg;
    }
    get adobeLogoUrl() {
        return adobeLogo;
    }
    connectedCallback() {

        let adobedata = {
            "Page.page_name": "Printable Form",
            "Page.site_section": "Printable Form",
            "Page.referrer_url": document.referrer,
            "Page.brand_name": sessionStorage.getItem('domainBrand') ? sessionStorage.getItem('domainBrand') : ''
        };
        fireAdobeEvent(adobedata, 'PageLoadReady');
        loadStyle(this, ahfctheme + "/theme.css").then(() => {});
        this.form1 = loadPrintableForm + '/Credit_Pre-approval_Form.pdf';
        this.form2 = loadUpdatedPrintableForm + '/EasyPay_Registration.pdf';
        this.form3 = loadUpdatedPrintableForm + '/EasyPay_Registration_Powersports.pdf';
        this.form4 = loadUpdatedPrintableForm + '/3rd_party_auth.pdf';
        this.form5 = loadUpdatedPrintableForm + '/HFS_RestrictedPowerOfAttorney.pdf';
        this.form6 = loadPrintableForm + '/Ohio Restricted Power of Attorney.pdf';
        this.form7 = loadUpdatedPrintableForm + '/Odometer_Disclosure_Title_Release.pdf';
        this.form8 = loadUpdatedPrintableForm + '/Vehicle_return_receipt_lease.pdf';
        this.form9 = loadUpdatedPrintableForm + '/OH_PowerofAttorney-HFS.pdf';
        this.form10 = loadUpdatedPrintableForm + '/HFS_Privacy_Notice.pdf';
        this.form11 = loadUpdatedPrintableForm + '/HFS_Authorized_Agent_Form.pdf';
        this.form12 = loadUpdatedPrintableForm + '/AFS_Privacy_Notice.pdf';
        this.form13 = loadUpdatedPrintableForm + '/Ohio_Odometer_Disclosure_Title_Release.pdf';
        this.domainBrand = sessionStorage.getItem('domainBrand');
        if (this.domainBrand !== undefined || this.domainBrand !== null || this.domainBrand !== '') {
            if (this.domainBrand == 'Acura') {
               this.form10 = this.form12;
            }
        } else {
            let url = window.location.href;
            if (url.includes('acura')) {
                this.form10 = this.form12;
            }
        }
        this.pdfData = [{
                id: "0",
                class: "",
                contentClass: "",
                cardTitle: 'Apply for credit pre-approval',
                cardList: [{
                    id: "a1",
                    cardData: 'Credit Pre-Approval Application',
                    cardDataView: 'Credit Pre-Approval Application View',
                    cardDataDownload: 'Credit Pre-Approval Application Download',
                    viewSouce: this.form1,
                    downloadSource: this.form1
                }]
            },
            {
                id: "1",
                class: "",
                contentClass: "",
                cardTitle: 'account management',
                cardList: [{
                        id: "a1",
                        cardData: 'EasyPay Authorization Agreement - Auto',
                        cardDataView: 'EasyPay Authorization Agreement - Auto View',
                        cardDataDownload: 'EasyPay Authorization Agreement - Auto Download',
                        viewSouce: this.form2,
                        downloadSource: this.form2,
                        viewFor: "both"

                    },
                    {
                        id: "a2",
                        cardData: 'EasyPay Authorization Agreement - Powersports/Power Equipment/Marine',
                        cardDataView: 'EasyPay Authorization Agreement - Powersports/Power Equipment/Marine View',
                        cardDataDownload: 'EasyPay Authorization Agreement - Powersports/Power Equipment/Marine Download',
                        viewSouce: this.form3,
                        downloadSource: this.form3,
                        viewFor: "honda"
                    },
                    {
                        id: "a3",
                        cardData: 'Third Party Authorization',
                        cardDataView: 'Third Party Authorization View',
                        cardDataDownload: 'Third Party Authorization Download',
                        viewSouce: this.form4,
                        downloadSource: this.form4,
                        viewFor: "honda"
                    }
                ]
            },
            {
                id: "2",
                class: "",
                contentClass: "",
                cardTitle: 'END OF TERM',
                cardList: [{
                        id: "a1",
                        cardData: 'Restricted Power of Attorney',
                        cardDataView: 'Restricted Power of Attorney View',
                        cardDataDownload: 'Restricted Power of Attorney Download',
                        viewSouce: this.form5,
                        downloadSource: this.form5
                    },
                    {
                        id: "a2",
                        cardData: 'Ohio Restricted Power of Attorney',
                        cardDataView: 'Ohio Restricted Power of Attorney View',
                        cardDataDownload: 'Ohio Restricted Power of Attorney Download',
                        viewSouce: this.form9,
                        downloadSource: this.form9
                    },
                    {
                        id: "a3",
                        cardData: 'Odometer Disclosure Statement and Title Release Information',
                        cardDataView: 'Odometer Disclosure Statement and Title Release Information View',
                        cardDataDownload: 'Odometer Disclosure Statement and Title Release Information Download',
                        viewSouce: this.form7,
                        downloadSource: this.form7
                    },
                    {
                        id: "a3",
                        cardData: 'Vehicle Return Receipt',
                        cardDataView: 'Vehicle Return Receipt View',
                        cardDataDownload: 'Vehicle Return Receipt Download',
                        viewSouce: this.form8,
                        downloadSource: this.form8
                    },
                    {
                        id: "a4",
                        cardData: 'Ohio Odometer Disclosure Statement and Title Release Information',
                        cardDataView: 'Ohio Odometer Disclosure Statement and Title Release Information View',
                        cardDataDownload: 'Ohio Odometer Disclosure Statement and Title Release Information Download',
                        viewSouce: this.form13,
                        downloadSource: this.form13
                    }
                ]
            },
            {
                id: "3",
                class: "",
                contentClass: "",
                cardTitle: 'PRIVACY',
                cardList: [{
                        id: "a1",
                        cardData: 'Privacy Notice',
                        cardDataView: 'Privacy Notice View',
                        cardDataDownload: 'Privacy Notice Download',
                        viewSouce: this.form10,
                        downloadSource: this.form10
                    },
                    {
                        id: "a2",
                        cardData: 'Authorized Agent Form',
                        cardDataView: 'Authorized Agent Form View',
                        cardDataDownload: 'Authorized Agent Form Download',
                        viewSouce: this.form11,
                        downloadSource: this.form11
                    }
                ]
            }

        ];

    }

    returnToDashBoard() {
        window.history.back();
        return false;
    }
    
    navigateToCreditPreApproval() {
        this[NavigationMixin.Navigate]({
            type: "comm__namedPage",
            attributes: {
                pageName: 'creditpreapproval-prelogin'
            }
        });
    }

    renderedCallback() {
        let firstClass = this.template.querySelector(".main-content");
        fireEvent(this.pageRef, 'MainContent', firstClass.getAttribute('id'));
    } 
}