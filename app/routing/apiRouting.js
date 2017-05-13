var friend = require('../data/friends.js');
var fs= require('fs');

module.exports = function(app) {


	// this is a route for getting all the friends aavailable
	app.get('/api/friends', function(req, res) {
			res.json(friend);
		});
		// this is the route to post the user inputs from the surveys and find the most compatible friend
	app.post('/api/friends', function(req, res) {
		var friendsArr = require('../data/friends');
		var currentUser = req.body;
		var myF = findCompatableFriend(currentUser, friendsArr);
		console.log(myF.difference);
		friendsArr.push(currentUser);
		res.send({
			name: myF.index.name.toUpperCase(),
			img: myF.index.link
			});
	})

	/* this is the function to find friend who is most compatible to the current user.
		 @ param {
			self: is the current user in app.get
			friends: is the userArr in app.get above
		 } */

	function findCompatableFriend(self, friends) {
		//a blank object to later set the properties of the index and the difference between scores.
		var friend = {};
		if (friends && friends.length) {


		for (var i = 0; i < friends.length; i++) {
			console.log(friends[i]);
			var difference = 0;
			for (var j in friends[i].scores) {
				difference += Math.abs(Number(self.scores[j]) - Number(friends[i].scores[j]));
			}
			if (friend.difference === undefined) {
				friend.difference = difference
				friend.index = friends[i];
			} else {

				if (difference < friend.difference) {
					friend.difference = difference;
					friend.index = friends[i];
				}
			}

		}
	}
	return friend;
	}
};
