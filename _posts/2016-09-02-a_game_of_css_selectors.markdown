---
layout: post
title:  "A Game of CSS Selectors"
date:   2016-09-02 01:12:35 +0000
---


I'm really excited about CSS selectors. **Really** excited.

You see, I learned the basics of HTML and CSS from coding ebooks, which support a rather primitive form of HTML & CSS that doesn't bear much of a resemblance to what you see on the web. Most ebook readers don't even support multiple classes assigned to one element, let alone advanced CSS selectors. After sweating my way through complicated CSS files with dozens of special, single-use classes and id definitions, CSS selectors are like experiencing air conditioning for the first time.

So I decided to develop a very special cheat sheet with some pseudo-code to help me remember these little bits of CSS magic and how they fit together. Presenting...

**A GAME OF CSS SELECTORS**

*THE BASICS*

```html
<westeros>

    <winterfell class="at-peace">
       <stark id="ned">
       </stark>
    </winterfell>
	
    <kingslanding class="at-peace">
       <baratheon id="robert">
          <baratheon id="tommen">
          </baratheon>
       </baratheon>
    </kingslanding>
	
</westeros>
```

*Type Selector*: Let's say we wanted to make sure that all Starks have black hair:

```
stark {
  hair: black;
}
```

*ID Selector*: This is the beginning of the story, so let's clarify that Ned Stark is currently alive by selecting only the element with an id of `#ned`:

```
#ned {
  status: alive;
}
```

*Class Selector*: Again, this is the beginning of the story, so nobody's fighting just yet. Let's clarify that by selecting the elements with the class `.at-peace`:

```
.at-peace {
  war: none;
}
```

*Compound Selector*: Oops, I just noticed that when we assigned all Starks to have black hair, I left out poor King Robert, who also has black hair:

```
stark, #robert {
  hair: black;
}
```

Tommen doesn't have black hair, so I don't want to select all Baratheons, just Robert. Easy enough with the compound and ID selectors!

But this is just the beginning of the story. As we all know, it gets a lot more complicated...

*SLIGHTLY LESS BASIC BASICS*

```html
<house class="baratheon">
  <seat id="storms-end">
    <patriarch id="robert" class="king">
      <son id="gendry">
      </son>
    </patriarch>
  </seat>
</house>

<house class="tyrell">
  <seat id="highgarden">
    <matriarch id="olenna">
      <son id="mace">
        <son id="willas">
        </son>
        <son id="garlan">
        </son>
        <daughter id="margaery">
        </daughter>
        <son id="loras">
        </son>
      </son>
      <child></child>
      <child></child>
    </matriarch>
  </seat>
</house>
```

*Descendent Selector*: Now the story's gotten going and things are getting messy. Let's change the status of one of the sons of House Tyrell, Loras, to dead:

```
.tyrell son {
  status: dead;
}
```

*Child Selector*: Oops! The descendent selector applies to all the sons included in House Tyrell, but Mace Tyrell isn't dead yet. Let's change him back to alive:

```
#olenna > son {
  status: alive;
}
```

The child selector means that only Olenna's direct children are selected, not her grandchildren. So poor Loras is still dead.

*Sibling Selector*: Another way to select Loras is using Margaery and the sibling selector to ensure that only `<son>` elements that immediately follow `<daughter>` elements are selected:

```
daughter + son {
  knight-of: flowers;
}
```

*Preceded Selector*: Olenna Tyrell had some other kids, according to the books, but these unfortunate Tyrells got left out of the TV show. Let's use the preceded selector to select both of Mace's siblings:

```
#mace ~ child {
  tv-show: no;
}
```

If I had used the sibling selector, only the first `<child>` element would have been styled. This way, both are.

*Universal Selector*: One constant in the GoT series: winter is always coming. Let's use the universal selector, `*`, to make sure all of our "HTML" has the style `winter: is-coming;`:

```
* {
  winter: is-coming;
}
```

-------------------

And there you have it, folks. The Game-of-Thrones-iest CSS cheat sheet in all the land.
