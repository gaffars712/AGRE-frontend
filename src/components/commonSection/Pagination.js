"use client"
import React, { useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useRouter } from "next/navigation";

const PaginationComp = ({ totalPages, page, searchParams }) => {
  console.log(searchParams);
  const router = useRouter()

  const handlePage = (event, value) => {
    console.log('asdf', value);
    router.push(`/media/blogs?page=${value}`);
  }
  useEffect(() => {
    if (!searchParams?.page) router.push(`/media/blogs?page=1`)
  }, [searchParams?.page])

  return (
    <div dir="ltr">
      <Stack spacing={2}>
        <Pagination count={totalPages} page={page} onChange={handlePage} variant="outlined" shape="rounded" />
      </Stack>
    </div>
  );
};

export default PaginationComp;

