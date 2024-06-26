"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { nanoid } from 'nanoid'
import { Label } from '../ui/label'
import FilterProps from './FilterByAuthor.types'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const FilterByAuthor = ({
  authors,
  selectedAuthor = '',
}: FilterProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const [autherId, setAuthorId] = useState<string>(selectedAuthor)

  const onValueChange = (selectedId: string) => {
    setAuthorId(selectedId) 
    router.push(`${pathname}?author=${selectedId}`)
  }

  return (
    <div className='py-5'>
      <Label>Filter By Author</Label>
      <Select value={autherId} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select author" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Authors</SelectLabel>
            {
              authors.map(author => (
                <SelectItem key={nanoid()} value={author.id}>{author.name}</SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default FilterByAuthor
