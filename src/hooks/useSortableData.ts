import React from 'react';
import { User } from '../types/user';

export type SortColumn = 'name' | 'email' | 'address' | 'entity' | 'createdAt';
type SortConfig = {
  key: SortColumn;
  direction: string;
};

const useSortableData = (users: User[], config = null) => {
  const [sortConfig, setSortConfig] = React.useState<SortConfig | null>(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...users];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [users, sortConfig]);

  const requestSort = (key: SortColumn) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { data: sortedItems, requestSort, sortConfig };
};

export default useSortableData;
