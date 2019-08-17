# GHM Game State Integration

GHM is program which creates observator HUD for Counter Strike: Global Offensive. The program uses CSGOs Game State Integration which provides real-time socket-based updates to hud. GHM also creates dashboard to help user create/manage team/player profiles. Once GHM is on, 0 configuration is needed. The HUD is highly inspired by ESL's HUD.

## Project structure/requirements and setup:

GHM is meant to be run on local servers. In smaller productions it's prefered to have GHM run on observator's computer. Larger productions could opt into seperate server to run GHM on.

### Project structure:

* /app | This folder contains electron application, which renders HTML page into users (observators) screen. See shortcuts down below.
* /client | This folder contains frontend created with react.
* /cs-go | This folder contains example dataset and configs which i've found good to use. Note that `gamestate_integration_ghm.cfg` is required in order to this app work.
* /server | This folder contains NodeJS server.
* /scripts | This folder scripts that helps user to setup/run this program.

### Requirements:

This project relies on MongoDB. That means that you will have to get access to one. MongoDB atlas free tier works well but you could also host it by urself.

* Node.JS (tested on LTS 10.16.0)
* NPM
* MongoDB
* Windows 7/10 (tested)

### Project setup:

Setup is quite simple if you have basic acknowledge of npm and mongoDB. There are two ways to install this program:

#### Manual Setup:

1. Have all required technologies downloaded & working (Working DB)
2. Goto /cs-go/cfg and copy config files into csgo's cfg folder
3. Goto /client & /server & /app and run `npm install` in EACH FOLDER!
4. Goto /server and rename `.env.example` to `.env` and add following environment variables: (rest are optional)
```
DB_CONNECTION="mongodb+srv://url-to-cluster/test?retryWrites=true&w=majority"
```
5. in /server, open a cmd/powershell/terminal and run following command: `npm run production`. This command automatically builds front for you so you dont have to worry about it.
6. Now you have you server running. Go to `http://localhost:8080` and you find yourself in GHM dashboard. Here you can configurate your HUD and create/manage your player/team profiles. HUD opens in `http://localhost:8080/overlay`
7. If you want to get HUD on top of your game, goto /app and run `npm run start` in new cmd. (Note that you need to run CSGO on fullscreen windowed with 1920x1080 resolution.) If you want to remove CSGO's built in hud, type in console: `exec observator_ghm.cfg`. This removes all useless hud components.

#### Automatic Setup:

1. Same as manual
2. Same as manual
3. Goto /scripts and run `setup.bat`
4. Goto /server and open `.env` file and update `DB_CONNECTION` string to match your database
5. Goto /scripts and run `run.bat`

#### Overlay app setup & Run

1. Goto /app and run `npm install`. This load is usually very long depending on internet speed. If download doesn't finish. Run `npm install -g electron --verbose`.
2. Run `npm run start`. Console prompts the path to settings. In order to hud to be on top of csgo, csgo needs to be running on windowed fullscreen.

### In error cases:

* Now you should see message in top-right corner of your screen. If you don't see this message, you messed up at steps 3 or 5.
* If you see the message, but HUD doesn't connect to CSGO client, you messed up step 2.
* If your browser doesn't find site at `http://localhost:8080`, you messed up in step 3 or 5. Also make sure that your port is set right in `.env` file.
* If you cannot create new player/team profiles or create a new match, you messed up in step 4. Make sure that your Database connection string is actually valid and has access to write and read collections.

If you want to capture HUD in streaming software, use browser capture and link it to `http://localhost:8080/overlay` and capture game with game capture. Alternate way is to window capture whole screen.

## Future:

GHM is far from done. There are dozen of features which would fit perfectly, but I don't have time and energy to implement everything. If you have knowledge or passion to code, please consider contributing. Here are few features/bugs which I would add/fix:

* 'PUG mode', mode where you dont need to setup match in order to pictures and custom names no work in hud. Program would automatically test new players for database data, if not found => defaults to normal player.
* Radar - This project has it's custom radar but it's not good. It lacks smoothness. This needs to be redone with actual svg/canvas methods
* Player plate features => Players real name, country to be visible in hud?
* HUD loading/unloading animations
* Custom scoreboard which works well with overlay
* Better error handling to forms in dashboard
* HLTV integration to dashboard. Maybe user could link hltv profile into form and it fills automatically?
* ~~Better match setup => option for bo1/bo3/bo5 with map data and map vetos?~~
* ~~Overhaul server structures => Create consistent server structure with strong types.~~

Here was just a few. Im open for new ideas.

## App shortcuts:

| Shortcut     | Action                   |
| ------------ | ------------------------ |
| ALT + C      | Toggle visibility of UI  |
| ALT + P      | Exit app                 |
| ALT + R      | Force refresh UI         |

## Dashboard:

![Dashboard live tab](https://i.imgur.com/unOBwmF.png)

## UI Preview:

[WIP Preview of UI](https://www.youtube.com/watch?v=kNZLzUA9Q08)

[![UI Demo](https://i.imgur.com/6Ba908v.jpg)](https://www.youtube.com/watch?v=kNZLzUA9Q08)

## Contact

If you are intrested in using this HUD in your production and want some custom features added in, please contact me discord `@Morabotti#9144` or steam `Morabotti`.