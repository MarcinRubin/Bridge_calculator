# Bridge Calculator

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [How To Use](#how-to-use)
* [Project Status](#project-status)
* [Future Plans](#future-plans)


## General Information
This is a simple bridge calculator that allows you to create a simplified version of an individual bridge tournament. It was created mainly as a simple tool for calculating points for casual bridge meetings
and for testing the capabilities of react js. If you are looking for a straighforward tool that allows you to quickly set up a game where the pairs are constantly changing, and you don't want to calculate points by hand, you can try this solution!

## Technologies Used
<ul>
  <li>JavaScript</li>
  <li>React</li>
  <li>HTML5 & CSS3</li>
</ul>

## Features

* Pairing and creating a simplified bridge individual tournament.
* Pairs change between rounds and everyone is paired with everyone else (if maximum number of rounds is played).
* Application works even if there is an extra player (each round one player rests).
* After each round, points are calculated (currently only IMP calcultions work) and assigned to each player individually.

## How To Use
Just click <a href="https://marcinrubin.github.io/Bridge_calculator/">here</a> to launch.
  - Fill in the names of the players, choose the number of rounds and the number of deals in a single round and click Generate.
  - Results tables for each round are generated.
  - DO NOT REFRESH THE PAGE! Data is not stored locally and will be lost when the page is reloaded.
  - Fill the table using the standard bridge notation like (you have to click "ok" for wach row to calculate):
    - 3NT, N, 0 (contract: 3 non trump, player: N, number of tricks are equal to declared)
    - 5DX, S, -1 (contract: 5 diamonds with double, player: S, one trick short to win)
    - 4S, E, 2 (contract: 4 spades, player: E, two additional tricks taken)
  - If the input is invalid, the calculation will not be performed.
  - When the table is full, use the button at the bottom to get a final result for the round.


## Project Status
The project is working as I originally planned. 
I may return to it in the future to make it more user friendly and add more features, but I would probably prefer to create something new from scratch that is better written.


## Future Plans
Maybe
  - Add other type of points calculation
  - create a better UI
  - Include more complicated setups if there are two or three extra people playing
