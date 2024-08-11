export function getInitials(name?: string | null) {
  return name
    ? name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('')
    : 'WI'
}
