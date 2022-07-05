import { LightningElement } from 'lwc';

export default class SalesforceTrivia extends LightningElement {



    initialPage = true;

    startGame() {
        console.log('button clicked');
        this.initialPage = false;
    }
}