"use client"

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { nanoid } from 'nanoid'
import { useCallback, useMemo, useState } from 'react'

const Pagination = ({
  page,
  count,
  showPrevious = true,
  showNext = true,
  onChange
}) => {
  const [currentPage, setCurrentPage] = useState<number>(page)
  
  const range = useCallback(() => {
    return Array.from({ length: count }, (_, index) => `${index + 1}`)
  }, [count])

  const generateItems = useCallback(() => {
    return [
      ...(showPrevious ? ['previous'] : []),
      ...range(),
      ...(showNext ? ['next'] : []),
    ]
  }, [range, showNext, showPrevious])

  const itemList = useMemo(() => generateItems(), [generateItems])

  const handleChange = useCallback((clickedPageNumber: number) => {
    if (clickedPageNumber > 0 && clickedPageNumber <= count) {
      setCurrentPage(clickedPageNumber)
      onChange && onChange(clickedPageNumber)
    }
  }, [count, onChange])

  return (
    <UIPagination>
      <PaginationContent>
      {
        itemList.map(item => {
          if (item === 'previous') {
            return (
              <PaginationItem key={nanoid()}>
                <PaginationPrevious href="#" />
              </PaginationItem>
            )
          } else {
            if (item === 'next') {
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            } else {
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
            }
          }
        })
      }
      </PaginationContent>
    </UIPagination>
  )
}

export default Pagination