export default async function handlePagination(
  action: "next" | "prev" | "first" | "last" | "specific",
  fetchFunction: () => Promise<void>,
  paginationInfo: { currentPage: number; totalPages: number },
  page?: number
): Promise<void> {
  switch (action) {
    case "next":
      paginationInfo.currentPage = Math.min(paginationInfo.currentPage + 1, paginationInfo.totalPages);
      break;
    case "prev":
      paginationInfo.currentPage = Math.max(paginationInfo.currentPage - 1, 1);
      break;
    case "first":
      paginationInfo.currentPage = 1;
      break;
    case "last":
      paginationInfo.currentPage = paginationInfo.totalPages;
      break;
    case "specific":
      if (page !== undefined) {
        paginationInfo.currentPage = Math.max(1, Math.min(page, paginationInfo.totalPages));
      }
      break;
  }

  await fetchFunction();
}
