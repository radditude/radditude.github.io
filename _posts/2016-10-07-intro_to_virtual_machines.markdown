---
layout: post
title:  "Intro to Virtual Machines"
date:   2016-10-07 20:58:46 +0000
---


In a [previous post](http://clarehorton.com/2016/09/11/so_this_is_why_they_say_not_to_do_ruby_development_on_windows/), I chronicled my adventures with trying to set up a local dev environment on Windows. Spoiler alert: it didn't go well.

Basically, I learned that if I want to have a relatively stable, usable local environment for Ruby development, I need to use Linux. However, changing your OS is scary, and Linux is intimidating for a newbie. So many options! What do I do if I break something? I've got approximately twenty years of experience troubleshooting Windows issues, and very little on Linux.

What I needed was a way to dip my toe into the Linux pool without throwing myself into the deep end before I was ready. I needed... *drumroll*... a virtual machine.

This guide is based on my own experience and is meant to help you, my fellow Windows user, go from zero to virtual machine in relatively little time.

**About VMs**

But first, some background. What is this "virtual machine" I speak of?

A virtual machine is pretty much what it sounds like - a computer within a computer, running its own operating system and software, sharing resources with your main OS. You can install and uninstall software, gems, and frameworks, save files, and do basically anything you could do on your main OS.

However, if something breaks on a virtual machine, you can shut it down and it's gone. The rest of your operating system is totally unaffected.

Virtual machines are also used frequently by developers to create a clean slate for particular projects, so getting comfortable with VMs isn't a bad idea from a professional skills standpoint.

**Ingredients**

To whip up your very own virtual machine, you will need two things:
1) an installed copy of Oracle's [VirtualBox](https://www.virtualbox.org/) and
2) a copy of the operating system you'd like to use on your VM.

VirtualBox isn't the only VM software out there, but it's probably the most standard, so it's the one I use and the one I'll be covering in this guide. To get started, go to [the downloads page](https://www.virtualbox.org/wiki/Downloads) and install the Windows version.

Part 2 is a little more complicated, simply because there are approximately a million distributions of Linux out there, they're all a little bit different, and they all have their devoted fans and equally devoted detractors.

I chose [Elementary OS](https://elementary.io/) to start with, based on a recommendation from another Flatiron student. Elementary OS is built on top of Ubuntu, so it can do a lot of heavy lifting, but it's designed for usability and, unlike a lot of Linux distros, doesn't look like it was built by cave trolls. 

Whatever you choose, make your way to the downloads page and download the .iso file. This is going to be a fairly massive file, so this would be a good time to check your Facebook or make some tea or whatever you do while waiting for huge files to download.

**Virtualize Me**

Open up VirtualBox and hit the big "New" button at the top to start creating your first VM. Then, when the dialogue box pops up, hit "Guided Mode".

On the first page, you pick a name for your virtual machine and tell VirtualBox what operating system you plan to install on this VM so the software can get itself configured appropriately.

Next is memory - this is how much memory will be available to your virtual machine while it's running. Bear in mind that your normal system processes will still be going on, so if you assign too much memory to your virtual machine, Windows will have trouble. However, if you assign too little, your virtual machine will be laggy and slow.

The default is 512 mb (half a GB), and you can always change this setting later.

Next page: creating a virtual hard drive for your virtual machine. First it will ask you to choose a file type for the virtual HD file - I'd leave this on the default for now. 

Next, you'll decide if the virtual hard drive should have fixed or dynamic storage. With dynamic storage, the size of the virtual machine's hard drive will change as you add more files and software to it, up to a set maximum. 

With fixed storage, you assign a block of, say, 10 GB, and that block will be assigned to the VM and unavailable to Windows until you delete that virtual machine. Let's go with dynamic this time. 

On the next page you'll set the location of the hard drive file (leave this on the default) and choose the maximum. If you're not hurting for space on your hard drive, I'd increase this from the default 8 GB.

That should complete your setup! You'll see your brand new virtual machine listed on the left. Select it and hit "Start."

You should see a dialogue box asking you about something called a "Startup Disk." This is the .iso file that you downloaded earlier, the installation file for the operating system your virtual machine will run. Once you tell VirtualBox where that file is, it should start installing automatically.

A few minutes later, you should have your very own Linux sandbox to play around in. From here, you'll still need to install Ruby, your favorite text editor, and whatever other dev tools you would like to have, but for that you're better off looking for guides to the specific operating system you decided on.

Don't forget to `gem install learn-co` so you can run commands like `learn` and `learn submit`! Happy VM-ing!
