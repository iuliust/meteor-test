import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Mongo } from 'meteor/mongo';

import { Parties }   from '../both/collections/parties.collection';
import { PartiesFormComponent } from "./imports/parties/parties-form.component";

import template from './app.component.html';

@Component({
  selector: 'app',
  template,
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
}
