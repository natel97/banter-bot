# Banter Bot

[![Build Status](https://gh-drone.nathaniallubitz.com/api/badges/natel97/banter-bot/status.svg)](https://gh-drone.nathaniallubitz.com/natel97/banter-bot)

## Description

Banter Bot is a bot with the intent of encouraging discussions throughout a Discord server. It is hosted with Kubernetes in an AtomicPI & Asus Tinkerboard and deployed via Drone.

## What it does now

It's very basic. I wasn't even planning on posting this on GitHub. But I figured it might be nice to have available online? Who knows!

### Generic

- Plays a fun sound when someone joins a voice channel

### Commands

Commands are triggered when the bot is @'d if the text contains the following:

#### Poll us

This will ask a random question, possibly tag someone, and add a 👍 and 👎 to allow people to voice their opinion.

Ex: Can @Joe tell good jokes?

👍 👎

#### Provoke our thoughts

Asks open ended questions that may tag someone to make it more personal and fun.

Ex: If @Josh were a sandwich, which sandwich would they be?

## Ideas to vet for the future

- Auto posting in a channel if 2 people are in a room (encourage more to join), partly implemented
- Randomly asking people questions
- Integrating games like hangman or starting up a round of Among Us
- Birthday announcements
- Video streams?
- DM conversations / EMacs Doctor
- Random chat sessions (bot pics two random people and DM responses get sent to mystery person until tbd)
