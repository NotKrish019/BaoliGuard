import React from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  onRowClick?: (item: T) => void;
  selectedKey?: string;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  selectedKey,
  emptyMessage = 'No data records available.',
  className = '',
}: DataTableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto border border-[#28A9E0]/20 rounded-sm bg-[#083358]/50 ${className}`}>
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-[#28A9E0]/25 bg-[#062B49]/90 text-[#8CD8F5] uppercase tracking-wider text-[11px] font-semibold">
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={`py-3 px-4 ${
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#28A9E0]/15">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-6 px-4 text-center text-[#587286] italic">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => {
              const key = keyExtractor(item, index);
              const isSelected = selectedKey === key;
              return (
                <tr
                  key={key}
                  onClick={() => onRowClick?.(item)}
                  className={`transition-colors duration-150 ${
                    onRowClick ? 'cursor-pointer' : ''
                  } ${
                    isSelected
                      ? 'bg-[#087CC1]/25 border-l-2 border-l-[#28A9E0]'
                      : 'hover:bg-[#062B49]/60'
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`py-2.5 px-4 text-[#F3FAFD] ${
                        col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                      }`}
                    >
                      {col.render ? col.render(item, index) : (item as Record<string, unknown>)[col.key] as React.ReactNode}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
