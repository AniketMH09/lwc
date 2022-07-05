import { LightningElement, api, wire, track } from 'lwc';
import getAllFilesByRecordId from '@salesforce/apex/AHFC_ListFileAndPreviewController.getAllFilesByRecordId'
import { NavigationMixin } from 'lightning/navigation'
import { refreshApex } from '@salesforce/apex';

export default class Listfilepoc extends NavigationMixin(LightningElement) {

    get acceptedFormats() {
        return ['.pdf', '.png'];
    }

    handleUploadFinished(event) {
        console.log('Hii');
        refreshApex(this.gotData);
        // Get the list of uploaded files
        //const uploadedFiles = event.detail.files;
        //alert('No. of files uploaded : ' + uploadedFiles.length);
    }
    @api recordId;
    @track recordCount;
    @track baseUrl;
    @track data;
    @track records;

    @track isRecordsAvaialable = false;
    filesList = []

    @track gotData;

    @wire(getAllFilesByRecordId, { recordId: '$recordId' })
    wiredResult(result) {
        this.gotData = result;
        if (result.data) {
            this.filesList = result.data;
            console.log('AHFC_listFiles_and_Preview data :' + JSON.stringify(result.data));
            this.recordCount = this.filesList.length;
            if (this.recordCount > 0) {
                this.baseUrl = this.filesList[0].baseUrl;
                this.isRecordsAvaialable = true;
            }
        }
        if (result.error) {
            console.log(error)
        }
    }

    previewHandler_old(event) {
        let filePath = event.target.dataset.value;
        console.log('previewHandler, value: ', filePath);
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: filePath//"https://ahfc--webproj1.my.salesforce.com/sfc/servlet.shepherd/document/download/0690U000001xdkkQAA?operationContext=S1" //"https://poc.acura.americanhondafinance.com/sfc/servlet.shepherd/version/renditionDownload?rendition=PDF&versionId="+event.target.dataset.id
            }
        }, false);
    }


    previewHandler(event) {
        let filePath = this.baseUrl + "/sfc/servlet.shepherd/document/download/" + event.target.dataset.id + "?operationContext=S1"

        console.log('previewHandler, value: ', filePath);
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: filePath//"https://ahfc--webproj1.my.salesforce.com/sfc/servlet.shepherd/document/download/0690U000001xdkkQAA?operationContext=S1" //"https://poc.acura.americanhondafinance.com/sfc/servlet.shepherd/version/renditionDownload?rendition=PDF&versionId="+event.target.dataset.id
            }
        }, false);
    }

}