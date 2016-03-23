---
layout: post
title:  "So This Is Why They Say Not to Do Ruby Development on Windows"
date:   2016-09-11 03:37:42 +0000
---

Ah, the development environment. Scourge of novice programmers everywhere.

Much as I appreciate the beautiful Learn IDE so painstakingly put together for us by the Flatiron School dev team, once I got into the Ruby part of the program I was ready to level up and use a local environment. I wanted to look under the hood a little bit and do my own set up, maybe figure out some of what was happening behind the scenes.

Plus, the Learn IDE doesn't play nice with my machine, and I'm sick of shutting it down and restarting it once an hour.

However, my desktop runs Windows 10, and while I wanted to experiment with a local environment, I wasn't quiiiiiite ready to make the plunge and try to install Linux just yet. I'm learning a *lot* of new things right now, and a whole new OS is a big step. So I started looking into resources for setting up a Ruby dev environment on Windows.

There weren't any.

That's not quite true -- there are a few tutorials kicking around the interwebs. Most of them are well out of date, though, or recommend an IDE. Mostly what I found was forum discussions where some eager soul asked "How do I set up a Ruby development environment on Windows?" and received a string of one- or two-word responses. "No." "Just don't." "Buy a Mac."

I have never learned when to leave well enough alone, and I have what is probably far too much faith in my own ability to figure stuff out. These overwhelmingly negative responses with little information attached just made me more determined.

So, armed with a bunch of outdated tutorials and a can-do attitude, I got started.

*The Terminal*

As you have already guessed, this was one of those classic cases where I didn't know enough to realize what I didn't know. I naively assumed that I could use Windows Powershell more or less the same way someone on Linux or a Mac could use their terminal or shell. I soon found out I was wrong.

You see, Mac OS, as well as the various flavors of Linux, have a common ancestor called UNIX, whereas Windows descends from something known as DOS.

Those two ancestors were based on vastly different file organization schemes. To dramatically oversimplify: you know how Windows has drive letters? The C drive for your operating system, the D drive for your optical drive, and so forth?

UNIX doesn't. UNIX-based systems have a single drive hierarachy which includes every program, file, and hardware component.

Think about cd-ing around to different directories on Windows in your IDE terminal - how do you cd to a different drive? You can go up to the root of the C drive, but you can't jump sideways to a different drive letter.

It's different on Unix. On UNIX, you can access every single file, directory, and hardware component through the shell, and as a result, UNIX shells are baked in. They're an essential part of the operating system, even if a user prefers to point and click.

Windows, on the other hand, was more of a point and click (aka GUI, or graphical user interface) operating system first - that's what made it so popular back when home computing was brand-new.

Powershell and Command Prompt are programs that run on Windows computers, not essential parts of the OS. It's a subtle distinction, but it's important.

*Note: like I said, I'm way oversimplifying here. For more info on Unix vs DOS, check out [this article on Unix from the How To Geek](http://www.howtogeek.com/182649/htg-explains-what-is-unix/) and [the section on design from the Wikipedia article on DOS](https://en.wikipedia.org/wiki/DOS#Design).*

What does all this mean? Well, for one thing, the commands are all different. So when you try to draw on online resources (mostly written for Linux/Mac/Unix users), a lot of the commands won't work for you.

And when you yet don't understand the *why's* of what you're doing, that's a big problem.

For another, when I installed the command line version of [Git for Windows](https://git-for-windows.github.io/), so I could get more practice using regular git commands outside of the IDE, it came with its own little mini BASH terminal, entirely separate from Powershell.

Linux commands worked just fine there, but running `git init` in a Powershell window resulted in nothing more than the computer equivalent of a mocking laugh.

I sighed and resigned myself to using the Git-for-Windows-provided terminal for all git-related things. Surely it wouldn't be too bad using two different terminals, right?

*Ruby*

Wrong! When I installed Ruby using the [Ruby Installer for Windows](http://rubyinstaller.org/), I discovered that it, too, comes with its own command line interface that does not play nicely with Powershell or Git for Windows' terminal.

Now I had two terminal interfaces, each for a specific purpose, that didn't communicate with each other. Not an ideal setup.

But I don't know when to quit, so I figured I could make the two-terminal thing work until I learned enough to find another solution. I started trying to install some of the Ruby gems I needed to do my Learn coursework.

Turns out that for various reasons, a lot of Ruby gems aren't tested or supported on Windows. `gem install pry` went ok, though, as did `gem install bundler`. It was when I tried `gem install learn-co` that I ran into trouble.

The learn-co gem would give me the ability to run commands like `learn` and `learn submit` on my own system, communicating with Learn's servers so that my completed labs and lessons would be marked green as I progressed through the program. It's not really something I could manage without if I wanted to use a local environment instead of the Learn IDE.

`Building native extensions`, said my Ruby terminal. `This could take a while.` So I waited. And waited. Finally the message came back: native extensions could not be built.

I wasn't entirely sure what that meant - I was basically entirely at sea at this point - but it sounded bad. The message went on to recommend that I install [the RubyInstaller Development Kit](http://rubyinstaller.org/downloads/), which, as I understood it, would give my local Ruby installation the ability to shoehorn in Ruby gems that were not strictly supported on Windows. So I went back to the Ruby Installer website and spent another hour poring over FAQs and getting the DevKit installed.

I held my breath and ran `gem install learn-co` one more time, whereupon the entire Ruby terminal crashed. I restarted it and tried again. This time I got another error message.

At this point, I'd spent almost a full weekend day on this. My weekend time is precious. I have a full-time job to attend to on weekdays, so weekends are uninterrupted coding time, when I pour knowledge into my brain. I finally admitted defeat.

*The Point*

The next day, I registered for [Cloud9](https://c9.io/), a cloud development environment service. I set up a new Ruby workspace, typed `gem install learn-co` into the terminal, and a few minutes later was happily working through my next lab. No muss, no fuss, no installing a new operating system required.

The lesson to take away here: it's not that Ruby development on Windows is impossible. But it's messy and time-consuming, for various reasons, and there are better tools out there.

Personally, I'd rather spend that time learning to write better code. Isn't that what we're all here for?
