import { FC } from 'react'
import { PostQuery } from '../api/post'

type Field = PostQuery['sortBy']
type SortOrderType = PostQuery['sortOrder']

export const PostSorting: FC<{
  fields: Field[]
  valueSortBy: Field
  valueSortOrder: SortOrderType
  onSortByChange: (value: Field) => void
  onSortOrderChange: (value: SortOrderType) => void
}> = ({
  fields,
  valueSortBy,
  valueSortOrder,
  onSortByChange,
  onSortOrderChange,
}) => {
  return (
    <div>
      <label htmlFor={`sortBy`}>Sort by:</label>
      <select
        name='sortBy'
        id='sortBy'
        value={valueSortBy}
        onChange={(e) => onSortByChange(e.target.value as Field)}
      >
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      {' / '}
      <label htmlFor='sortOrder'>Sort Order: </label>
      <select
        name='sortOrder'
        id='sortOrder'
        value={valueSortOrder}
        onChange={(e) => onSortOrderChange(e.target.value as SortOrderType)}
      >
        <option value={'ascending'}>ascending</option>
        <option value={'descending'}>descending</option>
      </select>
    </div>
  )
}
