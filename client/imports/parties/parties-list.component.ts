import { Component, OnInit } from '@angular/core';
import { Mongo } from 'meteor/mongo';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Parties }   from '../../../both/collections/parties.collection';
import { PartiesFormComponent } from './parties-form.component';
import { Party } from '../../../both/interfaces/party.interface';


import template from './parties-list.component.html';

@Component({
  selector: 'parties-list',
  template,
  directives: [PartiesFormComponent, ROUTER_DIRECTIVES]
})
export class PartiesListComponent implements OnInit {
	parties: Mongo.Cursor<Party>;

	ngOnInit() {
		this.parties = Parties.find();
	}

	removeParty(party : Party) {
		Parties.remove(party._id);
	}
}
