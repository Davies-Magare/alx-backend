#!/usr/bin/env python3

"""
This module demonstrates simple
pagination.
"""
import csv
import math
from typing import Tuple, List, Dict, Any


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Return start and end index for a range of indexes"""
    start_index = (page - 1) * page_size
    return start_index, start_index + page_size


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Retrieve a page from the dataset"""

        data = self.dataset()
        assert (
            isinstance(page, int) and isinstance(page_size, int) and
            page > 0 and page_size > 0
        )
        indexes = index_range(page, page_size)
        if indexes[1] >= len(data) or indexes[0] >= len(data):
            return []
        return data[indexes[0]:indexes[1]]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """Retrieve a page from the dataset"""
        my_page = self.get_page(page, page_size)
        indexes = index_range(page, page_size)
        data = self.dataset()
        total_pages = math.ceil(len(data) / page_size)
        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1
        return {
            'page_size': len(my_page),
            'page': page,
            'data': my_page,
            'next_page': next_page,
            'prev_page': prev_page,
            'total_pages': total_pages

        }
