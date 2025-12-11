export function ErrorScreen({ error }: { error?: string }) {
  return (
    <div className="flex fixed inset-0 flex-col justify-center items-center text-white background bg-neutral-700">
      <h1 className="text-lg font-bold">Something went wrong...</h1>
      {error && <p className="mt-4 text-sm">{error}</p>}
    </div>
  )
}
