function FilterBar({
  genres,
  ageGroups,
  years,
  filterGenre,
  setFilterGenre,
  filterAgeGroup,
  setFilterAgeGroup,
  filterYear,
  setFilterYear,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="flex flex-wrap gap-3 my-4">
      {/* Genre filter */}
      <select
        className="select select-bordered select-sm"
        value={filterGenre}
        onChange={(e) => setFilterGenre(e.target.value)}
      >
        <option value="all">All Genres</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g.charAt(0).toUpperCase() + g.slice(1)}
          </option>
        ))}
      </select>

      {/* Age group filter */}
      <select
        className="select select-bordered select-sm"
        value={filterAgeGroup}
        onChange={(e) => setFilterAgeGroup(e.target.value)}
      >
        <option value="all">All Age Groups</option>
        {ageGroups.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      {/* Year filter */}
      <select
        className="select select-bordered select-sm"
        value={filterYear}
        onChange={(e) => setFilterYear(e.target.value)}
      >
        <option value="all">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {/* Sort options — default is year (newest first) */}
      <select
        className="select select-bordered select-sm"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="year-desc">Year (Newest)</option>
        <option value="year-asc">Year (Oldest)</option>
        <option value="rating-desc">IMDb Rating (High → Low)</option>
        <option value="rating-asc">IMDb Rating (Low → High)</option>
        <option value="runtime-desc">Runtime (Longest)</option>
        <option value="runtime-asc">Runtime (Shortest)</option>
      </select>
    </div>
  );
}

export default FilterBar;