var botui = new BotUI('my-botui-app');
  
        botui.message.bot('Hello I am travel bot, would you like to talk to me?')
            .then(function () {
                return botui.action.button({
                delay: 1000,
                action: [{
                    text: 'Yep',
                    value: 'yes'
                }, {
                    text: 'Nope!',
                    value: 'no'
                }]
                })
            }).then(function (res) {
                if(res.value == 'yes') {
                    showReminderInput();
                } else {
                    botui.message.bot('Okay.');
                }
                });

        var showReminderInput = function () {
            botui.action.text({
                delay: 1000,
                action: {
                placeholder: 'Enter here!'
                }
            })
            .then(function(res){
                    var url = `https://api.dialogflow.com/v1/query?v=2015091&lang=en&query=${res.value}&sessionId=12345`
                    fetch(url,{
                        method: 'GET', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer f6eda1c99fbb4d788f4b3dc8547230cc',
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
                            content: text
                            })
                    })
                })

                
            .then(showReminderInput);
        }