---
layout: post
title:  "What's On Netflix - A CLI Gem"
date:   2016-09-29 04:53:07 +0000
---


The idea for this project came to me one day when perusing [Netflix Update](http://www.netflixupdate.com/). Netflix Update has tons of useful data about what movies are coming to and leaving Netflix. However, they give it to you as a static list of titles and years. 

To learn more, I had to actually go to IMDB and search for the title myself, using as many as 3 or 4 clicks, along with assorted typing. I think we can all agree that this is an unacceptable amount of work. 

So I decided to make it easier. [What's On Netflix](https://github.com/radditude/whats-on-netflix-cli-gem) pulls the list of movies coming or going on Netflix, and all you have to do is type the number of the movie you want to see more about. Then What's On Netflix pulls info directly from IMDB -- no clicking required!

**Preparation**

I wasn't sure how to start at first. The requirements for the project were open-ended: it must draw data from an outside source, and it must have a CLI. Everything else was up to me.

So I decided to do some research and get some idea of how other people approached projects like this. [Avi's video walkthrough](https://www.youtube.com/watch?v=_lDExWIhYKI) was a big help, as were blog posts by other Learn students about their CLI gems.

Slowly, I put together a plan of attack. 

My initial instinct had been to start by writing the web scraper, and then building the interface and the CLI logic once I figured out how to actually get the data they would display. Avi's method was very different: he started by stubbing out the user interface using hardcoded data, determining exactly how a user would interact with the application.

Once I thought about it, this approach made a lot of sense. Building a user interface, even a simple CLI, requires experimentation -- if you're already locked into a certain way of doing things because you built the scraper first, you're not going to have as much flexibility when building the CLI, and you're more likely to end up with an application that's not particularly user-friendly.

So, as soon as I had those first few steps figured out, I ran `gem bundle whats-on-netflix` and got started.

Bundler is really great for generating the basic files of a gem. I still spent a while fiddling around with file dependencies, but a lot less than I would have if I'd written the gemspec, executable, spechelper, and assorted other files from scratch. 

Plus, bundled gems come with a cool little feature called the console, which fires up an IRB session that's already loaded with all the code from your gem. This turned out to be incredibly useful in the development process, since I could do really effective manual testing by calling individual methods with different arguments.

**CLI Logic**

Building the CLI was the first big hurdle to clear, not least because it forced me to consider how I was going to structure the rest of my code at the same time. When would a CLI object gets its data? How would it communicate with the other objects?

But first there was the big question for any user interface -- how to respond to invalid input? People mistype stuff all the time. They click the wrong button, they press enter before they meant to. A good UI has mechanisms in place to prevent that stuff from crashing the program.

The answer seemed simple: a while loop that played until the user's input equaled "exit", so the program wouldn't close until it was told to.

In practice, this was tricky. There was an ill-advised experiment with having two different instance variables to hold user input, both of which had to equal "exit" before the program shut down. I spent a lot of time stuck in infinite loops and frantically ctrl-c-ing my way out of them. 

I was overthinking it. The structure I ended up with was almost deceptively simple:

```
@input = gets.strip

while @input != "exit"

	(output list view based on user input)

	while @input != "exit" && @input != "back"

		(output detail view based on user input)

	end
end
```
I was working with hard-coded data at this point; once I got the CLI logic down, it was time to start abstracting these hard-coded values into something more dynamic.

**Building the ComingSoon Class**

Next step was building a class to hold the data I was going to be pulling from the web. A new instance of this class would package up all the data about a particular movie into one object.

I had a problem, though. I had two different types of movies I was collecting data about, they used very similar code, and that code had to be kept strictly separate. If leaving soon movies showed up in the Coming Soon list, the gem was less than useless.

The answer, I saw, was to build two different classes, one for coming soon and one for leaving soon, and never the twain shall meet. 

I also quickly figured out that it was maddening trying to make changes to two near-identical blocks of code as I fleshed out the structure of the class, so I decided to abandon the LeavingSoon class for the moment -- once ComingSoon was fully functional, I could use it to build out the other one.

After that, it was fairly straightforward. I'd been doing this type of coding for weeks as I progressed through the OO Ruby section on Learn: initialize a new object, assign it data from an array or a hash, add it to an @@all class variable.

Soon, it was time to write my web scraper.

**Scraping**

Once I got the Scraper class fired up, I immediately ran into a problem. The site I was using to draw my list of movies coming to/leaving from Netflix didn't use a consistent structure for their URLs. 

The variation between "movies-coming-soon-in-september" or "coming-soon-in-august" or "july-coming-soon" might not seem like a big deal to a human, but for a web scraper, it's a mess. I didn't have any way to automatically detect the URL each month. So I switched to a different source: [whats-on-netflix.com](http://www.whats-on-netflix.com/). They use nice consistent URLs, so all I had to do was figure out how to update the month and year.

Scraping info from IMDB was the last and most difficult piece of the puzzle. Up to now, I'd only ever scraped static sites -- for this, I needed to learn how to submit a find request to IMDB, choose from the list of results to find the movie page, and then pull info from that page into a format my ComingSoon class could use.

Luckily for me, I wasn't reinventing the wheel. When I googled around looking for examples of what I needed to do, I found [yayimdbs](https://github.com/o-sam-o/yayimdbs), an IMDB scraper gem that used Nokogiri. I was writing my own scraper, of course, but it was really helpful to see an example of how the code could fit together.

**Finishing Touches**

With the Scraper built and scraping away, it was time to start putting the pieces together. I fed data from the scraper into the ComingSoon class, which turned out instances with all the relevant data attached and sent the packages over to the CLI class, which output the data to the terminal.

I built the LeavingSoon class to *almost* mirror the ComingSoon class. Then, when I noticed how much code they shared, I built a parent class, List, for both of them to inherit their common code from.

I ran `ruby bin/whats-on-netflix` and held my breath. And... there was an error message. I had forgotten to change the names of one of the class-specific variables in LeavingSoon.

Oh well. I fixed it and tried again. This time it worked!

There were still bugs to squash here and there, of course. But it worked, and a surprisingly short time later I was pushing my code [out to RubyGems](https://rubygems.org/gems/whats-on-netflix/versions/0.1.3) for the world to enjoy.

You can even try it out yourself by running `gem install whats-on-netflix`.
