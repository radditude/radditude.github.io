---
layout: post
title:  "FlatCollab, a Rails app for Flatiron group projects"
date:   2016-12-13 03:55:49 +0000
---


Hello, and welcome to the latest episode of the blog! Today we'll be discussing my latest portfolio project, FlatCollab.

FlatCollab ([live version on Heroku](https://flat-collab.herokuapp.com/) / [code on Github](https://github.com/radditude/flat-collab)) is a tool to help make finding partners for and working on group projects a little easier. You can post a public call for partners on a project or answer someone else's call to join their team, and then use a shared task list to figure out how to split up the various parts of the project.

All in all, it's a pretty cool app. But you're not here to hear about the finished app (though you can check it out [on Heroku](https://flat-collab.herokuapp.com/)). You're here to hear about the cool tricks I used to build it.

**SINGLE-BUTTON FORMS**

I used a lot of single-button forms in this project - that is to say, forms whose content consists of a single submit button, to make one simple change to a record without fussing with an edit form (or Javascript). 

We mostly see these used as delete buttons in the Learn curriculum, but they're also really useful when you want to allow the user to do things like claim one task from a shared list. I'm going to walk through the process of creating that "Claim Task" button as an example.

The first thing you need when creating a single-button form is a route. The button needs somewhere to send its information, and a controller action to handle it. My routes file looked like this:

```
resources :teams do
    resources :tasks
end
```

I could have used the built-in Rails `update` action... but I had plans for that route already, since I also wanted an edit form. I needed a custom route for my "Claim Task" button.

That route also needed to contain as much of the information needed to perform the action as possible - in this case the team id and task id, so I could find the correct record to update. 

I could have included these things as hidden fields, but that's not the best security practice - anyone who knows how to use Chrome Dev Tools can mess with your params. Much better to draw this information directly from the route.

So, with all that in mind, I updated my `config/routes` file:

```
resources :teams do
    resources :tasks
end

patch '/teams/:team_id/tasks/:id/claim', to: "tasks#claim", as: "claim_task"
```

Then I defined the `claim` action in the Tasks controller:

```
def claim
    current_team = Team.find(params[:team_id])
    current_task = current_team.tasks.find(params[:id])

    current_task.assign_user(current_user)
    redirect_to team_tasks_path(current_team)
end
```

Which called on a custom attribute writer in the Task model to assign the user and change the task.status from "unclaimed" to "claimed":

```
def assign_user(user)
    self.users << user
    self.status = "claimed"
    self.save
end
```

And then redirected back to the tasks index page.

Now I had my routes and controller actions set up, it was time for the most important step - the visible button itself.

To create the form and button, I tried a couple of different Rails helpers. `button_to` didn't have the flexibility I wanted, and `form_for`'s automatic routing made it difficult to get the form to route properly - it kept wanting to send its request to `tasks#update` instead of my custom action, `tasks#claim`. Eventually, I decided to step down one level of abstraction and rely on good old `form_tag`.

```
<%= form_tag claim_task_path(team, task), method: "patch", class: "ui inline form" do %>
    <%= submit_tag "Claim Task", class: "mini ui green button"  %>
<% end %>
```

Now, when a user clicks that button, the form takes over and sends a `patch` request to `claim_task_path`, which goes to the `tasks#claim` controller action, updating the record, then refreshing the page to show the update.

**DEVISING DEVISE**

Devise comes with a lot of magic out of the box, from its ready-made views to its predefined controller actions. But sometimes with a gem like that, you love everything... except maybe you want to change _one_ little thing.

For me, it was user registrations. By default, Devise signs users up with an email and password, but I wanted them to have a name as well (it's awkward to use an email address in user dialogues!).

Normally, this would be a relatively straightforward tweak - generate a migration to add a column to the `users` table, update the form, update the `user_params` to allow `params[:name]`. 

I could do the first two, easily. But because Devise's controllers are hidden away, it wasn't immediately obvious how to go about altering the `user_params`.

Luckily, I remembered to check the [Devise documentation](https://github.com/plataformatec/devise#strong-parameters) before I lost much time trying to figure it out. 

Turns out Devise magic doesn't end with views and controllers - it also comes with a sophisticated set of configuration options, and excellent documentation.

All I needed to do was change one little option in the `user_params`, and Devise has a built-in way to do just that, using a `before_action` filter in the `ApplicationController`.

```
class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
```

This code hooks into the Devise controllers and adds `:name` to the list of permitted keys in the strong params. Just like that, my users had names!

**FINAL THOUGHTS**

Like all of the software I've built so far, this Rails app has been an incredible learning experience. I can only hope that all of my projects provide me with such insight and education.
