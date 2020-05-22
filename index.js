require('dotenv').config();
const Bot = require('./api-twitter');

function BotInit() {
	var query = {
		q: process.env.HASHTAG_TT,
		result_type: process.env.HASHTAG_TYPE
	}

	Bot.get(process.env.API_SEARCH_TWEETS, query, BotGotLatestTweet);

	function BotGotLatestTweet(error, data) {
		if (error) {
			console.log('Error in search: ' + error);
		} else {
			var id = {
				id: data.statuses[0].id_str
			}

			Bot.post(`${process.env.API_RETWEET}/:id`, id, BotRetweeted);
			
			function BotRetweeted(error) {
				if (error) {
					console.log('Error in retweet: ' + error);
				} else {
					console.log('Success: ' + id.id);
				}
			}
		}
	}
}

setInterval(BotInit, 30*60*1000);

BotInit();