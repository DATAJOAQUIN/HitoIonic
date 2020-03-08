import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {Note} from '../modal/Note';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {
  clickedImage: string;
  note: Note = {
    title: '',
    content: '',
    createdAt: new Date().getTime(),
    image:''
  };

  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
      private camera: Camera,
      private activatedRoute: ActivatedRoute,
      private fbService: FirebaseService,
      private toastCtrl: ToastController,
      private router: Router
  ) { }

  ngOnInit() {
  }

  addNote() {
    this.fbService.addNote(this.note).then(() => {
      this.router.navigateByUrl('/');
    }, err => {
    });
  }

  captureImage() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
      this.note.image=this.clickedImage
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

}
