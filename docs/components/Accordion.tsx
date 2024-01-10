export const Accordion = ({ title, children, ...props }) => {
  return (
    <details {...props} className="last-of-type:mb-0 rounded-lg bg-neutral-50 dark:bg-neutral-800 p-2 mt-4 shadow-md">
      <summary className="cursor-pointer border-b border-neutral-100 dark:border-neutral-700">
        <strong className="text-lg">{title}</strong>
      </summary>
      <div className="nx-p-2">{children}</div>
    </details>
  )
}
