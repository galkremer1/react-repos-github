import React from 'react';
import { SortOption, SortDirection } from '../../types';

interface FilterSortProps {
  onSortChange: (option: SortOption) => void;
  onDirectionChange: (direction: SortDirection) => void;
  onFilterChange: (filter: string) => void;
  sortBy: SortOption;
  sortDirection: SortDirection;
  filter: string;
  enableSorting?: boolean;
  enableFiltering?: boolean;
}

export const FilterSort: React.FC<FilterSortProps> = ({
  onSortChange,
  onDirectionChange,
  onFilterChange,
  sortBy,
  sortDirection,
  filter,
  enableSorting = true,
  enableFiltering = true,
}) => {
  return (
    <div className="repo-filter-sort">
      {enableFiltering && (
        <div className="repo-filter">
          <input
            type="text"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            placeholder="Filter repositories..."
            className="repo-filter__input"
            aria-label="Filter repositories"
          />
        </div>
      )}
      
      {enableSorting && (
        <div className="repo-sort">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="repo-sort__select"
            aria-label="Sort by"
          >
            <option value="stars">Stars</option>
            <option value="forks">Forks</option>
            <option value="updated">Updated</option>
          </select>
          
          <select
            value={sortDirection}
            onChange={(e) => onDirectionChange(e.target.value as SortDirection)}
            className="repo-sort__select"
            aria-label="Sort direction"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      )}
    </div>
  );
}; 