var developers = require('./developers').list;

var teamArray = [
	{
		name: 'MMZ Mediathek Team', subtitle: 'Bestes Team!' , owner: developers["tobias"]
	},
	{
		name: 'Wireframe GUI', subtitle: 'GUI für alle!' , owner: developers["artur"]
	}
];

exports.list = teamArray;