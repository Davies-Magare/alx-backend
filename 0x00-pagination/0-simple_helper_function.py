#!/usr/bin/env python3

"""
This module demonstrates simple
pagination.
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Return start and end index for a range of indexes"""
    start_index = (page - 1) * page_size
    return start_index, start_index + page_size
