/* Component Name        :    AHFC_dashboard
    * Description        :    This is LWC for Dashboard Main Page. 
    * Modification Log   :  
    * ---------------------------------------------------------------------------
    * Developer                   Date                   Description
    * ---------------------------------------------------------------------------
    
    * Aniket                     07/06/2021              Created \
    * Akash                      14/07/2021              Modifed - US 4373 - Blank Dashboard When no finance accounts are available on dashboard carousel.
*/
import { LightningElement, track, wire } from 'lwc';
import { loadStyle } from "lightning/platformResourceLoader";
import ahfctheme from "@salesforce/resourceUrl/AHFC_Theme";
import FORM_FACTOR from "@salesforce/client/formFactor";
import { CurrentPageReference } from "lightning/navigation";

import hondaLogo from "@salesforce/resourceUrl/AHFC_Honda_Header_Logo";
import acuraLogo from "@salesforce/resourceUrl/AHFC_Acura_Header_Logo";
import hondaCar from "@salesforce/resourceUrl/AHFC_Honda_Header_Car";

import AHFC_static_Image_Marine from "@salesforce/resourceUrl/AHFC_static_Image_Marine";
import AHFC_static_Image_Powerequipment from "@salesforce/resourceUrl/AHFC_static_Image_Powerequipment";
import AHFC_static_Image_Non_honda_acura from "@salesforce/resourceUrl/AHFC_static_Image_Non_honda_acura";
import AHFC_static_Image_Non_available from "@salesforce/resourceUrl/AHFC_static_Image_Non_available";
import blankDashboardMarketingTile from "@salesforce/resourceUrl/AHFC_BlankDashboard_MarketingTile";


import getServiceAccountDetails from "@salesforce/apex/AHFC_DashboardController.getServiceAccountdetails";
import handleGetAccountInfo from "@salesforce/apex/AHFC_GetAccountInfoIntergationHandler.handleGetAccountInfo";
import getEconfigResponse from "@salesforce/apex/AHFC_EConfigIntegrationHandler.getEconfigResponse";

import { refreshApex } from '@salesforce/apex';
import { labels } from "c/aHFC_dashboardConstantsUtil";
import { fireEvent } from 'c/pubsub';
import { NavigationMixin } from "lightning/navigation";

export default class AHFC_dashboard extends NavigationMixin(LightningElement) {




    @track wiredAccountList = [];
    @track currentFinAccId = '';
    @track labels = labels;
    @track isHonda = true; // Car Logo Logic
    @track showCarDetailsMobile = false; // Show Car Info in Mobile Logic
    @track showMadePayment;
    @track showBlankDashboard = false;
    @track isEditNickname = false;
    @track lstofServiceAccountwrapper;
    @track selServiceAccountWrapperForHeader = [];
    @track selServiceAccountWrapper;
    @track selServiceAccountWrapperForMobile;
    @track showCarousel;
    @track showdashboard;
    @track isCarousalFirstItem = true;
    @track carousalPrevButtonClass = "slds-button carousal-button-desktop carousal-button-disabled";
    @track isCarousalLastItem = false;
    @track carousalNextButtonClass = "slds-button carousal-button-desktop";
    @track showdesktop;
    @track showmobile;
    currentItem;
    @track passDataTooStatements;
    @track isLoaded = false;
    @track isLocked = false;
    @track lockedmobile = [];
    @track currentFinId = '';
    @track isEOTDashboardInfo = false; // 4674 - EOT info section
    @track nextStep = false;
    get hondaLogoUrl() {
        return hondaLogo;
    }

    get acuraLogoUrl() {
        return acuraLogo;
    }

    get hondaCarUrl() {
        return hondaCar;
    }


    //Blank State Dashboard - US 4373
    get blankDashboardMarketingTileURL() {
        return blankDashboardMarketingTile;
    }


    @wire(CurrentPageReference) pageRef;

    //Mobile view for Locked Accounts
    @track lockedmobileSections = [
        {
            id: "0",
            class: "slds-accordion__section",
            contentClass: "slds-accordion__content",
            isOpened: false,
            header: this.labels.DashboardSupportRequest,
            isGrayedOut: true,
            isSupportRequest: true
        },
        {
            id: "1",
            class: "slds-accordion__section",
            contentClass: "slds-accordion__content",
            isOpened: false,
            header: this.labels.DashboardCorrespondence,
            isGrayedOut: true,
            isCorrespondence: true
        },
        {
            id: "2",
            class: "slds-accordion__section",
            contentClass: "slds-accordion__content",
            isOpened: false,
            header: this.labels.DashboardFaq,
            isGrayedOut: false,
            isFaqs: true
        }

    ];


    // Mobile Section Accordion Logic
    @track mobileSections = [
        {
            id: "0",
            class: "slds-accordion__section",
            contentClass: "slds-accordion__content",
            isOpened: false,
            header: this.labels.DashboardPaymentProgress,
            isPaymentProgress: true
        },
        {
            id: "1",
            class: "slds-accordion__section",
            contentClass: "slds-accordion__content",
            isOpened: false,
            header: this.labels.DashboardPaymentActivity,
            isPaymentActivity: true
        },
        {
            id: "2",
            class: "slds-accordion__section",
            contentClass: "slds-accordion__content",
            isOpened: false,
            header: this.labels.DashboardStatements,
            isStatements: true
        },
        {
            id: "3",
            class: "slds-accordion__section",
            contentClass: "slds-accordion__content",
            isOpened: false,
            header: this.labels.DashboardSupportRequest,
            isSupportRequest: true
        },
        {
            id: "4",
            class: "slds-accordion__section",
            contentClass: "slds-accordion__content",
            isOpened: false,
            header: this.labels.DashboardCorrespondence,
            isCorrespondence: true
        },
        {
            id: "5",
            class: "slds-accordion__section",
            contentClass: "slds-accordion__content",
            isOpened: false,
            header: this.labels.DashboardFaq,
            isFaqs: true
        }

    ];

    //preparetion of e-config service input data
    econfiServicePreapartion() {
        let econfigArray = [];
        let str = '';
        for (let i = 0; i < this.selServiceAccountWrapperForHeader.length; i++) {
            if (this.selServiceAccountWrapperForHeader[i].serAccRec.AHFC_Product_Type__c != undefined) {
                switch (this.selServiceAccountWrapperForHeader[i].serAccRec.AHFC_Product_Type__c) {

                    //Product type is Auto
                    case 'Auto':
                        if (this.selServiceAccountWrapperForHeader[i].serAccRec.AHFC_Product_Division__c != undefined && this.selServiceAccountWrapperForHeader[i].serAccRec.Vehicle_Identification_Number__c != undefined) {
                            if (this.selServiceAccountWrapperForHeader[i].serAccRec.AHFC_Product_Division__c != "N09") {

                                econfigArray.push({ '@vin_number': this.selServiceAccountWrapperForHeader[i].serAccRec.Vehicle_Identification_Number__c, "@division_cd": this.selServiceAccountWrapperForHeader[i].serAccRec.AHFC_Product_Division__c.charAt(0) })
                                this.selServiceAccountWrapperForHeader[i].imageurl = AHFC_static_Image_Non_available;
                            } else {
                                if (this.selServiceAccountWrapperForHeader[i].serAccRec.Honda_Brand__c == 'HFS') {
                                    this.selServiceAccountWrapperForHeader[i].imageurl = AHFC_static_Image_Non_honda_acura;
                                }
                                if (this.selServiceAccountWrapperForHeader[i].serAccRec.Honda_Brand__c == 'AFS') {
                                    this.selServiceAccountWrapperForHeader[i].imageurl = AHFC_static_Image_Non_honda_acura;
                                }
                            }
                        } else {
                            this.selServiceAccountWrapperForHeader[i].imageurl = AHFC_static_Image_Non_available;
                        }
                        break;

                    //Product type is Power sport
                    case 'Powersports':
                        this.selServiceAccountWrapperForHeader[i].imageurl = AHFC_static_Image_Non_available;
                        break;

                    //Product type is Marine
                    case 'Marine':
                        this.selServiceAccountWrapperForHeader[i].imageurl = AHFC_static_Image_Marine;
                        break;

                    //Product type is Power Equipment
                    case 'Power Equipment':
                        this.selServiceAccountWrapperForHeader[i].imageurl = AHFC_static_Image_Powerequipment;
                        break;

                    //Product type is Other
                    case 'Other':
                        this.selServiceAccountWrapperForHeader[i].imageurl = AHFC_static_Image_Non_available;
                        break;
                }
            } else {
                this.selServiceAccountWrapperForHeader[i].imageurl = AHFC_static_Image_Non_available;
            }
        }
        for (let i = 0; i < econfigArray.length; i++) {
            if (i == econfigArray.length - 1) {
                str = str + JSON.stringify(econfigArray[i]);
            } else {
                str = str + JSON.stringify(econfigArray[i]) + ',';
            }
        }
        if (econfigArray.length > 0) {
            this.callEconfigWebService(str);
        }

    }


    //Actual Econfig web service callout
    callEconfigWebService(str) {
        getEconfigResponse({ inpVin: str })
            .then(result => {
                let imagesUrls = JSON.parse(result);
                let errorcode = '@error_reason';
                if (imagesUrls[errorcode] == undefined) {
                    for (let key in imagesUrls) {
                        for (let i = 0; i < this.selServiceAccountWrapperForHeader.length; i++) {
                            if (this.selServiceAccountWrapperForHeader[i].serAccRec.Vehicle_Identification_Number__c == key) {
                                if (!imagesUrls[key].includes('Error')) {
                                    this.selServiceAccountWrapperForHeader[i].imageurl = imagesUrls[key];
                                }
                            }
                        }
                    }
                }
            })
            .catch(error => {
                console.log('170', error);
            })
    }


    //To get Dashbaord Data.
    @wire(getServiceAccountDetails)
    wiredData(result) {
        this.wiredAccountList = result;
        if (result.data) {
            this.lstofServiceAccountwrapper = result.data;
            this.showCarousel = result.data.length > 1 ? true : false;
            if (result.data.length > 0) {
                this.formatAccounts(JSON.parse(JSON.stringify(result.data)));
                this.econfiServicePreapartion();
                this.showBlankDashboard = false;
                if (this.currentFinAccId != '') {
                    for (let i = 0; i < this.selServiceAccountWrapperForHeader.length; i++) {
                        if (this.selServiceAccountWrapperForHeader[i].serAccRec.Id == this.currentFinAccId) {
                            this.setPageData('', i);
                        }
                    }
                } else {
                    this.setPageData('', 0);
                }

            } else {
                //Blank State Dashboard - US 4373
                let payload = {
                    blankDashboard: true
                };
                fireEvent(this.pageRef, 'BlankDashboardShow', JSON.stringify(payload));
                this.showBlankDashboard = true;
                this.showBlankDashboard = true;
                this.mobileSections.splice(0, 5);
                this.mobileSections[0].id = "0";
            }
            this.showdashboard = true;

        } else {
            console.log('error', result.error);
        }

    }

    //To get Account info from web sevice call
    getAccountInfo(findata) {

        this.isLocked = false;
        let newfindata = JSON.parse(findata);
        let obj = {};
        obj.Id = newfindata.serAccRec.Id;
        if (newfindata.serAccRec.AHFC_Web_Account_Locked__c == undefined && newfindata.serAccRec.AHFC_Fl_Archived__c == undefined) {
            obj.AHFC_Web_Account_Locked__c = "N";
            obj.AHFC_Fl_Archived__c = "N";
        } else if (newfindata.serAccRec.AHFC_Web_Account_Locked__c != undefined && newfindata.serAccRec.AHFC_Fl_Archived__c == undefined) {
            obj.AHFC_Web_Account_Locked__c = newfindata.serAccRec.AHFC_Web_Account_Locked__c;
            obj.AHFC_Fl_Archived__c = 'N';
        } else if (newfindata.serAccRec.AHFC_Web_Account_Locked__c == undefined && newfindata.serAccRec.AHFC_Fl_Archived__c != undefined) {
            obj.AHFC_Web_Account_Locked__c = 'N';
            obj.AHFC_Fl_Archived__c = newfindata.serAccRec.AHFC_Fl_Archived__c;
        } else {
            obj.AHFC_Web_Account_Locked__c = newfindata.serAccRec.AHFC_Web_Account_Locked__c;
            obj.AHFC_Fl_Archived__c = newfindata.serAccRec.AHFC_Fl_Archived__c;
        }

        let payload = {
            finaAccountData: obj,
            getAccountInfo: ''
        };

        if (newfindata.serAccRec.AHFC_Web_Account_Locked__c !== undefined && newfindata.serAccRec.AHFC_Web_Account_Locked__c == 'Y') {
            this.isLocked = true;
            fireEvent(this.pageRef, 'financeAccountInfo', JSON.stringify(payload));
        } else {
            if (sessionStorage.getItem(newfindata.accNo) == null) {
                this.isLoaded = true;
                handleGetAccountInfo({ strFinanceAccount: newfindata.accNo })
                    .then(data => {
                        sessionStorage.setItem(newfindata.accNo, data);
                        let getaccountdata = JSON.parse(data);
                        payload.getAccountInfo = getaccountdata;
                        fireEvent(this.pageRef, 'financeAccountInfo', JSON.stringify(payload));
                        if (getaccountdata.isWebsiteRestricted == true) {
                            this.isLocked = true;
                        }
                        this.isLoaded = false;
                    })
                    .catch(error => {
                        console.log('error 362', error);
                        this.isLoaded = false;
                        fireEvent(this.pageRef, 'financeAccountInfo', JSON.stringify(payload));
                        if (newfindata.serAccRec.AHFC_Web_Account_Locked__c !== undefined) {
                            if (newfindata.serAccRec.AHFC_Web_Account_Locked__c == 'Y') {
                                this.isLocked = true;
                            }
                            if (newfindata.serAccRec.AHFC_Web_Account_Locked__c == 'N') {
                                this.isLocked = false;
                            }
                        }
                    })
            } else {
                let sessioneddata = JSON.parse(sessionStorage.getItem(newfindata.accNo));
                payload.getAccountInfo = sessioneddata;
                if (sessioneddata.isWebsiteRestricted) {
                    this.isLocked = true;
                }
                fireEvent(this.pageRef, 'financeAccountInfo', JSON.stringify(payload));

            }
        }
    }


    //connected call back
    connectedCallback() {
        this.lockedmobile = JSON.parse(JSON.stringify(this.mobileSections));
        loadStyle(this, ahfctheme + "/theme.css").then(() => { });
        if (FORM_FACTOR == this.labels.Large) {
            this.showdesktop = true;
            this.showmobile = false;
        } else if (FORM_FACTOR == this.labels.Medium) {
            this.showdesktop = true;
            this.showmobile = true;
        } else {
            this.showdesktop = false;
            this.showmobile = true;
        }
        this.showdesktop = true;
    }


    // Format account to show on dashboard.
    formatAccounts(totalAccounts) {
        this.selServiceAccountWrapperForHeader = [];

        let testarray = JSON.parse(JSON.stringify(totalAccounts));
        let newtestarray = [];
        let abc = [];

        for (let i = 0; i < testarray.length; i++) {
            if (testarray[i].serAccRec.AHFC_Web_Account_Locked__c == undefined || testarray[i].serAccRec.AHFC_Web_Account_Locked__c == 'Y') {
                abc.push(testarray[i]);
            } else {
                newtestarray.push(testarray[i]);
            }
        }

        let sortedData = newtestarray.concat(abc);


        sortedData.forEach((val, index) => {
            val.keyNo = index;
            val.panelId = `panel-${index}`;
            val.ariaHidden = "true";
            val.tabIndex = "-1";
            val.indicatorId = `indicator-${index}`;
            val.indicatorClass = "slds-carousel__indicator-action";
            val.ariaSelected = "false";
            val.name = val.serAccRec
                ? val.serAccRec.AHFC_Product_Nickname__c
                : "";
            val.vin = val.serAccRec
                ? val.serAccRec.Vehicle_Identification_Number__c
                : "";
            val.accNo = val.serAccRec
                ? val.serAccRec.Finance_Account_Number__c
                : "";
            val.accType = val.serAccRec ? val.serAccRec.Account_Type__c : "";
            this.selServiceAccountWrapperForHeader.push(val);

        });






    }

    // 4674 - EOT info section start
    closeinfo(event) {
        this.isEOTDashboardInfo = false;
    }
    // 4674 - EOT info section end

    //setup account data when toggle.
    setPageData(prevPage, nextPage) {
        if (prevPage + "") {
            this.selServiceAccountWrapperForHeader[prevPage].ariaHidden = "true";
            this.selServiceAccountWrapperForHeader[prevPage].tabIndex = "-1";
            this.selServiceAccountWrapperForHeader[prevPage].indicatorClass = "slds-carousel__indicator-action";
            this.selServiceAccountWrapperForHeader[prevPage].ariaSelected = "false";
        }
        this.selServiceAccountWrapperForHeader[nextPage].ariaHidden = "false";
        this.selServiceAccountWrapperForHeader[nextPage].tabIndex = "0";
        this.selServiceAccountWrapperForHeader[nextPage].indicatorClass = "slds-carousel__indicator-action slds-is-active";
        this.selServiceAccountWrapperForHeader[nextPage].ariaSelected = "true";

        let panelBlock = this.template.querySelector(`.ahfc-carousal .slds-carousel__panels`);
        const transform = nextPage * 100;
        if (panelBlock) {
            panelBlock.style.transform = `translateX(-${transform}%)`;
        }
        this.currentItem = nextPage;
        this.displayicons();

        this.selServiceAccountWrapper = JSON.stringify(this.selServiceAccountWrapperForHeader[this.currentItem]);
        this.selServiceAccountWrapperForMobile = this.selServiceAccountWrapperForHeader[this.currentItem];
        this.getAccountInfo(this.selServiceAccountWrapper);
        this.selServiceAccountWrapperForHeader[this.currentItem].serAccRec.AHFC_Total_days_past_due__c = typeof this.selServiceAccountWrapperForHeader[this.currentItem].serAccRec.AHFC_Total_days_past_due__c != "undefined" ? this.selServiceAccountWrapperForHeader[this.currentItem].serAccRec.AHFC_Total_days_past_due__c : 0;
        // TO show Aready made payment option only for due date between 2-30 past days
        if (
            this.selServiceAccountWrapperForHeader[this.currentItem].serAccRec
                .AHFC_Total_days_past_due__c > 2 &&
            this.selServiceAccountWrapperForHeader[this.currentItem].serAccRec
                .AHFC_Total_days_past_due__c < 30
        ) {
            this.showMadePayment = true;
        } else {
            this.showMadePayment = false;
        }
        // 4674 - EOT info section start
        if (this.selServiceAccountWrapperForHeader[this.currentItem].inDaysEOT <= 180
            && this.selServiceAccountWrapperForHeader[this.currentItem].inDaysEOT >= 0 && 
            this.selServiceAccountWrapperForHeader[this.currentItem].serAccRec.Account_Type__c === 'Lease') {
            this.isEOTDashboardInfo = true;
        } else {
            this.isEOTDashboardInfo = false;
        }
        // 4674 - EOT info section end


        if (this.showdashboard && !this.showBlankDashboard) {
            let lwcs = this.template
                .querySelectorAll("c-a-h-f-c_dashboard-payment-activity");
            for (let i = 0; i < lwcs.length; i++) {
                lwcs[i].handleValueChange(this.selServiceAccountWrapper);
            }

            lwcs = this.template
                .querySelectorAll("c-a-h-f-c_supportcorrespondence");
            for (let i = 0; i < lwcs.length; i++) {
                lwcs[i].handleValueChange(this.selServiceAccountWrapper);
            }

            lwcs = this.template
                .querySelectorAll("c-a-h-f-c_dashboard-statements");
            for (let i = 0; i < lwcs.length; i++) {
                lwcs[i].handleValueChange(this.selServiceAccountWrapper);
            }

            let cuBill = this.template
                .querySelectorAll("c-a-h-f-c_dashboard-current-bill");
            for (let i = 0; i < cuBill.length; i++) {
                cuBill[i].handleValueChange(this.selServiceAccountWrapper);
            }

            let testlwc = this.template
                .querySelectorAll("c-payment-progress-tile-dashboard-l-w-c");
            for (let i = 0; i < testlwc.length; i++) {
                testlwc[i].handleValueChange(this.selServiceAccountWrapper);
            }

            let marTile = this.template
                .querySelectorAll("c-a-h-f-c_dashboard-marketing-tile");
            for (let i = 0; i < marTile.length; i++) {
                marTile[i].handleValueChange(this.selServiceAccountWrapper);
            }


        }
       // window.print();
    }

    navigateToNextstep(){
        this.nextStep = true;
    }


    //Toggle Accordions in Mobile
    onMobileSectionsClick(event) {
        const open = "slds-accordion__section slds-is-open";
        const close = "slds-accordion__section";
        if (event.currentTarget.dataset.keyno) {
            this.mobileSections[event.target.dataset.keyno].isOpened = !this
                .mobileSections[event.target.dataset.keyno].isOpened;
            this.mobileSections[event.target.dataset.keyno].class =
                this.mobileSections[event.target.dataset.keyno].class === open
                    ? close
                    : open;
            this.mobileSections[event.target.dataset.keyno].contentClass = this
                .mobileSections[event.target.dataset.keyno].isOpened
                ? "slds-accordion__content mobile-accordion-content"
                : "slds-accordion__content";
        }
    }

    //Toggle Accordions in Mobile for locked state
    onMobileSectionsClickForLocked(event) {
        const open = "slds-accordion__section slds-is-open";
        const close = "slds-accordion__section";
        if (event.currentTarget.dataset.keyno) {
            this.lockedmobileSections[event.target.dataset.keyno].isOpened = !this
                .lockedmobileSections[event.target.dataset.keyno].isOpened;
            this.lockedmobileSections[event.target.dataset.keyno].class =
                this.lockedmobileSections[event.target.dataset.keyno].class === open
                    ? close
                    : open;
            this.lockedmobileSections[event.target.dataset.keyno].contentClass = this
                .lockedmobileSections[event.target.dataset.keyno].isOpened
                ? "slds-accordion__content mobile-accordion-content"
                : "slds-accordion__content";
        }
    }

    //Toggle View Details in Mobile View
    onMobileCarDetailsClick() {
        this.showCarDetailsMobile = !this.showCarDetailsMobile;
    }

    //On Clicking of Prev in Carousal
    onCarousalPrevDesktop() {
        this.setPageData(parseInt(this.currentItem), parseInt(this.currentItem) - 1);
    }

    //On Clicking of Next in Carousal
    onCarousalNextDesktop() {
        this.setPageData(parseInt(this.currentItem), parseInt(this.currentItem) + 1);
    }

    // Setup whether the Carousal Next/Previous Buttons be clickable
    displayicons() {
        this.isCarousalFirstItem = this.currentItem == 0 ? true : false;
        this.carousalPrevButtonClass = this.isCarousalFirstItem
            ? "slds-button carousal-button-desktop carousal-button-disabled"
            : "slds-button carousal-button-desktop";
        this.isCarousalLastItem =
            parseInt(this.currentItem) + 1 == this.lstofServiceAccountwrapper.length
                ? true
                : false;
        this.carousalNextButtonClass = this.isCarousalLastItem
            ? "slds-button carousal-button-desktop carousal-button-disabled"
            : "slds-button carousal-button-desktop";
    }

    // Setup the page on Carousal Bottom Indicators Click
    onCarousalIndicatorClick(event) {
        if (event.target.dataset.indicator && (event.target.dataset.indicator != this.currentItem)) {
            this.setPageData(this.currentItem, event.target.dataset.indicator);
        }
    }

    //Navigating to Account Profile
    navigatetoAccountprofile() {
        this[NavigationMixin.Navigate]({
            type: "comm__namedPage",
            attributes: {
                pageName: 'finance-account-profile'
            },
            state: {
                sacRecordId: JSON.parse(this.selServiceAccountWrapper).serAccRec.Id
            }
        });
    }



    //Navigating to Add Finance Account - Added by Akash Solanki as Part of 6030
    navigatetoaddFincanceAccount() {
        this[NavigationMixin.Navigate]({
            type: "comm__namedPage",
            attributes: {
                pageName: 'add-a-finance-account'

            },
        });
    }

    //navigate to made-payment page
    navigateToMadePayment() {
        this[NavigationMixin.Navigate]({
            type: "comm__namedPage",
            attributes: {
                pageName: 'already-made-a-payment'
            },
            state: {
                sacRecordId: JSON.parse(this.selServiceAccountWrapper).serAccRec.Id
            }
        });
    }

    //to open nick name model.
    opennicknamemodal() {
        this.isEditNickname = true;
    }

    //To close nickname pop up.
    closenicknamepopup(event) {
        this.currentFinAccId = event.detail;
        refreshApex(this.wiredAccountList);
        this.isEditNickname = false;

    }
}