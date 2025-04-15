function InlineCode({ children }: { children: string }) {
  return (
    <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold">
      {children}
    </span>
  )
}

export { InlineCode }
