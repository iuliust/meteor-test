import { Component, OnInit } from '@angular/core';
import { Mongo } from 'meteor/mongo';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MeteorComponent } from 'angular2-meteor';
import { LoginButtons } from 'angular2-meteor-accounts-ui';

import { Parties }   from '../../../both/collections/parties.collection';
import { PartiesFormComponent } from './parties-form.component';
import { Party } from '../../../both/interfaces/party.interface';

import template from './parties-list.component.html';

@Component({
  selector: 'parties-list',
  template,
  directives: [PartiesFormComponent, ROUTER_DIRECTIVES, LoginButtons]
})
export class PartiesListComponent extends MeteorComponent implements OnInit {
	parties: Mongo.Cursor<Party>;

	constructor() {
		super();
	}

	ngOnInit() {
		this.parties = Parties.find();
		this.subscribe('parties', () => {
			this.parties = Parties.find();
		}, true);
	}

	removeParty(party : Party) {
		Parties.remove(party._id);
	}

	search(location: string) {
		this.parties = Parties.find(location ? { location } : {});
	}
}
