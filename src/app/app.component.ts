import { Component } from '@angular/core';

import { HttpClient , HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mainString: string = '';
  substring: string = '';
  selectedText: string = '';
  startPosition: number = 0;
  endPosition: number = 0;

  inputText: string = '';
  displayedText: string = '';
  labelw: string = '';
  description: string = '';
  displayed: boolean = true;

 

  formData: any = {
    documenttex: '',
    annotation: []
  };

  constructor(private http: HttpClient) {}

  displayInputs() {
    this.displayed = true;
  }

  

  showSelectedText() {
    const selection = window.getSelection();
    this.selectedText = selection?.toString() || '';
    this.startPosition = selection?.getRangeAt(0).startOffset || 0;
    this.endPosition = selection?.getRangeAt(0).endOffset || 0;
  }
  displayText() {
    this.displayedText = this.inputText;
  }
  displayDescription() {
    
  }

  

  addItem() {
    // Create a new item object
    const newItem = {
      start: this.startPosition,
      end: this.endPosition,
      label: this.labelw,
      textselected: this.selectedText
    };

    // Add the item to the items array
    this.formData.annotation.push(newItem);
    this.formData.documenttex = this.description;

    // Clear the input fields
       this.startPosition = 0,
       this.endPosition = 0,
       this.labelw = '',
       this.selectedText = ''
    // Print the JSON model to the console
    console.log(this.formData);    
      // Reset the form
    this.formData = {
      documenttext: '',
     annotation : []
    };

    
  }

  sendDataToDjango() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken')  || ''// Include the CSRF token from the cookie
    });
  
  
    this.http.post('http://127.0.0.1:8000/data', this.formData,{ headers }).subscribe(
      (response: any) => {
        // Parse the response as JSON
        const jsonData = JSON.parse(response.json());
        // Handle the parsed JSON data
      },
      error => console.log('Error occurred while parsing JSON response:', error)
  );
    
      // Reset the form
    this.formData = {
      documenttext: '',
     annotation : []
    };
  }
  

  
  // Helper method to get CSRF cookie
  getCookie(name: string) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }


  title = 'ubiaiangular';

}
