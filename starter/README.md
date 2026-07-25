# Sudoku Game (Flask + Copilot Refactor)

A Sudoku game built with Python Flask, refactored and enhanced using GitHub Copilot.

## Features
- Difficulty selector (Easy, Medium, Hard)
- Puzzles guaranteed to have a unique solution
- Hint button (fills and locks one correct cell)
- Check button (highlights incorrect entries)
- Timer tracking solve time
- Top 10 leaderboard saved in local storage
- Dark/Light mode toggle
- Responsive design for mobile and desktop

## Running the App
1. Navigate to the `starter` directory
2. Create a virtual environment: `python -m venv .venv`
3. Activate it:
   - Windows: `.venv\Scripts\Activate.ps1`
   - Mac/Linux: `source .venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run the app: `python app.py`
6. Open `http://127.0.0.1:5000` in your browser

## Running Tests
Run `pytest` from the `starter` directory to run all tests.