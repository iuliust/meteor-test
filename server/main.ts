import {Meteor} from 'meteor/meteor';

import {loadParties} from './imports/fixtures/parties';

Meteor.startup(() => {
	// load initial Parties
	loadParties();
});
