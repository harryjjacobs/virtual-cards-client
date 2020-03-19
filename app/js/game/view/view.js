function BaseView() {
	let cardStates = {

	};

	const addDeckToTable = deck => {
		// TODO: 
	};

	const moveCard = (from, to) => {

	};
};

BaseView.prototype.initialise = function(callback) {
	Stage(stage => {
		// Create viewport
		stage.viewbox(50, 100).pin('handle', -0.5);
		// Create table
		var table = Stage.create();
		table.appendTo(stage);
		Stage.image('table').pin('handle', 0.5).appendTo(table);
		this.stage = stage;
		if (typeof callback === "function") {
			callback();
		}
	});
};

export const createBaseView = () => Object.create(BaseView.prototype);