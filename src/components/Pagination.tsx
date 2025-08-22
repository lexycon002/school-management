"use client"

import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";
 
const Pagination = ({page, count }: {page:number; count:number}) => {
  const router = useRouter();

  const isPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const isNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  const changeParam = (newPage:number) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  }
  return (
    <div className="p-4 flex items-center justify-between text-gray-400">
        <button onClick={()=>{changeParam(page - 1)}} disabled={!isPrev} className="px-4 py-2 border rounded-md bg-slate-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Prev</button>
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.ceil(count / ITEM_PER_PAGE)}, (_, index) => {
            const pageIndex = index + 1;
            return (
              <button onClick={()=>{changeParam(pageIndex)}} key={pageIndex} className={`px-2 rounded-sm ${page === pageIndex ? "bg-secondary" : ""}`}>{pageIndex}</button>
            );
          })}
        </div>
        <button disabled={!isNext} onClick={()=>{changeParam(page + 1)}} className="px-4 py-2 border rounded-md bg-slate-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
    </div>
  )
}

export default Pagination