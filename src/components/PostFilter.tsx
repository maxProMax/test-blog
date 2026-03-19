import { FC } from 'react'

export const PostFilter: FC<{
  field: string
  value: string
  onChange: (value: string) => void
}> = ({ field, value, onChange }) => {
  return (
    <div>
      <label htmlFor={`filter-${field}`}>{field}: </label>
      <input
        id={`filter-${field}`}
        name={`filter-${field}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
