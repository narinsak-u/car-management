import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Car,
  PlusCircle,
  HelpCircle,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const mainNav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/cars", label: "All Cars", icon: Car },
  { to: "/cars/new", label: "Add New Car", icon: PlusCircle },
]

const bottomNav = [
  { to: "#", label: "Support", icon: HelpCircle },
  { to: "#", label: "Settings", icon: Settings },
]

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-gray-950 text-white">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center gap-3 px-6 py-5">
          <div className="size-9 rounded-lg bg-white/10 flex items-center justify-center">
            <Car className="size-5" />
          </div>
          <div>
            <h1 className="text-base font-semibold leading-tight">FleetSync</h1>
            <p className="text-xs text-gray-400">Fleet Management</p>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        <nav className="flex-1 px-3 py-4 space-y-1">
          {mainNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )
              }
            >
              <item.icon className="size-5 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 space-y-1">
          <Separator className="mb-4 bg-gray-800" />
          {bottomNav.map((item) => (
            <a
              key={item.label}
              href={item.to}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <item.icon className="size-5 shrink-0" />
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}
