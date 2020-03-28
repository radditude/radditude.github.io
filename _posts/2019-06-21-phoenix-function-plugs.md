---
layout: post
title: 'DRY Up Your Phoenix Controllers With Function Plugs'
---

Plugs are a really powerful construct. They show up all over the place in Phoenix, from setting up {% include shared/external_link.html url="https://hexdocs.pm/phoenix/routing.html#pipelines" title="pipelines" %} in a router to enabling {% include shared/external_link.html url="https://hexdocs.pm/phoenix/controllers.html#action-fallback" title="`action_fallback`" %} error handling — the composable, flexible nature of the plug spec means that it's at the heart of many Phoenix features.

They're easy to write, too. A module plug is nothing more than a regular Elixir module that implements an `init` function which accepts a set of options, and a `call` function which applies those options to the conn and returns the updated `%Plug.Conn{}` struct. 

The following is a perfectly valid plug (if a bit useless):

{% highlight elixir %}

defmodule ExamplePlug do  
  def init([]), do: false  
  def call(conn, _opts), do: conn  
end
{% endhighlight %}

Module plugs can feel like overkill for smaller tasks, though, and it's not always ideal to separate logic that's tightly coupled to one controller out into a different module/file.

This is where function plugs shine. They can help break up nested logic and break down complex controller actions into smaller, more comprehensible chunks, while keeping everything in the same controller.

To turn a function into a function plug, it needs to accept a `conn` and `opts` and return the updated `conn`:


{% highlight elixir %}

def example_plug(conn, _opts) do  
  assign(conn, :processed_by_example_plug, true)  
end
{% endhighlight %}

For a somewhat less contrived example, we'll take a look at the following controller.

Our example app includes an event invite management feature where we need to check the following:

1. the event exists
2. the invite exists
3. the user trying to edit the invite is a host of the event


{% highlight elixir linenos %}

defmodule HelloWeb.EventInviteController do  
  use HelloWeb, :controller  
  alias Hello.{Events, Invites, Invite}  

  def edit(conn, %{  
    "event_id" => event_id,  
    "invite_id" => invite_id  
  }) do  
    case Events.get_event(event_id) do  
      {:ok, event} ->  
        case Invites.get_invite(invite_id) do  
          {:ok, invite} ->  
            case is_host?(  
              event,  
              conn.assigns.current_user  
            ) do  
              false -> :not_authorized  
              true ->  
                changeset = Invite.changeset(invite)  
                render(  
                  conn,  
                  "edit.html",  
                  event: event,  
                  changeset: changeset  
                )  
            end  
          nil ->  
            :not_found  
        end  
      nil ->  
        :not_found  
    end  
  end  
  
  def update(  
    conn,  
    %{  
      "event_id" => event_id,  
      "invite_id" => invite_id,  
      "invite" => invite_params  
    }  
  ) do  
    case Events.get_event(event_id) do  
      {:ok, event} ->  
        case Invites.get_invite(invite_id) do  
          {:ok, invite} ->  
            case is_host?(  
              event,  
              conn.assigns.current_user  
            ) do  
              false -> :not_authorized  
              true ->  
                case Invites.update_invite(  
                  invite_params  
                ) do  
                  {:error, changeset} ->  
                    render(  
                      conn,   
                      "edit.html",   
                      event: event,   
                      changeset: changeset  
                    )  
                  {:ok, invite} ->  
                    redirect(conn,  
                      to: event_invite_path(  
                        conn,  
                        :show,   
                        event,   
                        invite  
                      )  
                    )  
                end  
            end  
          nil ->  
            :not_found  
        end  
      nil ->  
        :not_found  
    end  
  end  
end  
{% endhighlight %}

We've got some really deeply nested logic here, which gets pretty hard to read, plus there's a lot of repetition between the different controller actions since they're checking a lot of the same things.

Function plugs to the rescue!

{% highlight elixir linenos %}

defmodule HelloWeb.EventInviteController do  
  use HelloWeb, :controller  
  alias Hello.{Events, Invites, Invite}  
  
  plug :ensure_event_exists  
  plug :ensure_invite_exists  
  plug :ensure_host  
  
  def edit(conn, _params) do  
    %{event: event, invite: invite} = conn.assigns  
    changeset = Invite.changeset(invite)  
    render(  
      conn,   
      "edit.html",   
      event: event,   
      changeset: changeset  
    )  
  end  
  
  def update(conn, %{"invite" => invite_params}) do  
    %{event: event, invite: invite} = conn.assigns  
    case Invites.update_invite(invite_params) do  
      {:error, changeset} ->  
        render(  
          conn,   
          "edit.html",   
          event: event,   
          changeset: changeset  
        )  
      {:ok, invite} ->  
        redirect(  
          conn,  
          to: event_invite_path(  
            conn,  
            :show,  
            event,  
            invite  
          )  
        )  
    end  
  end  
  
  defp ensure_event_exists(conn, _) do  
    case Events.get_event(  
      conn.params["event_id"]  
    ) do  
      nil -> not_found(conn)  
      event -> assign(conn, :event, event)  
    end  
  end  
  
  defp ensure_invite_exists(conn, _) do  
    case Invites.get_invite(  
      conn.params["invite_id"]  
    ) do  
      nil -> not_found(conn)  
      invite -> assign(conn, :invite, invite)  
    end  
  end  
  
  defp ensure_host(conn, _) do  
    case is_host?(  
      conn.assigns.event,   
      conn.assigns.current_user  
    ) do  
      nil -> not_found(conn)  
      invite -> conn  
    end  
  end  
  
  defp not_found(conn) do  
    conn  
      |> put_status(404)  
      |> render("404.html")  
      |> halt()  
  end  
end  
{% endhighlight %}

You may be wondering about the `halt\1` function in the error handler.

By default, all the plugs in the pipeline will be called for every request, so without the call to `halt()` Phoenix will `render(conn, "404.html")` and then attempt to continue, causing your controller action to blow up. As the name implies, `halt()` stops the plug pipeline and returns the current conn.

After refactoring, what was once a deeply nested set of conditional logic is now a series of small individual functions that are easier to read and also easier to change or remove later.

Let's say you needed to add an additional check to ensure that past events couldn't be edited. In the previous implementation, you'd need to add an additional case statement to every controller action.

This way, all you need is a new function plug that returns the conn if the event is ok to edit and renders an error if it isn't - no need to modify individual controller actions at all.

Happy Elixir-ing!
