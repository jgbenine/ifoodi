"use client";
import React, { FormEventHandler, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [valueSearch, setValueSearch] = useState("");
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement>  = (e) => {
    e.preventDefault();
    if (!valueSearch) return;
    router.push(`/restaurants?search=${valueSearch}`);
  };

  return (
    <form className="flex gap-1" onSubmit={handleSearchSubmit}>
      <Input placeholder="Pesquise restaurantes" onChange={handleOnChange} value={valueSearch} />
      <Button size="icon" className="w-14" type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
