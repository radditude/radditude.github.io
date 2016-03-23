---
layout: post
title:  "Telling Time in Ruby"
date:   2016-10-19 23:14:20 +0000
---


One of the great things about Ruby is its flexibility - there's almost always more than one way to do things, whether that's straight synonyms like `#map` vs `#collect`, or sibling methods like `#find` vs `#select` (#find returns just the first result, #select returns all results -- if you're wondering).

Time is no different. There's a lot of ways to get Ruby to tell you the time, depending on your needs.

**1. TIME.NOW**

Can't go wrong with a classic. `Time.now`, or alternately `Time.new`, tells you what time it is right this second. If you want your website to display the current year and never have to remember to update it, `Time.now.year` has you covered.

```
Time.now 
  => 2016-10-19 22:11:23 +0000 
Time.now.year
  => 2016
```

However, `Time.now`'s readability leaves a little bit to be desired. If I want my app to display "Wednesday, October 19, 2016, 5:13pm," I'm going to call on...

**2. TIME.STRFTIME**

"Strftime" is short for "string format time," and it's really flexible and useful. You just call `Time.new.strftime()` and pass in some directives, and it spits out a perfectly formatted string that updates automatically.

```
Time.new.strftime("%A, %B %e, %Y, %l:%M%P")
  => "Wednesday, October 19, 2016, 10:25pm"
```

For all the details on #strftime and all the formats it's capable of, check out [the RubyDocs](https://ruby-doc.org/core-2.1.1/Time.html#method-i-strftime).

**3. PAST DATES**

Do you know what day of the week it was the day you were born? Yeah, I don't know either. But I know how to find out, and I *don't* need to ask my mom.

```
Time.new(1988, 03, 15).strftime("%A")
  => "Tuesday"
```

*Caveat*: if you need to go earlier than 1970, you'll want to use the [Date](http://ruby-doc.org/stdlib-2.2.0/libdoc/date/rdoc/Date.html) or [DateTime](http://ruby-doc.org/stdlib-2.2.0/libdoc/date/rdoc/DateTime.html) class instead of Time. 

They're calculated in different ways: Time measures time in exactly one way, the number of seconds since January 1, 1970 ([UNIX Epoch Time](https://en.wikipedia.org/wiki/Unix_time)), while Date takes into account leap seconds, calendar adjustments, and even the 10-day jump of the switch between Julian and Gregorian calendars. 

If you're working with historical dates and times, Date will be much more accurate, but since it isn't part of the Ruby core, you'll need to explicitly require it using `require 'date'`. If you're working with current time, plus or minus a few years, stick with Time.

*Another Caveat*: This post is about pure Ruby. Rails extends the Ruby Time and Date classes to give you about 12 gajillion really cool and handy ways to tell time, which you can read about [here](http://api.rubyonrails.org/classes/Time.html).
