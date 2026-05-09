// Widget layout — wraps the chat in a centered card on standalone view,
// fills 100% when iframed (the parent iframe constrains the size).
export default function WidgetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="widget-host flex min-h-screen w-full items-center justify-center bg-background">
      <div className="widget-frame">{children}</div>
    </div>
  )
}
