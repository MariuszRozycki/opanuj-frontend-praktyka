import React from "react";

type SearchFormProps = {
  children: React.ReactNode;
};

function SearchForm({children}: SearchFormProps) {
  return (
    <form className="space-x-4 flex items-end justify-center">
     {children}
    </form>
  );
}

export default SearchForm;
