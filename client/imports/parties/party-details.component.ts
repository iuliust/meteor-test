import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES, CanActivate } from '@angular/router';

import { MeteorComponent } from 'angular2-meteor';
import { Tracker } from 'meteor/tracker';

import { Parties } from '../../../both/collections/parties.collection';
import { Party } from '../../../both/interfaces/party.interface';

import template from './party-details.component.html';

@Component({
  selector: 'party-details',
  template,
  directives: [ROUTER_DIRECTIVES]
})
export class PartyDetailsComponent extends MeteorComponent implements OnInit, CanActivate {
	private partyId: string;
	private party: Party;

	constructor(private activatedRoute : ActivatedRoute, private ngZone: NgZone) {
		super();
	}

	ngOnInit() {
		this.activatedRoute.params
			.map(params => params['partyId'])
			.subscribe(partyId => {
				this.partyId = partyId
				this.party = Parties.findOne(this.partyId);

				this.subscribe('party', this.partyId, () => {
		        	this.party = Parties.findOne(this.partyId);
		        }, true);


				// Tracker.autorun(() => {
				// 	this.ngZone.run(() => {
			    //         this.party = Parties.findOne(this.partyId);
			    //     });
		        // });
			});
	}

	canActivate() {
		const party = Parties.findOne(this.partyId);
    	return (party && party.owner == Meteor.userId());
	}

	saveParty() {
		Parties.update(this.party._id, {
			$set: {
				name: this.party.name,
				description: this.party.description,
				location: this.party.location
			}
		});
	}
}
