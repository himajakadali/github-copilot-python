import sudoku_logic
from app import app, CURRENT


def test_generate_puzzle_returns_a_full_solution_and_sparse_puzzle():
    puzzle, solution = sudoku_logic.generate_puzzle(clues=35)

    assert len(puzzle) == sudoku_logic.SIZE
    assert len(solution) == sudoku_logic.SIZE
    assert all(len(row) == sudoku_logic.SIZE for row in puzzle)
    assert all(len(row) == sudoku_logic.SIZE for row in solution)
    assert all(isinstance(cell, int) for row in puzzle for cell in row)
    assert all(isinstance(cell, int) for row in solution for cell in row)

    empty_cells = sum(cell == sudoku_logic.EMPTY for row in puzzle for cell in row)
    assert empty_cells > 0
    assert empty_cells < sudoku_logic.SIZE * sudoku_logic.SIZE


def test_core_sudoku_helpers_run_without_errors():
    board = sudoku_logic.create_empty_board()
    assert len(board) == sudoku_logic.SIZE
    assert all(len(row) == sudoku_logic.SIZE for row in board)
    assert sudoku_logic.is_safe(board, 0, 0, 1) is True

    copied = sudoku_logic.deep_copy(board)
    copied[0][0] = 9
    assert board[0][0] == sudoku_logic.EMPTY

    assert sudoku_logic.fill_board(board) is True
    assert all(cell != sudoku_logic.EMPTY for row in board for cell in row)

    sudoku_logic.remove_cells(board, 40)
    assert len(board) == sudoku_logic.SIZE
    assert all(len(row) == sudoku_logic.SIZE for row in board)


def test_new_game_route_returns_a_puzzle():
    client = app.test_client()
    response = client.get('/new?clues=35')

    assert response.status_code == 200
    payload = response.get_json()
    assert 'puzzle' in payload
    assert len(payload['puzzle']) == sudoku_logic.SIZE
    assert all(len(row) == sudoku_logic.SIZE for row in payload['puzzle'])
    assert CURRENT['puzzle'] is not None
    assert CURRENT['solution'] is not None
