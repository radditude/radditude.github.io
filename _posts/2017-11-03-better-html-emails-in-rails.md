---
layout: post
title: "Rails HTML Email Development That Doesn't Suck"
---

If you’ve worked with HTML emails, you know that they pose their own special
challenges. Best practices for CSS in emails are different from best practices
for modern web CSS. It’s tricky to preview changes, and testing on different
email clients gets time consuming quickly.

But there’s a few tools and tricks you can use to set up an email development
workflow that looks more like the front-end development workflow you’re used to.
Read about them below, or skip straight to the
{% include shared/external_link.html url="https://github.com/radditude/rails-html-email-setup" title="example Rails app" %}
set up with all of these tools.

## HTML Email Development using Premailer & Foundation

Many email clients ignore externally linked stylesheets, so your best bet for
compatibility is pretending that it’s 1998 and writing all your styles inline.
{% include shared/external_link.html url="https://github.com/fphilipe/premailer-rails" title="Premailer" %}
makes this process suck less by letting you write your styles as normal
stylesheets, then compiling them into inline styles when the email is sent.
Plus, it’s compatible with Less and Sass (through the Rails asset pipeline).
This means you can keep the syntax you’re used to.

Email CSS has compatibility issues that are completely separate from the browser
compatibility issues we all know and love. So, it’s nice to start out with a set
of tried-and-tested style rules to prevent reinventing the wheel. Enter
{% include shared/external_link.html url="https://foundation.zurb.com/emails.html" title="Foundation for Emails" %}
and
{% include shared/external_link.html url="https://foundation.zurb.com/emails/docs/inky.html" title="Inky" %},
a framework and templating language for writing great HTML emails.

_This is the beginning of a post that lives over on revelry.co_.
_{% include shared/external_link.html url="https://revelry.co/html-email-development-rails-tools/" title="Read the rest" %}_.
