import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { NotifierService } from 'angular-notifier';
import { HomePageService } from '../HomePage-Services/home-page.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
})
export class AdminViewComponent implements OnInit {
  viewProd: boolean = true;
  selectedFile!: ImageSnippet;
  demofile: File | any = null;

  public tools: ToolbarModule = {
    object: { showToolbar: true, enableFloating: false },
    items: [
      'Bold',
      'Italic',
      'Underline',
      'StrikeThrough',
      'FontName',
      'FontSize',
      'FontColor',
      'BackgroundColor',
      'LowerCase',
      'UpperCase',
      '|',
      'Formats',
      'Alignments',
      'OrderedList',
      'UnorderedList',
      'Outdent',
      'Indent',
      '|',
      'CreateLink',
      'Image',
      '|',
      'ClearFormat',
      'Print',
      'SourceCode',
      'FullScreen',
      '|',
      'Undo',
      'Redo',
    ],
  };

  public tools1: ToolbarModule = {
    object: { showToolbar: true, enableFloating: false },
    items: [
      'Bold',
      'Italic',
      'Underline',
      'StrikeThrough',
      'FontName',
      'FontSize',
      'FontColor',
      'BackgroundColor',
      'LowerCase',
      'UpperCase',
      '|',
      'Formats',
      'Alignments',
      'OrderedList',
      'UnorderedList',
      'Outdent',
      'Indent',
      '|',
      'CreateLink',
      'Image',
      '|',
      'ClearFormat',
      'Print',
      'SourceCode',
      'FullScreen',
      '|',
      'Undo',
      'Redo',
    ],
  };
  notifier: NotifierService;

  Logout() {
    console.log('reached');
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

  AddProductClicked() {
    this.viewProd = false;
  }

  /*  DeleteTheDay*/

  constructor(
    notifier: NotifierService,
    private service: HomePageService,
    private http: HttpClient,
    private router: Router,
    private active_route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.notifier = notifier;
    console.log(sessionStorage.getItem('emailID'));
    var a = sessionStorage.getItem('emailID');

    if (a == null) {
      console.log(a);
      this.router.navigate(['/studentLogin']);
    }
    // this.userEmailID = this.active_route.snapshot.params['emailID']
    // console.log(this.userEmailID);
  }
  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    console.log('success');
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
    console.log('fail');
  }

  ngOnInit(): void {}

  AddProduct1(form: NgForm) {
    let product = {
      "Name": form.value.ProductName,
      "Price": form.value.ProductCost,
      "Quantity": form.value.quantity,
      "ImageFile": this.demofile
    }
    console.log(form.value.ProductName);
    console.log(form.value.ProductCost);
    console.log(form.value.quantity);
    console.log(this.demofile);
    this.processFile(product);
  }

  onFileChange(event: any) {
    console.log(event.target.files[0])
    this.demofile = event.target.files[0];
  }

  processFile(product: any) {
    const reader = new FileReader();
    const file = product.ImageFile;

    console.log(file)

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log(product)
      this.service.uploadImage(this.selectedFile.file, product).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        }
      );
    });

    reader.readAsDataURL(file);
  }
}
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) {}
}
