---
layout: post
title:  "Jobby - The Tale of a Sinatra App"
date:   2016-11-03 01:43:40 +0000
---


![Jobby home page](http://i.imgur.com/6oytnqA.jpg)

*Jobby's home screen*

**WHAT'S JOBBY?**

[Jobby](https://github.com/radditude/jobby) (the job search house elf) is a job search tracking app - you can create an account and save job listings, keep track of the status of job applications, and save info about companies you might like to work for. 

In ActiveRecord speak, users have many companies, companies have many potential jobs, and you the user have many potential jobs through companies. The app itself is built in Sinatra, and the front end is mostly Bootstrap.

**WHAT DID YOU MESS UP WHILE MAKING THIS APP?**

Let's just say "[alot](http://hyperboleandahalf.blogspot.com/2010/04/alot-is-better-than-you-at-everything.html)". I learned an awful lot about how not to develop software. Which is why I'm telling you about it all here so you can avoid my mistakes.

My number one mistake was starting off with an overly ambitious plan for this app. I had a long list of features I wanted to include, from tracking contacts (that would belong to companies) to Javascript form validation to UI features like being able to change the order of your list of jobs.

These are all pretty basic things in the world of web apps, but there were just too many of them that I didn't know how to do yet, and not enough time to learn. So, halfway through building the app, I got super bogged down and had to take a big step backwards and reconsider my priorities. I ended up tossing out a lot of my dream features in order to build an MVP.

An MVP, in start-up parlance, is a Minimum Viable Product - the absolute bare minimum app that you can build and still have an app, basically. The idea is that it's easier to add features later once you get the bare bones of the app working than it is to build all those features in from the beginning. This has definitely held true in my experience.

So my final version of the app is a pretty simple CRUD app, but it performs all the CRUD actions perfectly, and is fairly nice to look at to boot. There'll be time enough for advanced features down the road in Rails.

**DID YOU AT LEAST LISTEN TO YOUR TEACHER'S ADVICE?**

No, sadly, I did not. I did attend one of Luke's Sinatra project planning study groups, where I learned a lot about how to approach the project. He outlined a pretty simple and effective plan of attack, with the goal being an app you can build in 30 hours or less: 

1. Plan out your database. What tables will you need? What columns will they have? How will these tables relate to one another?
2. Plan out your routes. Where will `get '/'` lead you? How will you identify individual items in your URL?

If you run into difficulties with either of those planning stages, your idea won't work for this project. Simple enough, right?

But I got ahead of myself and didn't fully plan out all the routes for my app beforehand, which caused me to run into unforeseen difficulties when attempting to build a contacts interface.

Don't do what I did, kids! Listen to your teacher and plan *exhaustively*. Really. There's no such thing as too much planning.

**SO WHAT WENT RIGHT?**

Once I was done doing dumb stuff, the actual building of the app went really quickly. It's only a little bit more functionality than Fwitter, along with a nicer front-end.

Sinatra gets pretty repetitive pretty fast, though, and I found myself repeating a lot of code. Every single route needed an `if logged_in` conditional statement to keep users that weren't logged in out of the confidential parts of the app, and it wasn't until I was almost done that I realized that I could use the `before do` function to check logged in status across all my routes at once.

I added the following code to my ApplicationController and instantly my life got a whole lot easier:

```ruby
before do
   if !logged_in
     redirect '/'
   end
end
```
 
However, this meant that logged-out users weren't able to access the sign-in or login pages either. Surely there had to be a way to exclude the three measly pages that logged-out users were allowed to see...
 
A little bit of googling later and Stackoverflow delivered [exactly the answer I was looking for](http://stackoverflow.com/questions/7703962/in-sinatra-how-do-you-make-a-before-filter-that-matches-all-routes-except-some).

```ruby
before do
   pass if ["login", "signup", nil].include? request.path_info.split('/')[1]
   if !logged_in
     redirect '/'
   end
end
```

Bam. 80% of my repetitive code was gone.

**WHAT ADVICE DO YOU HAVE FOR YOUR FUTURE SELF?**

Plan, plan, plan. Don't try to do everything at once. And listen to your teachers/more experienced people. And try to ask the right questions.

---------

*If you'd like to see Jobby in action, check out the [video walkthrough](https://youtu.be/Iu8V5ygm2Po).*


