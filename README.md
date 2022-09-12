# WhatsUpp
Full-stack realtime chat application using MERN Stack

# Features
1. Login / Logout / Authentication
2. Real-time Communication
3. Infinity Scroll

# Add-on Features (for further consideration)
- Active Chats page
- Create new Chat feature
- ChatBox Tool Bar to format inputs (add bullet points, write in .md format, etc)
- Group Chat
- Emoji & Stickers
- Group chat
- Mobile responsiveness
- Message read/unread
- Message reacts/likes
- Reply to single message
- Forward messages
- Organize chats into folders
- Media sharing (Video, Audio)
- Search through messages
- Chat back-ups (through DB dump or file export)
- Dark mode / dynamic themes

## How to start MongoDB
`sudo mongod --dbpath ~/data/db` <br>
`mongo`

## How to start MongoDB (as a single node on local)
`sudo mongod --port 27017 --dbpath ~/data/db --replSet rs0 --bind_ip localhost`
Open another terminal, `mongo`, then `rs.initiate()`, then if see `rs0:PRIMARY>`, means its working
Now run `npm run dev`