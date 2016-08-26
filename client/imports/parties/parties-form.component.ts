import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Meteor } from 'meteor/meteor';
import { MeteorComponent } from 'angular2-meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { Parties } from '../../../both/collections/parties.collection';
import template from './parties-form.component.html';

@Component({
	selector: 'parties-form',
	template,
	directives: [REACTIVE_FORM_DIRECTIVES]
})
@InjectUser('user')
export class PartiesFormComponent extends MeteorComponent implements OnInit{
	addForm: FormGroup;
	user: Meteor.User;

	constructor(private formBuilder : FormBuilder) {
		super();
	}

	ngOnInit() {
		this.addForm = this.formBuilder.group({
			name: ['', Validators.required],
			description: [],
			location: ['', Validators.required],
			public: [false]
		});
	}

	resetForm() {
		this.addForm.controls['name']['updateValue']('');
	    this.addForm.controls['description']['updateValue']('');
	    this.addForm.controls['location']['updateValue']('');
	    this.addForm.controls['public']['updateValue'](false);
	}

	addParty() {
		if (this.addForm.valid) {
			if (Meteor.userId()) {
				Parties.insert(Object.assign({}, this.addForm.value, {owner: Meteor.userId()}));
				this.resetForm();
				// XXX will be replaced by this.addForm.reset() in RC5+
			} else {
				alert('Please log in to add a party.')
			}
		}
	}
}
