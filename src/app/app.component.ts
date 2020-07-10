import { Component,OnInit,ElementRef,AfterViewInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	@ViewChild('scroll') private myScrollContainer: ElementRef;
  title = 'bot';
  langDef = 'en';
  langChange = 'en';
  container
  // inputMsg = '';
  inputMsgAfter = null;
  msgList = [];
  mainMsg=[];
  i=0;
  ngOnInit(){
  	 this.mainMsg[this.i] = {
  	"from":"bot",
  	"type":"text",
  	"msg":"Welcome",
  	"next":"name"
  }

  this.zeroInput();
  this.msgList.push(this.mainMsg[this.i]);
  
  }
  ngAfterViewInit() {         
   this.scrollToBottom();     
  } 

msgInput = new FormGroup({
    inputMsg: new FormControl('', Validators.required),
    
  });
scrollToBottom(): void {
    try {

    	this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
	      // this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
	      // console.log(this.myScrollContainer.nativeElement.scrollHeight+250)
    } catch(err) { 
		console.log(err);
    }
  }
zeroInput(){
    this.msgInput.reset();
        
}
sendMsg(){
	this.scrollToBottom();
	this.i = this.i+1;
	this.mainMsg[this.i]={}
	this.mainMsg[this.i]['from'] = 'usr';
	this.mainMsg[this.i]['type'] = 'text';
	this.mainMsg[this.i]['msg'] = this.msgInput.value.inputMsg;
	
	this.mainMsg[this.i]['next'] = this.mainMsg[this.i-1].next;
	this.msgList.push(this.mainMsg[this.i]);
	this.zeroInput();
	this.getNext(this.mainMsg[this.i]['next'],this.i);
	console.log(this.mainMsg);
}
getNext(next,j){
	this.mainMsg[j] = {}
	this.mainMsg[j].from = "bot";
	

	switch (next) {
		case "name":
			this.mainMsg[j].type = 'text';
			this.mainMsg[j].msg = 'Please Enter your Name';
			this.mainMsg[j].next = 'phone';
			
			break
		case "phone":
			this.mainMsg[j].type = 'text';
			this.mainMsg[j].msg = 'Enter your Mobile Number';
			this.mainMsg[j].next = 'email';
			
			break
		case "email":
			this.mainMsg[j].type = 'text';
			this.mainMsg[j].msg = 'Enter your Email address';
			this.mainMsg[j].next = 'end';
			
			break;
		default:
			this.mainMsg[j].type = 'text';
			this.mainMsg[j].msg = 'Thank you for your response, Our team will contact you shortly';
			this.mainMsg[j].next = '';
			
			break;
	}
	this.msgList.push(this.mainMsg[j])
	this.zeroInput();

}
changeLang(dst){
	this.langChange = dst;

}

}
