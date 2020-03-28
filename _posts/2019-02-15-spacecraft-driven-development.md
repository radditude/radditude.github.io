---
layout: post
title: 'Spacecraft Driven Development'
subtitle: 'Taking Computers to The Moon'
---

At the dawn of the space program, computers were enormous, bulky, delicate things, with extremely limited processing capability. Today, we have unmanned spacecraft exploring the outer reaches of the solar system.

This is the story of how we got here from there.

It’s easy to forget that even the most sophisticated technology is rooted in a series of incremental developments – learning from failure – and the story of NASA’s earliest onboard guidance computers is no different. Along the way, they more or less invented the discipline of software engineering, along with many of the best practices we know and love today.

If you’ve come here for stories of sci-fi-like last-minute repairs and incredible feats of genius, you may be disappointed. The people in these stories were incredibly smart, yes, but they were also figuring things out as they went along – it’s a hazard of doing things no one’s ever done before.

## Project Mercury & the Human Computers

The year was 1958. The space race had just kicked off with the launch of {% include shared/external_link.html url="https://en.wikipedia.org/wiki/Sputnik_1" title="Sputnik" %}, and the newly formed National Aeronautics and Space Administration was under a lot of pressure.

Cue Project Mercury, the first U.S. human spaceflight program. The goal was simply to put an astronaut into orbit, then return him (all American astronauts were male until Sally Ride’s first flight in 1983) safely to the ground.

Project Mercury spacecraft were essentially well-sealed tin cans filled with air, plus some instrumentation and small positional thrusters. Ascent was controlled by the angle of the rocket at launch, and descent was handled by a parachute and water landing. There was no guidance computer, and the only way to communicate with the ground was by radio.

The astronaut still needed to perform small adjustments in mid-flight to control his orbit and ensure he re-entered the atmosphere at the correct angle. And so they needed some way to relay data to the ground, use NASA’s computers to make those incredibly complex flight calculations, and relay the results back to space.

The solution they came up with was a logistical feat that boggles the mind. It was a global relay race:

1. The astronaut would take readings from his instruments and radio the results to the ground.
1. That radio call would be received by the Worldwide Tracking Network, a chain of 18 stations around the equator in various nations and continents. Each station was in range of the spacecraft for approximately 7 minutes as it passed overhead.
1. The Worldwide Tracking Network relayed the data from the spacecraft to NASA staffers at the control centers in Maryland and Florida, who ran the calculations on their (firmly non-portable) computers.
1. NASA then phoned the results of their calculations to the WTN (after calculating which station was currently in range of the spacecraft).
1. The WTN station radioed the results back up to the spacecraft.
1. The astronaut would make the appropriate adjustments, take new readings, and start the cycle all over again. Each flight needed a total of about 18,000 support personnel on the ground.

_This is the beginning of a post that lives over on revelry.co_. _{% include shared/external_link.html url="https://revelry.co/spacecraft-driven-development/" title="Read the rest" %}_.
