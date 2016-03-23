---
layout: post
title:  "How to Run Sinatra and Rails Servers on Cloud9"
date:   2016-11-08 04:40:26 +0000
---

When I first started doing some of my Learn coursework on [Cloud9](http://c9.io), it seemed pretty seamless - you have your terminal and your editor and your filetree, and you can run commands just like you would in a local environment.

But one area where things got a little hairy was previewing my work with `shotgun` or `rails server`. For reasons that immediately became obvious once I thought about it a little, Cloud9 can't use the default ports of 9393 (shotgun) or 3000 (rails) for all the hundreds of developers that use their service. Nor can they serve up your running code at the usual `localhost:portnumber` that you see in online guides.

Luckily, getting around this is pretty simple. You just need to pass in a couple of arguments to your commands to let shotgun or the rails server know where to send data.

Sinatra (using shotgun):

```
shotgun -p $PORT -o $IP
```

Rails:

```
rails server -p $PORT -b $IP
```

Cloud9 takes these variables, assigns you a port and IP, and serves up your running application at `http://workspacename-username.c9users.io`. Then you can take a look at your beautiful app and get on with coding!
