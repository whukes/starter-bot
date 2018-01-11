//*****************************************************
// Requires
//*****************************************************
var Botkit = require('botkit');

//*****************************************************
// Spark adapater setup
//*****************************************************
var controller = Botkit.sparkbot({
    log: true,
    public_address: process.env.PUBLIC_URL,
    ciscospark_access_token: process.env.SPARK_TOKEN,
    secret: process.env.SECRET,
    limit_to_org: process.env.ORGID,
    webhook_name: process.env.WEBHOOK_NAME 
});

var bot = controller.spawn({
});

controller.setupWebserver(process.env.SPARK_PORT, function(err, webserver) {
    controller.createWebhookEndpoints(controller.webserver, bot, function() {
        console.log("spark: webhooks set up!");
    });
});

//*****************************************************
// Chat handlers
//*****************************************************

controller.hears(['(.*)'], 'direct_mention,direct_message', function (bot, message) {
    var email = message.user;
    bot.reply(message, "Hello, <@personEmail:" + email + ">!  ");
});