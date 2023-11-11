const TableSkeleton = () => {
    return ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e) => {
      return (
        <tr key={e}>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            <div className="flex items-center">
              <div className="animate-pulse h-10 w-10 bg-gray-300 rounded-full mr-2"></div>
            </div>
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            <div className="animate-pulse h-4 bg-gray-300 w-24 rounded-md"></div>
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            <div className="animate-pulse h-4 bg-gray-300 w-20 rounded-md"></div>
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            <div className="animate-pulse h-4 bg-gray-300 w-40 rounded-md"></div>
          </th>
        </tr>
      )
    }))
  }
  export default TableSkeleton