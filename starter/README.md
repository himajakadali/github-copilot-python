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

## Development Notes
During development, Copilot's first attempt at styling only applied alternating
colors to some rows and introduced a layout bug. This was caught during testing
and Copilot was prompted again to fix both issues properly.

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

## Copilot Evaluation Notes

While building this project, I identified and corrected two flawed Copilot suggestions:

1. **Hint button used `eval()`**: Copilot's first implementation of the Hint feature
   used JavaScript's `eval()` function, which was blocked by the browser's Content
   Security Policy and silently broke the feature. I rejected this approach and
   asked Copilot to rewrite it using safer alternatives (JSON.parse() / direct
   property access) instead of eval().

2. **Incomplete 3x3 alternating colors**: Copilot's first styling pass only applied
   alternating background colors to the bottom row of 3x3 blocks, and introduced
   a layout bug that added an extra empty column, breaking the grid's square shape.
   I identified this visually, rejected the incomplete implementation, and prompted
   Copilot again with more specific instructions to fix both the checkerboard
   pattern across all rows and the layout/overflow bug.

See `Screenshots/copilot_hint_check_lock.png` and `Screenshots/copilot_styling_fix.png`
for the corresponding Copilot conversations.