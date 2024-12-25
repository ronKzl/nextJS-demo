'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams  = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  //reworked serach function with debouncing 
  const handleSearch = useDebouncedCallback((term) => {
    
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams); //dont forget new lol
    if (term.length > 0){
      params.set('query',term)
    }
    else{
      params.delete('query')
    }
    params.set('page', '1'); //reset to 1 on pagination so it will work if lets say im on page 5 and start an invoice search
    replace(`${pathname}?${params.toString()}`) //update url with users search data

  }, 300)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input onChange={(event) => {
        handleSearch(event.target.value)
      }}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
