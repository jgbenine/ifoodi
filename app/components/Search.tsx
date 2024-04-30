import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { SearchIcon } from 'lucide-react'

const Search = () => {
  return (
    <div className="flex gap-1">
      <Input placeholder="Pesquise restaurantes" />
      <Button size="icon" className="w-14">
        <SearchIcon size={20} />
      </Button>
    </div>
  )
}

export default Search
