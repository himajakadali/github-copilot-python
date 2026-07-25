# Sudoku App - Development Instructions for Copilot

## Project Overview
This is a Flask-based Sudoku game being refactored from legacy code into a
modern, feature-rich application using GitHub Copilot.

## Requirements

- Refactor legacy code into modern, modular Python (Flask backend + HTML/CSS/JS frontend).
- Add a difficulty selector to allow users to choose between easy, medium, and hard puzzles.
- Puzzle generation must guarantee each puzzle has exactly one unique solution.
- Prefilled/given cells must be locked and cannot be edited by the player.
- Add a hint feature that provides clues for the user and locks the filled cell.
- Add a check puzzle button that checks the current state of the board against the solution.
- User should get immediate feedback on their input, such as highlighting invalid entries.
- Add a timer to track how long it takes to solve the puzzle.
- Implement a solution checker that verifies if the user's solution is correct.
- Top 10 scores should be saved in local storage and displayed on the page with
  the user's name, time taken, hints used, and difficulty level.
- The game should be responsive and work well on both desktop and mobile devices.
- UI colors should be visually appealing and accessible, with a dark/light mode toggle.
- Completed and correct puzzles should display a congratulatory message with the
  time taken and hints used, and ask for the user's name for Top 10 times.

## Style Preferences
- Prefer clear, well-commented code.
- Keep functions modular and reusable.
- Use consistent error handling.

## Running Tests
Run `pytest` from the `starter` directory to run all tests.