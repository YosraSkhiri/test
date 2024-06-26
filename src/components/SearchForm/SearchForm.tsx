"use client"

import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { usePathname, useRouter } from 'next/navigation'

const SearchForm = () => {
  const [value, setValue] = useState<string>('')
  const router = useRouter()
  const pathname = usePathname()
  
  return (
    <div>
      <Label htmlFor="terms">Search</Label>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => {setValue(e.target.value)}} 
          placeholder='Find an article by title' 
        />
        <Button 
          variant="secondary"
          onClick={() => {
            router.push(`${pathname}?q=${value}`)
          }}
        >
          Search
        </Button>
      </div>
    </div>
  )
}

export default SearchForm