import { Search, Bell, Menu } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  onToggleSidebar: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b bg-white px-4 py-3 sm:px-6">
      <Button
        variant="ghost"
        size="icon-sm"
        className="lg:hidden"
        onClick={onToggleSidebar}
      >
        <Menu className="size-5" />
      </Button>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search fleet..."
          className="pl-10 bg-muted border-0"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <Button variant="ghost" size="icon-sm" className="relative">
          <Bell className="size-5" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
        </Button>

        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="hidden sm:block text-sm font-medium">John Doe</span>
        </div>
      </div>
    </header>
  )
}
