
import {Component, OnInit} from '@angular/core';
import {Catalogue} from "../shared/catalogue";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CatalogueFactory} from "../shared/catalogue-factory";
import {EvernoteService} from "../shared/evernote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogueFormErrorMessages} from "./catalogue-form-error-messages";




@Component({
  selector: 'app-catalogue-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './catalogue-form.component.html',
  styles: ``
})
export class CatalogueFormComponent implements OnInit{
    catalogueForm: FormGroup;
    //leeres Buch anlegen
    catalogue = CatalogueFactory.empty();
    errors: {[key: string]: string} = {};
    isUpdatingCatalogue = false;

    constructor(
      private fb: FormBuilder,
      private ev: EvernoteService,
      private route: ActivatedRoute,
      private router: Router) {

      this.catalogueForm = this.fb.group({});
    }


    ngOnInit(){
      const id = this.route.snapshot.params["id"];
      if (id){
        this.isUpdatingCatalogue = true;
        this.ev.getSingle(id).subscribe(catalogue => {
          this.catalogue = catalogue;
          this.initCatalogue();
        });
      }
        this.initCatalogue();
    }

    initCatalogue(){
      this.catalogueForm = this.fb.group({
        id: this.catalogue.id,
        name: [this.catalogue.name, Validators.required]
      });
      this.catalogueForm.statusChanges.subscribe(()=>this.updateErrorMessages());
    }

  submitForm() {
    const catalogue: Catalogue = CatalogueFactory.fromObject(this.catalogueForm.value);
    console.log(catalogue);
    if(this.isUpdatingCatalogue){
      this.ev.update(catalogue).subscribe(res => {
        this.router.navigate(['../../catalogues', catalogue.id], {relativeTo:this.route});
      });
    }else {
      //Hack - Hardcodiert wird hier jetzt mal der User 1 definiert
      catalogue.user_id = 1;
      this.ev.create(catalogue).subscribe(res => {
        this.catalogue = CatalogueFactory.empty();
        this.catalogueForm.reset(CatalogueFactory.empty());
        this.router.navigate(['../catalogues'], {relativeTo: this.route});
      });
    }
  }

  private updateErrorMessages() {
    this.errors = {};
    for (const message of CatalogueFormErrorMessages){
      const control = this.catalogueForm.get(message.forControl)
      if (control && control.dirty && control.invalid &&
      control.errors && control.errors[message.forValidator] &&
      !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }
}

