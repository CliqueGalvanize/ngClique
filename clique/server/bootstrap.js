import Moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Chats, Messages, Users, Groups } from '../lib/collections';

Meteor.startup(function() {
	if (Users.find().count() !== 0) return;

	const users = [
			{
				"userId": 10153806388686408,
			"name": "Ben Goebel",
			"picture": "https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/12744710_10154010167591995_8103835184132979821_n.jpg?oh=d226b695be065a4aebb5a832736621a5&oe=5849FCC6",
			"filters": [],
			"groups": [
				{"group_id": 1, "last_login": 1473268760000, "last_logout": 1473268767834 }
			]},
			{
				"userId": 10104919159486808,
			"name": "Tim Pender",
			"picture": "https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/14067695_10154493797131757_8671186380823512233_n.jpg?oh=dbbb33d2b25271c8aaeb9441e1785a95&oe=584A07F3",
			"filters": [],
			"groups": [
				{"group_id": 1, "last_login": 1473268660000, "last_logout": 1473268767800 },
				{"group_id": 2, "last_login": 1473263512000, "last_logout": 1473263837834 }
			]},
			{
				"userId": 10208538430513056,
			"name": "Mike Tobin",
			"picture": "https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/1043978_10200724760056359_768476874_n.jpg?oh=64501cc61a45d6aada9b6812066214e0&oe=583A634D",
			"filters": [],
			"groups": [
			]},
			{
				"userId": 10104868008374027,
			"name": "Jim Watkins",
			"picture": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAATLAAAAJDU1ZmQ3YmNiLTRmOTYtNGJlNy1hMTI2LTIwZTEyMjc3OGQxNg.jpg",
			"filters": [],
			"groups": [
				{"group_id": 1, "last_login": 1473263562000, "last_logout": 1473264887834 },
				{"group_id": 2, "last_login": 1473263552000, "last_logout": 1473264837834 }
			]}
		];

	users.forEach((user) => {
		Users.insert(user);
	});

	const groups = [
		{
			"group_id": 1,
			"member_id": [10153806388686408, 10104919159486808, 10104868008374027 ],
			"messages": [
				{
					"user_id": 10153806388686408,
					"time_sent": 1473268767800,
					"text": "You suck"
				},
				{
					"user_id": 10104919159486808,
					"time_sent": 1473268769800,
					"text": "fuck you"
				},
				{
					"user_id": 10104868008374027 ,
					"time_sent": 1473268799800,
					"text": "Suck ma ween"
				}
			]
		},
		{
			"group_id": 2,
			"member_id": [10104919159486808, 10104868008374027 ],
			"messages": [
				{
					"user_id": 10104919159486808,
					"time_sent": 1473268769800,
					"text": "What we doing tonight?"
				},
				{
					"user_id": 10104868008374027,
					"time_sent": 1473268799800,
					"text": "Yo mama"
				},
				{
					"user_id": 10104919159486808,
					"time_sent": 1473268799800,
					"text": "nice"
				}
			]
		}];

	groups.forEach((group)=>{
		Groups.insert(group)
	});

  if (Chats.find().count() !== 0) return;

	// TODO: REMOVE MESSAGES, Chats from pervious DB integration
  Messages.remove({});

  const messages = [
    {
      text: 'You on your way?',
      timestamp: Moment().subtract(1, 'hours').toDate()
    },
    {
      text: 'Hey, it\'s me',
      timestamp: Moment().subtract(2, 'hours').toDate()
    },
    {
      text: 'I should buy a boat',
      timestamp: Moment().subtract(1, 'days').toDate()
    },
    {
      text: 'Look at my mukluks!',
      timestamp: Moment().subtract(4, 'days').toDate()
    },
    {
      text: 'This is wicked good ice cream.',
      timestamp: Moment().subtract(2, 'weeks').toDate()
    }
  ];

  messages.forEach((m) => {
    Messages.insert(m);
  });

  const chats = [
    {
      name: 'Ethan Gonzalez',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
    },
    {
      name: 'Bryan Wallace',
      picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg'
    },
    {
      name: 'Avery Stewart',
      picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg'
    },
    {
      name: 'Katie Peterson',
      picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg'
    },
    {
      name: 'Ray Edwards',
      picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg'
    }
  ];

  chats.forEach((chat) => {
    const message = Messages.findOne({ chatId: { $exists: false } });
    chat.lastMessage = message;
    const chatId = Chats.insert(chat);
    Messages.update(message._id, { $set: { chatId } });
  });

});
