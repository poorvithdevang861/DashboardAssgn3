const FilterSidebar = ({ filters, setFilters, filterOptions, onReset }) => {
  const ageGroups = ['All', '0-18', '19-35', '36-50', '51-65', '65+']

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="filter-sidebar">
      <h2 className="filter-title">Filters</h2>
      
      <div className="filter-content">
        <div>
          <label className="filter-label">City</label>
          <select
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            className="filter-select"
          >
            <option value="All">All Cities</option>
            {filterOptions.cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="filter-label">Crime Type</label>
          <select
            value={filters.crimeType}
            onChange={(e) => handleFilterChange('crimeType', e.target.value)}
            className="filter-select"
          >
            <option value="All">All Crime Types</option>
            {filterOptions.crimeTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="filter-label">Year</label>
          <select
            value={filters.year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
            className="filter-select"
          >
            <option value="All">All Years</option>
            {filterOptions.years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="filter-label">Weapon</label>
          <select
            value={filters.weapon}
            onChange={(e) => handleFilterChange('weapon', e.target.value)}
            className="filter-select"
          >
            <option value="All">All Weapons</option>
            {filterOptions.weapons.map(weapon => (
              <option key={weapon} value={weapon}>{weapon}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="filter-label">Gender</label>
          <select
            value={filters.gender}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
            className="filter-select"
          >
            <option value="All">All Genders</option>
            {filterOptions.genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="filter-label">Age Group</label>
          <select
            value={filters.ageGroup}
            onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
            className="filter-select"
          >
            {ageGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="filter-reset-btn"
          onClick={onReset}
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}

export default FilterSidebar

