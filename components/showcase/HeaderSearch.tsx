"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Fuse from "fuse.js";
import { useClickAway, useDebounce } from "react-use";
import React, { useEffect, useRef, useState, useMemo } from "react";

import { HookType, CategoryType } from "@/types/hook";

export default function HeaderSearch() {
  const routerPathname = usePathname();

  const refDropdown = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [fuse, setFuse] = useState<Fuse<any> | null>(null);
  const [initialResults, setInitialResults] = useState([]);
  const [searchResults, setSearchResults] = useState<HookType[]>([]);
  const [searchQueryDebounced, setSearchQueryDebounced] = useState("");

  const fuseOptions = useMemo(
    () => ({
      includeScore: true,
      keys: ["title"],
    }),
    []
  );

  useEffect(() => {
    const getSearchResults = async () => {
      const searchResults = await fetchSearchResults();
      const fuseInstance = new Fuse(searchResults, fuseOptions);
      setFuse(fuseInstance);
      setInitialResults(searchResults);
    };

    getSearchResults();
  }, [fuseOptions]);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults(initialResults.slice(0, 4));
      return;
    }

    if (fuse) {
      const filteredResults = fuse
        .search(searchQuery.trim())
        .map((result) => result.item)
        .slice(0, 4);
      setSearchResults(filteredResults);
    }
  }, [searchQueryDebounced, fuse, searchQuery, initialResults]);

  useEffect(() => {
    setSearchQuery("");
    setShowDropdown(false);
  }, [routerPathname]);

  useClickAway(refDropdown, () => setShowDropdown(false));

  useDebounce(() => setSearchQueryDebounced(searchQuery), 500, [searchQuery]);

  async function fetchSearchResults() {
    const searchHooks = await fetch("/api/hook", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resultHooks = await searchHooks.json();
    const publishedSearchJson = resultHooks.data.filter(
      (item: HookType) => item.status === "published"
    );

    const searchCategories = await fetch("/api/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resultCategories = await searchCategories.json();
    publishedSearchJson.forEach((hook: HookType) => {
      const category = resultCategories.data.find(
        (category: CategoryType) => category.id === hook.categoryId
      );
      hook.category = category;
    });

    return publishedSearchJson;
  }

  return (
    <div ref={refDropdown} className="relative flex h-16 items-center py-8">
      <form role="search" className="w-full sm:max-w-none">
        <label htmlFor="SiteSearch" className="sr-only">
          Search
        </label>

        <input
          type="text"
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          onFocus={() => setShowDropdown(true)}
          value={searchQuery}
          placeholder="Search..."
          id="SiteSearch"
          autoComplete="off"
          className="w-full rounded-md border-gray-500 text-sm"
        />

        <button tabIndex={-1} className="sr-only">
          Submit
        </button>
      </form>

      {showDropdown && (
        <div className="absolute right-0 top-14 z-50 w-full rounded-lg border border-gray-100 bg-white shadow-lg">
          {searchResults.length ? (
            <ul className="max-h-64 space-y-1 overflow-auto p-2">
              {searchResults.map((searchResult) => (
                <li key={searchResult.id}>
                  <Link target="_blank" href={searchResult.github}>
                    <div className="flex items-center justify-between rounded-md px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 focus:bg-gray-50">
                      <span>{searchResult.title}</span>

                      <span className="block rounded bg-gray-900 px-1.5 py-0.5 text-[10px] text-white">
                        {searchResult.category.emoji}{" "}
                        {searchResult.category.title}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              Uh-no! There are no results 😢
            </div>
          )}
        </div>
      )}
    </div>
  );
}
