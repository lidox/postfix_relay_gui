var portsToDisplay = [
	{
		id : "1",
		port : "443"
	},
	{
		id : "2",
		port : "993"
	}
];

var errorsController = {
	getPorts: function(){
		return portsToDisplay
	},
	addPort: function(id, port){
       // npm install body-parser --save
		var portObject = 
		{
			id : id,
			port : port
		};
	
		portsToDisplay.push(portObject);
	}
}

module.exports = errorsController;