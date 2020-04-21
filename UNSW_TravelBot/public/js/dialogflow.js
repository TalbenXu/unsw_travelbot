var botui = new BotUI('my-botui-app');

botui.message
	.bot("Hello, welcome to Fake Travel Agency!I'm TravelBot, let's chat~ ")
	.then(function () {
		return botui.action.button({
			delay: 1000,
			action: [
				{
					text: 'Yep',
					value: 'yes',
				},
				{
					text: 'Nope!',
					value: 'no',
				},
			],
		});
	})
	.then(function (res) {
		if (res.value == 'yes') {
			showReminderInput();
		} else {
			botui.message.bot('Okay.');
		}
	});

var showReminderInput1 = function () {
	botui.action
		.text({
			delay: 1000,
			action: {
				placeholder: 'Hi! ' + sessionStorage.getItem('user'),
			},
		})
		.then(function (res) {
			let landmark = sessionStorage.getItem('landmark');
			let user = sessionStorage.getItem('user');
			if (landmark != undefined) {
				res.value = res.value + '  ' + landmark;
			}
			if (user != undefined) {
				res.value = res.value + '  ' + user;
			}
			console.log(res.value);
			var url = `https://api.dialogflow.com/v1/query?v=2015091&lang=en&query=${res.value}&sessionId=12345`;
			fetch(url, {
				method: 'GET', // *GET, POST, PUT, DELETE, etc.
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer 855c80661da64bf8be4968dd994d0e8e',
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					var text = data.result.fulfillment.speech;

					console.log(text);
					botui.message.bot({
						delay: 500,
						content: text,
					});
				});
		})
		.then(() => {
			if (sessionStorage.getItem('user') === null) {
				showReminderInput();
			} else {
				showReminderInput1();
			}
		});
};

var showReminderInput = function () {
	botui.action
		.text({
			delay: 1000,
			action: {
				placeholder: 'Enter here!',
			},
		})
		.then(function (res) {
			let landmark = sessionStorage.getItem('landmark');
			let user = sessionStorage.getItem('user');
			// if (landmark != undefined) {
			// 	res.value = res.value + '  ' + landmark;
			// }
			// if (user != undefined) {
			// 	res.value = res.value + '  ' + user;
			// }
			console.log(res.value);
			var url = `https://api.dialogflow.com/v1/query?v=2015091&lang=en&query=${res.value}&sessionId=12345`;
			fetch(url, {
				method: 'GET', // *GET, POST, PUT, DELETE, etc.
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer f6eda1c99fbb4d788f4b3dc8547230cc',
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					var text = data.result.fulfillment.speech;

					console.log(text);
					botui.message.bot({
						delay: 500,
						content: text,
					});
				});
		})
		.then(() => {
			if (sessionStorage.getItem('user') === null) {
				showReminderInput();
			} else {
				showReminderInput1();
			}
		});
};
