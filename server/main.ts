import {Meteor} from 'meteor/meteor';

import {loadParties} from './imports/fixtures/parties';
import './imports/publications/parties';

Meteor.startup(() => {
	// load initial Parties
	loadParties();
});
