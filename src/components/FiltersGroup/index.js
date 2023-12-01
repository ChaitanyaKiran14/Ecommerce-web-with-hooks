import {useState, useEffect} from 'react'
import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const {
    ratingsList,
    categoryOptions,
    activeRatingId,
    activeCategoryId,
    searchInput,
    changeRating,
    changeCategory,
    enterSearchInput,
    changeSearchInput,
    clearFilters,
  } = props
  const [localSearchInput, setLocalSearchInput] = useState(searchInput)

  useEffect(() => {
    setLocalSearchInput(searchInput)
  }, [searchInput])

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    setLocalSearchInput(event.target.value)
    changeSearchInput(event.target.value)
  }

  return (
    <div className="filters-group-container">
      <div className="search-input-container">
        <input
          value={localSearchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>

      <div>
        <h1 className="category-heading">Category</h1>
        <ul className="categories-list">
          {categoryOptions.map(category => (
            <li
              className="category-item"
              key={category.categoryId}
              onClick={() => changeCategory(category.categoryId)}
            >
              <p
                className={
                  category.categoryId === activeCategoryId
                    ? 'category-name active-category-name'
                    : 'category-name'
                }
              >
                {category.name}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1 className="rating-heading">Rating</h1>
        <ul className="ratings-list">
          {ratingsList.map(rating => (
            <li
              className="rating-item"
              key={rating.ratingId}
              onClick={() => changeRating(rating.ratingId)}
            >
              <img
                src={rating.imageUrl}
                alt={`rating ${rating.ratingId}`}
                className={
                  activeRatingId === rating.ratingId
                    ? 'rating-image and-up active-rating'
                    : 'rating-image and-up'
                }
              />
              <p
                className={
                  activeRatingId === rating.ratingId
                    ? 'and-up active-rating'
                    : 'and-up'
                }
              >
                & up
              </p>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
