import { LightningElement, track } from 'lwc';

export default class Newlwc extends LightningElement {

    @track initialPage = true;
    @track secondpage = false;
    @track shoquestions = false;

    @track isViewOption = false;

    @track questionData = {
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
    }

    startGame() {
        console.log('button clicked');
        this.initialPage = false;
        this.secondpage = true;
        this.shoquestions = false;
    }

    onshowquestion(){
        this.initialPage = false;
        this.secondpage = false;
        this.shoquestions = true;
    }

    onViewOption(){
        this.isViewOption = true;
    }

    onNextQuestion(){
        this.isViewOption = false;
    }

    
}