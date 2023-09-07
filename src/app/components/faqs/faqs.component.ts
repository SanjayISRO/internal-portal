import { Component, OnInit } from '@angular/core';
import * as fs  from 'file-saver';

import { HttpService } from '../../common/services/http.service'

interface Faqs {
  question: string;
  answer: string;
  type: string;
  listOfDatas: Array<DataObject>
}

interface DataObject {
  criteria: string;
  subCatergories: Array<string>
}
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  listOfFaqs: Faqs[] = [];
  successOrErrorMessage: string = null;
  canLoadContent: boolean = false;
  selectedEventName: string = null;
  faqLables: Array<string> = [];
  faqData: Array<object> = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getFaqs();
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  getFaqs(): void {
    this.httpService.get('faqs').subscribe(response => {
      this.faqData = response.data;
      this.faqLables = Object.keys(response.data);
      this.selectedEventName = this.faqLables[0];
      setTimeout(() => {
        this.canLoadContent = true;
      }, 1000)
    }, error => {
      this.successOrErrorMessage = error;
      this.closeSuccessOrErrorMsg();
    });
  }

  closeSuccessOrErrorMsg(): void {
    setTimeout(() => {
      this.canLoadContent = true;
      this.successOrErrorMessage = '';
    }, 3000);
  }

  downloadForm() {

    let headers = new Headers({
  
  
      "responseType": "blob", // Tried with and without, "text", "json", no difference
  
  })

    this.httpService
    .download("downloadForm", { headers })
    .subscribe(res => {
        const blob = new Blob([res["_body"]] , { type: "application/octet-stream;"} );  // Error : body is not a blob or an array buffer
        // const blob = new Blob([res["_body"]]); // Same result
        // const blob = new Blob([res.blob()]); // Error : body is not a blob or an array buffer

        fs.saveAs(blob, "Invention Disclosure Form.doc"); // Saves a big corrupted file

        // window.URL.createObjectURL(new Blob(blob, {type: 'blob'})); Saves a 94 byte corrupted file. Tried {type: 'gzip'}, same thing
    }, err => {
      const blob = new Blob([err.error["text"]] , { type: "application/octet-stream;"} );  // Error : body is not a blob or an array buffer
        // const blob = new Blob([res["_body"]]); // Same result
        // const blob = new Blob([res.blob()]); // Error : body is not a blob or an array buffer

        fs.saveAs(blob, "Invention Disclosure Form.doc"); // Saves a big corrupted file
    })
  }

}
