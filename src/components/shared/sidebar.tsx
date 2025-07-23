import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, ToggleOptions } from '@/components';
import {
  filterOptions,
  sortOptions,
  sortConfig,
  type SortOrder,
  type YesNo,
} from '@/utils/constants';
import {
  RootState,
  setSort,
  clearSort,
  setFilter,
  clearFilter,
} from '@/redux';
import { useMemo } from 'react';

const Sidebar = ({ disabled }: { disabled?: boolean }) => {
  const dispatch = useDispatch();
  const sortState = useSelector((state: RootState) => state.recipes.sort);
  const filter = useSelector((state: RootState) => state.recipes.filter);

  const hasActiveSort = useMemo(
    () => Object.values(sortState).some(Boolean),
    [sortState]
  );

  return (
    <aside
      className={`w-[500px] p-8 space-y-6 transition-opacity duration-200 ${
        disabled ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {sortConfig.map(({ key, label }, index) => (
        <div key={key} className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-[21px] font-semibold">{label}</p>
            {index === 0 && hasActiveSort && (
              <button
                className="text-blue-500 text-sm"
                onClick={() => dispatch(clearSort())}
              >
                Clear Sort
              </button>
            )}
          </div>
          <Dropdown
            value={sortState[key] as SortOrder}
            onChange={(val: SortOrder) =>
              dispatch(setSort({ key, order: val }))
            }
            options={sortOptions}
            placeholder="Select"
          />
        </div>
      ))}

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-[21px] font-semibold">Filter</p>
          {filter && (
            <p
              className="cursor-pointer text-blue-500 text-sm"
              onClick={() => dispatch(clearFilter())}
            >
              Clear Filter
            </p>
          )}
        </div>
        <div className="border border-black rounded-md p-4 bg-white space-y-4">
          <p className="text-[16px] font-semibold text-[#616161]">Favorites?</p>
          <ToggleOptions
            value={filter}
            onChange={(val) => dispatch(setFilter(val as YesNo))}
            options={filterOptions}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar