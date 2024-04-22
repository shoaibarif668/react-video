# React Video Test


**`pnpm` is used as the package manager.**

**This project is bootstrapped using `Vite`.**


## Available Scripts


### `pnpm dev`

Runs the app in the development environment.

## Libraries

Some noticeable libraries being used:

- [Video.js](https://videojs.com//)

## File Structure

The project has been broken down into a single `src` directory which consists of multiple subdirectories.

- `assets`
    - It includes all the local **images** used throughout the project.
- `hooks`
    - Functionalities which are extracted from components as react hooks, so that they can be easily re-used and maintained throughout the app.
- `styles`
    - This directory has the general styles for this application.
- `utils`
    - This directory contains the utilities for this application, as of now, it has two subdirectories:
        - `constants`
            - This directory contains the **constants** used throughout the project.
        - `types`
            - This directory contains all **types** which are used throughout the app.

