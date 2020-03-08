import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateNotePageRoutingModule } from './update-note-routing.module';

import { UpdateNotePage } from './update-note.page';
import {MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateNotePageRoutingModule,
    MatButtonModule
  ],
  declarations: [UpdateNotePage]
})
export class UpdateNotePageModule {}
