import type { Category } from '../types/news'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const categoryColors: Record<string, { active: string; inactive: string }> = {
  all: { active: 'bg-gray-600 text-white', inactive: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
  chip: { active: 'bg-chip text-white', inactive: 'bg-red-50 text-red-700 hover:bg-red-100' },
  tool: { active: 'bg-tool text-white', inactive: 'bg-green-50 text-green-700 hover:bg-green-100' },
  industry: { active: 'bg-industry text-white', inactive: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
  academic: { active: 'bg-academic text-white', inactive: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.value
          const colors = categoryColors[category.value] || categoryColors.all

          return (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                isSelected ? colors.active : colors.inactive
              }`}
            >
              <span className="mr-1">{category.emoji}</span>
              <span>{category.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
