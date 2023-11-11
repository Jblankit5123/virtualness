'use client'

import Image from "next/image";
import { ChangeEvent, useEffect, Suspense, useState } from 'react';
import TableSkeleton from "./tableSkelton";

interface mapDataType {
  name: string;
  owner: {
    node_id: string;
    avatar_url: string;
  };
  description: string;
}

const ITEMS_PER_PAGE = 10;

const HomePage = () => {
  const [data, setData] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);


  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (e?.target?.value) {
      const res = await getData(`https://api.github.com/search/repositories?q=${e?.target?.value}`);
      setData(res?.items);
      setLoading(false);
    } else {
      fetchData();
    }
  };

  const fetchData = () => {
    setIsClient(true);
    setLoading(true);
    getData('https://api.github.com/orgs/nodejs/repos').then((res) => {
      setData(res);
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (

    <div className="max-w-5xl mx-auto bg-white p-4 rounded-md shadow-md">
      <div className="flex items-center justify-center m-8">
        {isClient ? <input
          onChange={onChange}
          autoFocus
          type="text"
          placeholder="Search Repos..."
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        /> : null}
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Owner</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <Suspense fallback={<TableSkeleton />}>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData?.length ? paginatedData?.map(({ name, owner, description }: mapDataType, i) => {
              return (
                <tr key={name + i.toString()}>
                  <td className="flex space-x-2 overflow-hidden">
                    <Image height={100} width={100} className="inline-block h-10 w-10 rounded-full ring-2 ring-white mt-2" src={owner?.avatar_url} alt="" />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">{name}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{owner?.node_id}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{description}</td>
                </tr>
              )
            }) : loading && <TableSkeleton />}
          </tbody>
        </Suspense>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

async function getData(url = "") {
  const res = await fetch(url);
  const response = await res.json();
  return response
}

export default HomePage;
