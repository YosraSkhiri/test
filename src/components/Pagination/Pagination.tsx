"use client"

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { nanoid } from 'nanoid'
import { useCallback, useEffect } from 'react'
import PaginationProps from './Pagination.types'
import { useSearchParams } from 'next/navigation'

const Pagination = ({
  page,
  count,
  showPrevious = true,
  showNext = true,
}: PaginationProps) => {  
  const searchParams = useSearchParams()

  useEffect(() => {
    console.log(searchParams.get('author'))
    console.log(searchParams.get('q'))
  }, [])

  const range = useCallback(() => {
    return Array.from({ length: count }, (_, index) => `${index + 1}`)
  }, [count])

  const generateItems = () => {
    return [
      ...(showPrevious ? ['previous'] : []),
      ...range(),
      ...(showNext ? ['next'] : []),
    ]
  }

  const itemList = generateItems()

  const getSearchQuery = () => {
    let authorId = '';
    let str = ''
    
    if (searchParams.get('author') && searchParams.get('author') !== null) {
      authorId = `&author=${searchParams.get('author')}`
      str += authorId
    }

    return str
  }

  return (
    <div className='py-10'>
      <UIPagination>
        <PaginationContent>
        {
          itemList.map(item => {
            if (item === 'previous') {
              return (
                <PaginationItem key={nanoid()}>
                  <PaginationPrevious href={`/?page=${page - 1 >= 1 ? page - 1 : 1}${getSearchQuery()}`} />
                </PaginationItem>
              )
            } else {
              if (item === 'next') {
                return (
                  <PaginationItem key={nanoid()}>
                    <PaginationNext href={`/?page=${page + 1 <= count ? page + 1 : page}${getSearchQuery()}`} />
                  </PaginationItem>
                )
              } else {
                return (
                  <PaginationItem key={nanoid()}>
                    <PaginationLink 
                      isActive={+item === page} 
                      href={`/?page=${item}${getSearchQuery()}`}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                )
              }
            }
          })
        }
        </PaginationContent>
      </UIPagination>
    </div>
  )
}

export default Pagination